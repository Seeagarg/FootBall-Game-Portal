import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  baseUrl,
  matchByIdApi,
  matchPredictionApi,
  matchStatisticsApi,
  teamLineupsApi,
} from "../api/api";
import { toast } from "react-toastify";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import NavbarTop from "../components/NavbarTop";
import MatchLayout from "../components/MainComponents/MatchLayout";
import TeamLineups2 from "../components/MainComponents/TeamLineups2";
import Accordian from "../components/MainComponents/Accordian";
import LastMatchesResults from "../components/MainComponents/LastMatchesResults";
import MatchEvents from "../components/MainComponents/MatchEvents";
import MatchComparison from "../components/MainComponents/MatchComparison";
import PlayerStatisticsModal from "../components/MainComponents/PlayerStatisticsModal";
import { useSelector, useDispatch } from "react-redux";
import Language from "../components/MainComponents/Language";
import CommentryCarousel from "../components/MainComponents/CommentryCarousel";
import CommentryCarousel2 from "../components/MainComponents/CommentryCarousel2";

const Match = () => {
  const { id, homeTeamId, awayTeamId } = useParams();
  const [loading, setLoading] = useState(true);
  const [predictionLoading, setPredictionLoading] = useState(true);
  const [statisticsLoading, setStatisticsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [matchPrediction, setMatchPrediction] = useState();
  const [homeTeamLineups, setHomeTeamLineups] = useState([]);
  const [awayTeamLineups, setAwayTeamLineups] = useState([]);
  const [teamStatistics, setTeamStatistics] = useState([]);
  const [teamStatisticsTrue, setTeamStatisticsTrue] = useState([]);
  const [homeTeamStatistics, setHomeTeamStatistics] = useState([]);
  const [awayTeamStatistics, setAwayTeamStatistics] = useState([]);

  const { lang } = useSelector((state) => state.lang);

  const fetchDataFromBackend = async (loadDataWithLoading) => {
    try {
      if (loadDataWithLoading) {
        setLoading(true);
      }
      const res = await axios.get(`${baseUrl}${matchByIdApi}${id}`);
      console.log("response match by id", res);
      setData(res?.data?.message[0]);
      setLoading(false);
    } catch (error) {
      // console.log(error, "error");
      setLoading(false);

      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
    }
  };

  const fetchMatchPredictionFromBackend = async () => {
    try {
      setPredictionLoading(true);
      const res = await axios.get(`${baseUrl}${matchPredictionApi}${id}`);

      setMatchPrediction(res?.data?.response);
      setPredictionLoading(false);
    } catch (error) {
      // console.log(error, "error");
      setPredictionLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
    }
  };
  const fetchHomeTeamLineups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}${teamLineupsApi}/${id}/${homeTeamId}`
      );

      setHomeTeamLineups(res?.data?.response);

      setLoading(false);
    } catch (error) {
      // console.log(error, "error");
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
    }
  };
  const fetchAwayTeamLineups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}${teamLineupsApi}/${id}/${awayTeamId}`
      );
      setAwayTeamLineups(res?.data?.response);

      setLoading(false);
    } catch (error) {
      // console.log(error, "error");
      setLoading(false);
      toast.error(
        error?.data || error?.data?.message || "Something Went Wrong!"
      );
    }
  };

  const fetchMatchStatistics = async (loading) => {
    try {
      if (loading) {
        setStatisticsLoading(true);
      }

      const res = await axios.get(
        `${baseUrl}${matchStatisticsApi}${id}/${homeTeamId}/${awayTeamId}`
      );
      setTeamStatisticsTrue(res?.data?.response);
      setTeamStatistics(res?.data?.data);

      setStatisticsLoading(false);
    } catch (error) {
      setStatisticsLoading(false);
      console.log("error in match statistics");
    }
  };

  useEffect(() => {
    fetchMatchPredictionFromBackend();
    fetchDataFromBackend(true);
    fetchHomeTeamLineups();
    fetchAwayTeamLineups();
    fetchMatchStatistics(true);
    const intervalId = setInterval(() => {
      fetchDataFromBackend();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMatchStatistics();
    }, 45000);

    return () => clearInterval(intervalId);
  }, []);

  const homeTeam = data?.homeTeam;
  const awayTeam = data?.awayTeam;
  const homeTeamEvents = data?.events?.filter((data) => {
    return (
      data?.team?.name == homeTeam &&
      data?.type == "Goal" &&
      data?.detail != "Missed Penalty"
    );
  });
  const awayTeamEvents = data?.events?.filter((data) => {
    return (
      data?.team?.name == awayTeam &&
      data?.type == "Goal" &&
      data?.detail != "Missed Penalty"
    );
  });

  const hte = homeTeamEvents?.map((data) => data?.player?.name);
  const ate = awayTeamEvents?.map((data) => data?.player?.name);
  // console.log(hte,'hte');
  // console.log(ate,'ate');

  const newArrayHTE = homeTeamLineups.map((team) => {
    const updatedStartXI = team.startXI.map((playerObj) => {
      const playerName = playerObj.player.name;
      const count = hte?.filter((name) => name === playerName).length;
      return {
        ...playerObj,
        player: {
          ...playerObj.player,
          count: count > 0 ? count : 0,
        },
      };
    });

    const updatedSubstitutes = team.substitutes.map((playerObj) => {
      const playerName = playerObj.player.name;
      const count = hte?.filter((name) => name === playerName).length;
      return {
        ...playerObj,
        player: {
          ...playerObj.player,
          count: count > 0 ? count : 0,
        },
      };
    });

    return {
      ...team,
      startXI: updatedStartXI,
      substitutes: updatedSubstitutes,
    };
  });

  const newArrayATE = awayTeamLineups.map((team) => {
    const updatedStartXI = team.startXI.map((playerObj) => {
      const playerName = playerObj.player.name;
      const count = ate?.filter((name) => name === playerName).length;
      return {
        ...playerObj,
        player: {
          ...playerObj.player,
          count: count > 0 ? count : 0,
        },
      };
    });

    const updatedSubstitutes = team.substitutes.map((playerObj) => {
      const playerName = playerObj.player.name;
      const count = ate?.filter((name) => name === playerName).length;
      return {
        ...playerObj,
        player: {
          ...playerObj.player,
          count: count > 0 ? count : 0,
        },
      };
    });

    return {
      ...team,
      startXI: updatedStartXI,
      substitutes: updatedSubstitutes,
    };
  });
  localStorage.setItem("newArrayHTE", JSON.stringify(newArrayHTE));
  localStorage.setItem("newArrayATE", JSON.stringify(newArrayATE));
  // console.log(newArrayHTE,'nah');
  // console.log(newArrayATE,'naa');

  return (
    <BackgroundImage>
      <Drawer item={10} />
      <Layout>
        <NavbarTop item={10} />
        {loading || predictionLoading ? (
          <Loader />
        ) : (
          <>
            <div className="w-full my-4">
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
                  showProgressBar={true}
                  homeTeamWinPercentage={matchPrediction?.homeTeamWinPercentage}
                  awayTeamWinPercentage={matchPrediction?.awayTeamWinPercentage}
                  drawPercentage={matchPrediction?.drawPercentage}
                  data={data}
                  matchTimeLive={data?.matchTime}
                />
              </div>
            </div>

            {matchPrediction?.homeTeamForm?.length > 0 &&
              matchPrediction?.awayTeamForm?.length > 0 && (
                <div className="w-full my-4 bg-gradient-to-r from-stone-800/80 to-stone-800/70">
                  <div className="grid grid-cols-2 gap-4 max-[800px]:grid-cols-1 py-4">
                    <div className="flex flex-col justify-center items-center">
                      <div>{data?.homeTeam}</div>
                      <div className="flex flex-row gap-2">
                        {matchPrediction?.homeTeamForm?.map((data, i) => {
                          return <LastMatchesResults key={i} data={data} />;
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div>{data?.awayTeam}</div>
                      <div className="flex flex-row gap-2">
                        {matchPrediction?.awayTeamForm?.map((data, i) => {
                          return <LastMatchesResults key={i} data={data} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            <div className="grid grid-cols-[1fr_1fr] gap-4 my-4">
              <div
                className="bg-gradient-to-r from-stone-800/80 to-stone-800/70
                rounded-lg w-full"
              >
                <div className="flex flex-col justify-start items-center w-full">
                  <div>
                    <h3 className="text-center">{homeTeam}</h3>
                  </div>

                  <div className="grid grid-cols-[1fr] w-full gap-4 p-6">
                    {homeTeamEvents?.length <= 0 ? (
                      <div
                        className="bg-gradient-to-r from-stone-900/100 to-stone-900/100
                  rounded-lg p-4"
                      >
                        <p className="text-center">
                          {lang === "english"
                            ? "No Goals"
                            : lang === "french"
                            ? "Aucun objectif"
                            : lang === "spanish"
                            ? "Sin goles"
                            : "لا أهداف"}
                        </p>
                      </div>
                    ) : (
                      homeTeamEvents?.map((data, i) => {
                        return <MatchEvents key={i} data={data} />;
                      })
                    )}
                  </div>
                </div>
              </div>

              <div
                className="bg-gradient-to-r from-stone-800/80 to-stone-800/70
                rounded-lg w-full"
              >
                <div className="flex flex-col justify-start items-center w-full">
                  <div className="text-center">
                    <h3>{awayTeam}</h3>
                  </div>

                  <div className="grid grid-cols-[1fr] w-full gap-4 p-6">
                    {awayTeamEvents?.length <= 0 ? (
                      <div
                        className="bg-gradient-to-r from-stone-900/100 to-stone-900/100
                rounded-lg p-4"
                      >
                        <p className="text-center">
                          {lang === "english"
                            ? "No Goals"
                            : lang === "french"
                            ? "Aucun objectif"
                            : lang === "spanish"
                            ? "Sin goles"
                            : "لا أهداف"}
                        </p>
                      </div>
                    ) : (
                      awayTeamEvents?.map((data, i) => {
                        return <MatchEvents key={i} data={data} />;
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Here show the commentry carousel */}

            {/* <CommentryCarousel events={data?.events}/> */}
            <CommentryCarousel2 events={data?.events} />

            {homeTeamLineups?.length > 0 && awayTeamLineups.length > 0 ? (
              <>
                <div className="w-full flex justify-center items-center">
                  <div className="bg-black w-2/4 max-[1000px]:w-full">
                    <div className="flex flex-row justify-between items-center px-4">
                      <div className="flex flex-row justify-start gap-4 items-center">
                        <img
                          src={homeTeamLineups[0]?.team?.logo}
                          className="object-fit h-8"
                          alt={homeTeamLineups[0]?.team?.name}
                        />
                        <p>{homeTeamLineups[0]?.team?.name}</p>
                      </div>
                      <div>{homeTeamLineups[0]?.formation}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full relative">
                  <img
                    src="/images/football_ground.jpg"
                    className="w-2/4 h-[1000px] object-fit bg-gradient-to-r from-stone-800/90 to-stone-800/90 
                  max-[1000px]:w-full
                  "
                    alt="football ground"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 left-[25%] right-[25%] bg-gradient-to-b from-slate-950/50 to-slate-950/50
                max-[1000px]:left-[0%] max-[1000px]:right-[0%]
                "
                  ></div>

                  <div
                    className="absolute top-16 z-50 w-2/4
                  max-[1000px]:w-full
                
                "
                  >
                    <TeamLineups2
                      homeTeam={true}
                      team={homeTeamLineups[0]?.team}
                      coach={homeTeamLineups[0]?.coach}
                      // startXI={homeTeamLineups[0]?.startXI}
                      startXI={
                        JSON.parse(localStorage.getItem("newArrayHTE"))[0]
                          ?.startXI
                      }
                      formation={homeTeamLineups[0]?.formation}
                    />
                  </div>
                  <div
                    className="absolute top-[55%] w-2/4
                  max-[1000px]:w-full
                  max-[1000px]:top-[55%]
                "
                  >
                    <TeamLineups2
                      homeTeam={false}
                      team={awayTeamLineups[0]?.team}
                      coach={awayTeamLineups[0]?.coach}
                      // startXI={awayTeamLineups[0]?.startXI}
                      startXI={
                        JSON.parse(localStorage.getItem("newArrayATE"))[0]
                          ?.startXI
                      }
                      formation={awayTeamLineups[0]?.formation}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="bg-black w-2/4 max-[1000px]:w-full">
                    <div className="flex flex-row justify-between items-center px-4">
                      <div className="flex flex-row justify-start gap-4 items-center">
                        <img
                          src={awayTeamLineups[0]?.team?.logo}
                          className="object-fit h-8"
                          alt={awayTeamLineups[0]?.team?.name}
                        />
                        <p>{awayTeamLineups[0]?.team?.name}</p>
                      </div>
                      <div>{awayTeamLineups[0]?.formation}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black rounded-lg py-4 my-4">
                  <div className="flex flex-col gap-4 justify-start items-start mx-4">
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          border: "2px solid white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          fontSize: "20px",
                          position: "relative",
                        }}
                        className={`
                           bg-blue-500 text-white
                      `}
                      ></div>
                      <div>
                        <h1>
                          {lang === "english"
                            ? "Home Team Players With Player Number"
                            : lang === "french"
                            ? "Joueurs de l'équipe à domicile avec numéro de joueur"
                            : lang === "spanish"
                            ? "Jugadores del equipo local con número de jugador"
                            : "لاعبي الفريق المضيف مع رقم اللاعب"}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          border: "2px solid white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                          fontSize: "20px",
                          position: "relative",
                        }}
                        className={`
                           bg-red-500 text-white
                      `}
                      ></div>
                      <div>
                        <h1>
                          {lang === "english"
                            ? "Away Team Players With Player Number"
                            : lang === "french"
                            ? "Joueurs de l'équipe à l'extérieur avec numéro de joueur"
                            : lang === "spanish"
                            ? "Jugadores del equipo visitante con número de jugador"
                            : "لاعبو الفريق الضيف مع رقم اللاعب"}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-center items-center">
                      <div className="bg-green-500 p-4 border-2 border-white top-0"></div>
                      <div>
                        {lang === "english"
                          ? "Indicates Goal By Player With Number of Goals"
                          : lang === "french"
                          ? "Indique le but par joueur avec le nombre de buts"
                          : lang === "spanish"
                          ? "Indica gol por jugador con número de goles"
                          : "يشير إلى الهدف من قبل اللاعب مع عدد الأهداف"}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full">
                <div className="flex justify-center items-center h-[200px] bg-gradient-to-r from-stone-800/80 to-stone-800/70">
                  <div>
                    {lang === "english"
                      ? "Match Lineups will appear 15-20 mintues before the match start."
                      : lang === "french"
                      ? "Les compositions des matchs apparaîtront 15 à 20 minutes avant le début du match."
                      : lang === "spanish"
                      ? "Las alineaciones de los partidos aparecerán entre 15 y 20 minutos antes del inicio del partido."
                      : "ستظهر تشكيلات المباراة قبل 15-20 دقيقة من بدء المباراة."}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 mt-4 gap-4 max-[800px]:grid-cols-1">
              {homeTeamLineups?.length > 0 && (
                <Accordian
                  team={homeTeamLineups[0]?.team}
                  coach={homeTeamLineups[0]?.coach}
                  startXI={homeTeamLineups[0]?.startXI}
                  formation={homeTeamLineups[0]?.formation}
                />
              )}
              {awayTeamLineups?.length > 0 && (
                <Accordian
                  team={awayTeamLineups[0]?.team}
                  coach={awayTeamLineups[0]?.coach}
                  startXI={awayTeamLineups[0]?.startXI}
                  formation={awayTeamLineups[0]?.formation}
                />
              )}
            </div>
          </>
        )}

        {teamStatisticsTrue?.length > 0 && !statisticsLoading && (
          <div className="bg-black w-full rounded-lg shadow-lg">
            <div className="mt-4 p-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col justify-start items-center gap-4">
                  <img
                    src={teamStatistics?.homeTeamLogo}
                    className="w-full h-32 object-fit max-[700px]:h-28"
                    alt={homeTeamStatistics[0]?.team?.name}
                  />
                  <p>{teamStatistics?.homeTeamName}</p>
                </div>
                <div className="flex flex-col justify-start items-center gap-4">
                  <img
                    src={teamStatistics?.awayTeamLogo}
                    className="w-full h-32 object-fit max-[700px]:h-28"
                    alt={awayTeamStatistics[0]?.team?.name}
                  />
                  <p>{teamStatistics?.awayTeamName}</p>
                </div>
              </div>
              <MatchComparison
                teamStatistics={teamStatistics}
                homeTeamStatistics={homeTeamStatistics}
                awayTeamStatistics={awayTeamStatistics}
              />
            </div>
          </div>
        )}
      </Layout>
      <Language />
      <PlayerStatisticsModal />
    </BackgroundImage>
  );
};

export default Match;
