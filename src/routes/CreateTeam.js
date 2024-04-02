import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  baseUrl,
  createUserTeamApi,
  fetchPlayersApi,
  getUserTeamApi,
  matchByIdApi,
  teamLineupsApi,
} from "../api/api";
import BottomNavbar from "../components/MainComponents/FantasyGameComponents/BottomNavbar";
import MatchLayout from "../components/MainComponents/MatchLayout";
import classes from "./CreateTeam.module.css";
import NavbarPlayers from "../components/MainComponents/FantasyGameComponents/NavbarPlayers";
import Stepper from "../components/MainComponents/FantasyGameComponents/Stepper";
import { useDispatch, useSelector } from "react-redux";
import PlayerList from "../components/MainComponents/FantasyGameComponents/PlayerList";
import Cookies from "js-cookie";
import { resetTeam, setTeam } from "../slices/userTeamSlice";
import Accordian from "../components/MainComponents/Accordian";
import PlayersModal from "../components/PlayersModal";

const CreateTeam = () => {
  const { id, homeTeamId, awayTeamId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [attackers, setAttackers] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState([]);
  const [captain,setCaptain] = useState([]);
  const [viceCaptain,setViceCaptain] = useState([]);
  const [homeTeamLineups, setHomeTeamLineups] = useState([]);
  const [awayTeamLineups, setAwayTeamLineups] = useState([]);
  const [open,setOpen] = useState(false)

  const { user } = useSelector((state) => state.userSlice);

  const fetchHomeTeamLineups = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}${teamLineupsApi}/${id}/${homeTeamId}`
      );

      setHomeTeamLineups(res?.data?.response);

      console.log(res?.data.response,'lineups')
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

  const fetchPlayersFromBackend = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}${fetchPlayersApi}/${homeTeamId}/${awayTeamId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setPlayers(response?.data?.teamData);
      console.log('players----------',response.data.teamData)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  const fetchDataFromBackend = async (loadDataWithLoading) => {
    try {
      if (loadDataWithLoading) {
        setLoading(true);
      }
      const res = await axios.get(`${baseUrl}${matchByIdApi}${id}`);
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

  console.log(players, "players");

  const { active, name } = useSelector((state) => state.navbarPlayersSlice);

  const { team } = useSelector((state) => state.userTeamSlice);

  const fetchUserTeam = async () => {
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
      console.log(response, "user team response");
      if (response?.data?.status == 1) {
        dispatch(setTeam(JSON.parse(response?.data?.result[0]?.team)));
      } else {
        dispatch(resetTeam());
      }
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
    // if user team is present it will fetch it and display it else not .
    fetchUserTeam();
    fetchPlayersFromBackend();
    fetchHomeTeamLineups();
    fetchAwayTeamLineups();
    // const intervalId = setInterval(() => {
    //   fetchDataFromBackend();
    // }, 15000);
    // return () => clearInterval(intervalId);
  }, []);


  // const createTeamHandler=async()=>{
    
  // }

  




  const createTeamHandler = async (path) => {
    if(captain.length == 0 || viceCaptain.length == 0 ){
      toast.info("Please Select Captain and ViceCaptain.");
      return;
    }
    try {
      const dataToSend = {
        userId: user?.id,
        userNumber: user?.user_number,
        match_fixture_id: id,
        team: team?.map((data) => {
          return {
            ...data,
            point: 0,
          };
        }),
        home_team_name: data?.homeTeam,
        away_team_name: data?.awayTeam,
        home_team_logo: data?.homeLogo,
        away_team_logo: data?.awayLogo,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        match_date_time: data?.time,
        total_points: 0,
      };

      const response = await axios.post(
        `${baseUrl}${createUserTeamApi}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response, "response");
      navigate(path);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  useEffect(() => {
    setAttackers(() => {
      return team.filter((dataItem) => dataItem?.position == "Attacker");
    });
    setDefenders(() => {
      return team.filter((dataItem) => dataItem?.position == "Defender");
    });
    setMidfielders(() => {
      return team.filter((dataItem) => dataItem?.position == "Midfielder");
    });
    setGoalkeeper(() => {
      return team.filter((dataItem) => dataItem?.position == "Goalkeeper");
    });
    setCaptain(()=>{
      return team.filter((data)=>data.captain == true)
    } )
    
    setViceCaptain(()=>{
      return team.filter((data)=>data.viceCaptain == true)
    })
  }, [team]);
  return (
    <BackgroundImage>
      <Drawer item={null} />
      <Layout>
        <NavbarTop item={0} />
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
              //   showProgressBar={true}
              //   homeTeamWinPercentage={matchPrediction?.homeTeamWinPercentage}
              //   awayTeamWinPercentage={matchPrediction?.awayTeamWinPercentage}
              //   drawPercentage={matchPrediction?.drawPercentage}
              data={data}
              matchTimeLive={data?.matchTime}
              hideCreateTeam={true}
            />
          </div>
        </div>
        {homeTeamLineups.length == 0 && awayTeamLineups.length == 0 && (
          <div className="w-full">
            <div className="flex justify-center px-10 items-center h-[200px] bg-gradient-to-r from-stone-800/80 to-stone-800/70">
              Match Lineups will appear 15-20 mintues before the match start
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 mt-4 gap-4 max-[800px]:grid-cols-1">
          {homeTeamLineups?.length > 0 && awayTeamLineups.length > 0 && (
            <>
              <Accordian
                team={homeTeamLineups[0]?.team}
                coach={homeTeamLineups[0]?.coach}
                startXI={homeTeamLineups[0]?.startXI}
                formation={homeTeamLineups[0]?.formation}
              />
              <Accordian
                team={awayTeamLineups[0]?.team}
                coach={awayTeamLineups[0]?.coach}
                startXI={awayTeamLineups[0]?.startXI}
                formation={awayTeamLineups[0]?.formation}
              />
            </>
          )}
        </div>
        <Stepper />
        {/* {team.length > 10 && data?.matchStatus!="Match Finished" || 
        data?.matchStatus == "Not Started"
        && (
          <div className="w-full flex justify-center items-center">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                createTeamHandler(
                  `/match/${id}/${homeTeamId}/${awayTeamId}/created-team`
                );
              }}
            >
              Submit
            </button>
          </div>
        )} */}

        {
          team.length > 10 && data?.matchStatus == "Not Started" && 
          <>
          <div className="w-full flex justify-center items-center">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={()=>{setOpen(true)}}
              >
              View My Team
            </button>
          </div>
          </> 
        }



        <NavbarPlayers
          item={active}
          attackers={attackers}
          defenders={defenders}
          midfielders={midfielders}
          goalkeeper={goalkeeper}
        />
        <div className="w-full mt-4 bg-background_navbar py-10 px-10 rounded-lg">
          <div className="w-full flex justify-center items-center py-5">
            <h3 className="text-lg text-slate-100 font-bold">
              {active == 0
                ? "GoalKeepers"
                : active == 1
                ? "Defenders"
                : active == 2
                ? "Midfielders"
                : "Attackers"}
            </h3>
          </div>
          <div className={classes.players_container}>
            {active == 0
              ? players[0]?.goalkeepers?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[0]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })
              : active == 1
              ? players[0]?.defenders?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[0]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })
              : active == 2
              ? players[0]?.midfielders?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[0]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })
              : players[0]?.attackers?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[0]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })}

            {active == 0
              ? players[1]?.goalkeepers?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[1]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })
              : active == 1
              ? players[1]?.defenders?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[1]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })
              : active == 2
              ? players[1]?.midfielders?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[1]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })
              : players[1]?.attackers?.map((dataItem) => {
                  return (
                    <PlayerList
                      dataItem={dataItem}
                      teamName={players[1]?.teamName}
                      attackers={attackers}
                      defenders={defenders}
                      midfielders={midfielders}
                      goalkeeper={goalkeeper}
                      homeTeam = {homeTeamLineups[0]?.startXI}
                      awayTeam={awayTeamLineups[0]?.startXI}
                    />
                  );
                })}
          </div>
        </div>
        <PlayersModal open={open} close={()=>setOpen(false)} submitHandler={()=>{createTeamHandler(
                  `/match/${id}/${homeTeamId}/${awayTeamId}/created-team`
                );}}
                  captain={captain}
                  viceCaptain={viceCaptain}
                />
      </Layout>
      <BottomNavbar />
    </BackgroundImage>
  );
};

export default CreateTeam;
