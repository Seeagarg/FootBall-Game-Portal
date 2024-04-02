import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Drawer from "../components/Drawer";
import axios from "axios";
import {
  baseUrl,
  liveMatchesAllApi,
  liveMatchesApi,
  recentMatchesApi,
  weeklyMatchesApi,
} from "../api/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import NavbarTop from "../components/NavbarTop";
import MatchCarousel from "../components/MainComponents/MatchCarousel";
import MatchLayout from "../components/MainComponents/MatchLayout";
import SendNotification from "../notification/notification";
import {
  ServiceWorkerRegistration,
  checkMatchTimeAndSendNotification,
} from "../sendMatchNotification";
import moment from "moment-timezone";
import Language from "../components/MainComponents/Language";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [liveOnGoingMatches, setLiveOnGoingMatches] = useState([]);
  const [todayMatchResults, setTodayMatchResults] = useState([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [weeklyMatches, setWeeklyMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);

  const { lang } = useSelector((state) => state.lang);

  const navigate=useNavigate();

  const fetchWeeklyMatchesFromBackend = async () => {
    try {
      setLiveLoading(true);
      const res = await axios.post(`${baseUrl}${weeklyMatchesApi}`, {
        timezone: moment.tz.guess(),
      });
      console.log(res.data.response, "response weekly matches");
      setWeeklyMatches(res.data.response);
      setLiveLoading(false);
    } catch (error) {
      setLiveLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };

  const fetchLiveMatchesFromBackend = async (fetchDataWithLoading) => {
    try {
      if (fetchDataWithLoading) {
        setLiveLoading(true);
      }
      const res = await axios.post(`${baseUrl}${liveMatchesApi}`, {
        timezone: moment.tz.guess(),
      });

      // LIVE MATCHES PREMIERE LEAGUE
      setLiveMatches(
        res?.data?.response?.data.filter(
          (data) =>
            data.matchStatus != "Match Finished" && data.matchTime == null
        )
      );

      // LIVE MATCHES PREMIERE LEAGUE
      setLiveOnGoingMatches(
        res?.data?.response?.data.filter(
          (data) =>
            data.matchTime != null && data.matchStatus != "Match Finished"
        )
      );

      // LIVE MATCHES PREMIERE LEAGUE
      setTodayMatchResults(
        res?.data?.response?.data.filter(
          (data) => data.matchStatus == "Match Finished"
        )
      );

      setLiveLoading(false);
    } catch (error) {
      setLiveLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };

  const fetchRecentMatchesFromBackend = async () => {
    try {
      setLiveLoading(true);
      const res = await axios.post(`${baseUrl}${recentMatchesApi}`, {
        timezone: moment.tz.guess(),
      });
      console.log(res.data.response, "resssssssss recent");
      setRecentMatches(res?.data?.response);
      setLiveLoading(false);
    } catch (error) {
      setLiveLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchLiveMatchesFromBackend(true);
    fetchWeeklyMatchesFromBackend();
    fetchRecentMatchesFromBackend();
    const intervalId = setInterval(() => {
      fetchLiveMatchesFromBackend();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(()=>{
  //   console.log(liveOnGoingMatches,'lommmmmm')
  //     liveOnGoingMatches?.map((data) =>
  //     // console.log(data,"dataaaaaaaa")
  //       ServiceWorkerRegistration(
  //         "2023-11-16T11:00:00",
  //         "Chelsea",
  //         "Manchester United"
  //       )
  //     );
  // },[])

  return (
    <BackgroundImage>
      <Drawer item={0} />
      <Layout>
        <NavbarTop item={0} />
        <Navbar item={0} />

        {liveLoading ? (
          <Loader />
        ) : (
          <>
            {liveOnGoingMatches.length <= 0 ? (
              <div className="w-full">
                <div className="flex justify-center items-center h-[200px] bg-gradient-to-r from-stone-800/80 to-stone-800/70">
                  <div>
                    {lang == "english"
                      ? "There are no live matches currently."
                      : lang === "french"
                      ? "Il n'y a pas de matchs en direct actuellement."
                      : lang === "spanish"
                      ? "No hay partidos en vivo actualmente."
                      : "لا توجد مباريات حية حاليا."}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    {lang === "english"
                      ? "LIVE MATCHES"
                      : lang === "french"
                      ? "MATCHS EN DIRECT"
                      : lang === "spanish"
                      ? "PARTIDOS EN DIRECTO"
                      : "المباريات المباشرة"}
                  </h3>
                </div>

                <div className="w-full my-4">
                  <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
                    {liveOnGoingMatches.map((data, i) => {
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
                          data={data}
                          homeTeamGoals={data?.homeGoals}
                          awayTeamGoals={data?.awayGoals}
                          matchTimeLive={data?.matchTime}
                          showProgressBar={false}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {todayMatchResults.length > 0 && (
              <>
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    {lang === "english"
                      ? "TODAY MATCHES RESULTS"
                      : lang === "french"
                      ? "RÉSULTATS DES MATCHS D'AUJOURD'HUI"
                      : lang === "spanish"
                      ? "RESULTADOS DE LOS PARTIDOS DE HOY"
                      : "نتائج المباريات اليوم"}
                  </h3>
                </div>

                <MatchCarousel matches={todayMatchResults} />
              </>
            )}

            {liveMatches.length > 0 && (
              <>
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    {lang === "english"
                      ? "UPCOMING RECENT MATCHES"
                      : lang === "french"
                      ? "MATCHS RÉCENTS À VENIR"
                      : lang === "spanish"
                      ? "PRÓXIMOS PARTIDOS RECIENTES"
                      : "المباريات الأخيرة القادمة"}
                  </h3>
                </div>

                <div className="w-full my-4">
                  <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
                    {liveMatches.map((data, i) => {
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
                          data={data}
                          homeTeamGoals={data?.homeGoals}
                          awayTeamGoals={data?.awayGoals}
                          matchTimeLive={data?.matchTime}
                          showProgressBar={false}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {recentMatches.length > 0 && (
              <>
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    {lang === "english"
                      ? "RECENT MATCHES"
                      : lang === "french"
                      ? "MATCHS RÉCENTS"
                      : lang === "spanish"
                      ? "PARTIDOS RECIENTES"
                      : "المباريات الأخيرة"}
                  </h3>
                </div>

                <MatchCarousel matches={recentMatches} />
              </>
            )}

            {weeklyMatches.length > 0 && (
              <>
                <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
                  <h3 className="text-center font-Lato font-bold tracking-widest">
                    {lang === "english"
                      ? "UPCOMING MATCHES THIS WEEK"
                      : lang === "french"
                      ? "MATCHS À VENIR CETTE SEMAINE"
                      : lang === "spanish"
                      ? "PRÓXIMOS PARTIDOS DE ESTA SEMANA"
                      : "المباريات القادمة هذا الأسبوع"}
                  </h3>
                </div>

                <div className="w-full ">
                  <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
                    {weeklyMatches.map((data, i) => {
                      if (
                        data?.matchStatus != "Match Finished" &&
                        data?.matchTime == null
                      ) {
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
                            homeTeamGoals={data?.homeGoals}
                            awayTeamGoals={data?.awayGoals}
                            matchLink={`${data?.fixture_id}/${data?.homeTeamId}/${data?.awayTeamId}`}
                            matchStatus={data?.matchStatus}
                            matchTimeLive={data?.matchTime}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </>
            )}
            <div className="fixed bottom-[16px] left=[16px] z-50">
              <button
              onClick={()=>navigate("/fantasy-team")}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              >
                Make a Fantasy Team
              </button>
            </div>
          </>
        )}
      </Layout>
      <Language />
    </BackgroundImage>
  );
};

export default Home;
