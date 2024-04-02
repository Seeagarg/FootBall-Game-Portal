import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  baseUrl,
  getMatchLeaderboardApi,
  getUserTeamApi,
  matchByIdApi,
  userTeamPointsLogicApi,
} from "../api/api";
import MatchLayout from "../components/MainComponents/MatchLayout";
import classes from "./CreatedTeam.module.css";
import BottomNavbar from "../components/MainComponents/FantasyGameComponents/BottomNavbar";
import LeaderBoard from "../components/MainComponents/FantasyGameComponents/Leaderboard";

const CreatedTeam = () => {
  const [team, setTeam] = useState([]);
  const [attackers, setAttackers] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const { id, homeTeamId, awayTeamId } = useParams();

  const { user } = useSelector((state) => state.userSlice);

  const navigate = useNavigate();

  const fetchDataFromBackend = async (loadDataWithLoading) => {
    try {
      if (loadDataWithLoading) {
        setLoading(true);
      }
      const res = await axios.get(`${baseUrl}${matchByIdApi}${id}`);
      setData(res?.data?.message[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
    }
  };

  const getUserTeam = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}${getUserTeamApi}`,
        {
          userId: user?.id,
          match_fixture_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      let data = JSON.parse(response?.data?.result[0]?.team);
      console.log(data,'data')
      setAttackers(() => {
        return data.filter((dataItem) => dataItem?.position == "Attacker");
      });
      setDefenders(() => {
        return data.filter((dataItem) => dataItem?.position == "Defender");
      });
      setMidfielders(() => {
        return data.filter((dataItem) => dataItem?.position == "Midfielder");
      });
      setGoalkeeper(() => {
        return data.filter((dataItem) => dataItem?.position == "Goalkeeper");
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  const getMatchLeaderboard = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}${getMatchLeaderboardApi}`,
        {
          match_fixture_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setLeaderboard(response?.data?.result);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  const userTeamPointsFromBackend = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}${userTeamPointsLogicApi}`,
        {
          match_fixture_id: id,
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response, "user team points logic");
      getUserTeam();
      getMatchLeaderboard();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  useEffect(() => {
    fetchDataFromBackend(true);
    getUserTeam();
    getMatchLeaderboard();
    userTeamPointsFromBackend();
    // const intervalId = setInterval(() => {
    //   fetchDataFromBackend();
    //   userTeamPointsFromBackend();
    // }, 15000);
    // return () => clearInterval(intervalId);
  }, []);

  console.log(data?.matchStatus,'ms');

  return (
    <BackgroundImage>
      <Drawer item={null} />
      <Layout>
        <NavbarTop item={0} />
        <div className="w-full my-4 pb-[50px]">
          <div className="grid grid-cols-1 gap-4 ">
            <MatchLayout
              key={data?.id}
              homeTeamLogo={data?.homeLogo}
              homeTeamName={data?.homeTeam}
              awayTeamLogo={data?.awayLogo}
              awayTeamName={data?.awayTeam}
              matchDate={data?.date}
              matchTime={data?.time}
              matchTimeZone={data?.timeZone}
              matchVenue={data?.venue}
              matchLive={false}
              matchLink={`${data?.fixture_id}/${data?.homeTeamId}/${data?.awayTeamId}`}
              matchStatus={data?.matchStatus}
              homeTeamGoals={data?.homeGoals}
              awayTeamGoals={data?.awayGoals}
              //   showProgressBar={true}
              //   homeTeamWinPercentage={matchPrediction?.homeTeamWinPercentage}
              //   awayTeamWinPercentage={matchPrediction?.awayTeamWinPercentage}
              //   drawPercentage={matchPrediction?.drawPercentage}
              data={data}
              matchTimeLive={data?.matchTime}
              hideCreateTeam={true}
            />
          </div>
          <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
            <h3 className="text-center font-Lato font-bold tracking-widest">
              Review Your Team
            </h3>
          </div>

          <div className={classes.main}>
            <div className={classes.container}>
              <img
                src="/images/football_ground_small.jpg"
                alt="football ground"
                className={classes.image}
              />
              <div className={classes.sub_container}>
                <div
                  className={classes.grid_container}
                  style={{
                    gridTemplateColumns: `repeat(${attackers.length}, 1fr)`,
                  }}
                >
                  {attackers.map((data) => {
                    return (
                      <div className={classes.grid_sub_container}>
                        <div className={classes.image_container}>
                          <img
                            src={data?.photo}
                            alt=""
                            className={classes.image}
                          />
                          <div className={classes.square}>
                            <p>{data?.point}</p>
                          </div>
                        </div>
                        <div className={classes.player_name}>
                          <p>{data?.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className={classes.grid_container}
                  style={{
                    gridTemplateColumns: `repeat(${midfielders.length}, 1fr)`,
                  }}
                >
                  {midfielders.map((data) => {
                    return (
                      <div className={classes.grid_sub_container}>
                        <div className={classes.image_container}>
                          <img
                            src={data?.photo}
                            alt=""
                            className={classes.image}
                          />
                          <div className={classes.square}>
                            <p>{data?.point}</p>
                          </div>
                        </div>
                        <div className={classes.player_name}>
                          <p>{data?.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className={classes.grid_container}
                  style={{
                    gridTemplateColumns: `repeat(${defenders.length}, 1fr)`,
                  }}
                >
                  {defenders.map((data) => {
                    return (
                      <div className={classes.grid_sub_container}>
                        <div className={classes.image_container}>
                          <img
                            src={data?.photo}
                            alt=""
                            className={classes.image}
                          />
                          <div className={classes.square}>
                            <p>{data?.point}</p>
                          </div>
                        </div>
                        <div className={classes.player_name}>
                          <p>{data?.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  className={classes.grid_container}
                  style={{
                    gridTemplateColumns: `repeat(${goalkeeper.length}, 1fr)`,
                  }}
                >
                  {goalkeeper.map((data) => {
                    return (
                      <div className={classes.grid_sub_container}>
                        <div className={classes.image_container}>
                          <img
                            src={data?.photo}
                            alt=""
                            className={classes.image}
                          />
                          <div className={classes.square}>
                            <p>{data?.point}</p>
                          </div>
                        </div>
                        <div className={classes.player_name}>
                          <p>{data?.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {data?.matchStatus != "Match Finished" && (
              <div className={classes.btn_container}>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={() =>
                    navigate(
                      `/match/${id}/${homeTeamId}/${awayTeamId}/create-team`
                    )
                  }
                >
                  Edit Team
                </button>
              </div>
            )}

          {/* <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
            <h3 className="text-center font-Lato font-bold tracking-widest">
              Leaderboard
            </h3>
          </div> */}

          <LeaderBoard data={leaderboard} />
        </div>
      </Layout>
      <BottomNavbar active={null} />
    </BackgroundImage>
  );
};

export default CreatedTeam;
