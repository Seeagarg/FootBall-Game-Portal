import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import { baseUrl, weeklyMatchesApi } from "../api/api";
import moment from "moment/moment";
import { toast } from "react-toastify";
import axios from "axios";
import MatchLayout from "../components/MainComponents/MatchLayout";
import BottomNavbar from "../components/MainComponents/FantasyGameComponents/BottomNavbar";
import Lottie from "lottie-react";
import animation from '../animation/animation.json'
import Loader from "../components/Loader";

const FantasyTeam = () => {
  const [matches, setMatches] = useState([]);
  const [loading,setLoading] = useState(true);
  const fetchWeeklyMatchesFromBackend = async () => {
    try {
      const res = await axios.post(`${baseUrl}${weeklyMatchesApi}`, {
        timezone: moment.tz.guess(),
      });
      console.log(res.data.response, "response weekly matches");
      setLoading(false);
      setMatches(res.data.response);
     
    } catch (error) {
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchWeeklyMatchesFromBackend();
  }, []);

  return (
    <BackgroundImage>
      <Drawer item={null} />
      <Layout>
        <NavbarTop item={0} />
        <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
          <h3 className="text-center font-Lato font-bold tracking-widest">
            Upcoming Matches , Create a Fantasy Team
          </h3>
        </div>
        <div className="w-full pb-[50px]">
          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            {
              loading?
              <Loader/>
              :
              matches.map((data, i) => {
              if (data?.matchStatus == "Not Started") {
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
                    createTeam={true}
                  />
                );
              }
            })}
          </div>
        </div>
      </Layout>
        <BottomNavbar active={0} />
    </BackgroundImage>
  );
};

export default FantasyTeam;
