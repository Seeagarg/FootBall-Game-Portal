import React, { useState, useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import axios from "axios";
import { baseUrl, matchesByDateApi, weeklyMatchesApi } from "../api/api";
import { toast } from "react-toastify";
import MatchLayout from "../components/MainComponents/MatchLayout";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import Language from "../components/MainComponents/Language";

const WeeklyMatchesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyMatches, setWeeklyMatches] = useState([]);
  const [date, setDate] = useState("dd-mm-yyyy");
  const {lang}=useSelector(state=>state.lang);
  const fetchWeeklyMatchesFromBackend = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}${weeklyMatchesApi}`, {
        timezone: moment.tz.guess(),
      });
      console.log(res.data.response, "response weekly matches");
      setWeeklyMatches(res.data.response);
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
    fetchWeeklyMatchesFromBackend();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(date, "date");
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}${matchesByDateApi}/${date}`, {
        timezone: moment.tz.guess(),
      });
      console.log(res.data.response, "response matches by date");
      setWeeklyMatches(res.data.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };
  return (
    <BackgroundImage>
      <Drawer item={2} />
      <Layout>
        <NavbarTop item={2} />
        <Navbar item={2} />

        {loading ? (
          <Loader />
        ) : (
          <div className="w-full mt-4">
            <div className="bg-black w-full p-4">
              <form
                className="w-full flex flex-row justify-center items-center gap-4"
                onSubmit={submitHandler}
              >
                <input
                  type="date"
                  className="bg-green-600 p-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 rounded-lg p-2"
                >
                  {lang === "english"
                    ? "Search"
                    : lang === "french"
                    ? "Recherche"
                    : lang==="spanish"? "Buscar":"يبحث"}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
              {weeklyMatches.length > 0 ? (
                weeklyMatches.map((data, i) => {
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
                      matchTimeLive={data?.matchTime}
                      matchLive={false}
                      matchLink={`${data?.fixture_id}/${data?.homeTeamId}/${data?.awayTeamId}`}
                      matchStatus={data?.matchStatus}
                    />
                  );
                })
              ) : (
                <div className="w-full col-span-2">
                  <div className="flex justify-center items-center h-[200px] bg-gradient-to-r from-stone-800/80 to-stone-800/70">
                    <div>
                      {lang === "english"
                        ? "No Matches on "
                        : lang === "french"
                        ? "Aucun match sur"
                        : lang==="spanish"? "No hay coincidencias en":"لا توجد تطابقات قيد التشغيل "}
                      {date}..
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
      <Language />
    </BackgroundImage>
  );
};

export default WeeklyMatchesScreen;
