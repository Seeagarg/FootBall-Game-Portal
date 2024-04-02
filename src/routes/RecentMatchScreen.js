import React, { useState, useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import {
  baseUrl,
  currentDayMatchesApi,
  recentMatchesApi,
  weeklyMatchesApi,
} from "../api/api";
import { toast } from "react-toastify";
import MatchLayout from "../components/MainComponents/MatchLayout";
import MatchCarousel from "../components/MainComponents/MatchCarousel";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import Language from "../components/MainComponents/Language";

const RecentMatchScreen = () => {
  const [loading, setLoading] = useState(true);
  const [recentMatches, setRecentMatches] = useState([]);
  const [currentDayMatches, setCurrentDayMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  const {lang}=useSelector(state=>state.lang);

  const fetchRecentMatchesFromBackend = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}${recentMatchesApi}`,{
        timezone:moment.tz.guess()
      });
      console.log(res.data.response, "resssssssss recent");
      setRecentMatches(res?.data?.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };
  const fetchCurrentDayMatchesFromBackend = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}${currentDayMatchesApi}`,{
        timezone:moment.tz.guess()
      });
      console.log(res.data?.response?.matches, "response current day");
      if (res.data?.response?.matches == "NO matches currently ->") {
        setCurrentDayMatches([]);
        setLoading(false);
      } else {
        setCurrentDayMatches(res.data?.response?.matches.filter((data)=>data.matchStatus!="Match Finished"));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };
  const fetchUpcomingMatchesFromBackend = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}${weeklyMatchesApi}`,{
        timezone:moment.tz.guess()
      });
      console.log(res.data.response, "response weekly matches");
      setUpcomingMatches(res.data.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchRecentMatchesFromBackend();
    fetchCurrentDayMatchesFromBackend();
    fetchUpcomingMatchesFromBackend();
  }, []);
  return (
    <BackgroundImage>
      <Drawer item={1} />
      <Layout>
        <NavbarTop item={1} />
        <Navbar item={1} />

        {loading ? (
          <Loader />
        ) : (
          <>
            {currentDayMatches.length > 0 ? (
              <div className="w-full my-4">
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    
                    {lang === "english"
                            ? "UPCOMING MATCHES"
                            : lang === "french"
                            ? "MATCHS À VENIR"
                            : lang==="spanish"? "PRÓXIMOS PARTIDOS":"المباريات القادمة"}
                  </h3>
                </div>
                <MatchCarousel matches={currentDayMatches} />
              
              </div>
            ) : null}
            {recentMatches.length > 0 ? (
              <div className="w-full my-4">
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    
                    {lang === "english"
                            ? "RECENT MATCHES RESULTS"
                            : lang === "french"
                            ? "RÉSULTATS DES MATCHS RÉCENTS"
                            : lang==="spanish"? "RESULTADOS DE PARTIDOS RECIENTES":"نتائج المباريات الأخيرة"}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
                  {recentMatches.map((data, i) => {
                    if (data?.matchStatus=="Match Finished") {
                      return (
                        <MatchLayout
                          key={i}
                          homeTeamLogo={data?.homeLogo}
                          homeTeamName={data?.homeTeam}
                          awayTeamLogo={data?.awayLogo}
                          awayTeamName={data?.awayTeam}
                          matchDate={data?.date}
                          matchTime={data?.time}
                          matchTimeZone={data?.timeZone}
                          matchVenue={data?.venue}
                          matchLink={`${data?.fixture_id}/${data?.homeTeamId}/${data?.awayTeamId}`}
                          matchStatus={data?.matchStatus}
                          homeTeamGoals={data?.homeGoals}
                          matchTimeLive={data?.matchTime}
                          awayTeamGoals={data?.awayGoals}
                          winner={data?.winner}
                          data={data}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            ) : null}
            {upcomingMatches.length > 0 ? (
              <div className="w-full">
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    
                    {lang === "english"
                            ? "UPCOMING MATCHES"
                            : lang === "french"
                            ? "MATCHS À VENIR"
                            : lang==="spanish"? "PRÓXIMOS PARTIDOS":"المباريات القادمة"}
                  </h3>
                </div>

                <MatchCarousel matches={upcomingMatches} />
              </div>
            ) : null}
          </>
        )}
      </Layout>
      <Language />
    </BackgroundImage>
  );
};

export default RecentMatchScreen;
