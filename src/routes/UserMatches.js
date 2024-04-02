import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import BottomNavbar from "../components/MainComponents/FantasyGameComponents/BottomNavbar";
import MatchLayout from "../components/MainComponents/MatchLayout";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl, getUserMatchesApi } from "../api/api";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const UserMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading,setLoading] = useState(true);
  const { user } = useSelector((state) => state.userSlice);

  const fetchUserMatches = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}${getUserMatchesApi}`,
        {
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response, "response");
      setLoading(false);
      setMatches(response?.data?.message);
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
    fetchUserMatches();
  }, []);
  return (
    <BackgroundImage>
      <Drawer item={null} />
      <Layout>
        <NavbarTop item={0} />
        <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
          <h3 className="text-center font-Lato font-bold tracking-widest">
            Joined Matches
          </h3>
        </div>

        <div className="w-full pb-[50px]">
        { loading?
              
              <Loader/>
              

              :
          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            {
             
              matches.map((data, i) => {
              return (
                <MatchLayout
                  key={i}
                  homeTeamLogo={data?.homeLogo}
                  homeTeamName={data?.homeTeam}
                  awayTeamLogo={data?.awayLogo}
                  awayTeamName={data?.awayTeam}
                  matchTime={data?.time}
                  matchVenue={data?.venue}
                  matchLink={`${data?.fixture_id}/${data?.homeTeamId}/${data?.awayTeamId}`}
                  matchStatus={data?.matchStatus}
                  homeTeamGoals={data?.homeGoals}
                  awayTeamGoals={data?.awayGoals}
                  hideCreateTeam={true}
                  viewTeam={true}
                />
              );
            })}
          </div>
        }

        </div>
      </Layout>
      <BottomNavbar active={1} />
    </BackgroundImage>
  );
};

export default UserMatches;
