import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Language from "../components/MainComponents/Language";
import { toast } from "react-toastify";
import axios from "axios";
import {
  baseUrl,
  playerTopAssistsApi,
  playerTopScoresApi,
  standingsApi,
} from "../api/api";
import Loader from "../components/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlayerStandingsByGoal from "../components/MainComponents/PlayerStandingsByGoal";
import PlayerStandingsByAssists from "../components/MainComponents/PlayerStandingsByAssits";

const Standings = () => {
  const { lang } = useSelector((state) => state.lang);
  const [standingsData, setStandingsData] = useState([]);
  const [topScores, setTopScores] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopAssistsPlayer = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}${playerTopAssistsApi}`);
      setTopAssists(res?.data?.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data?.message || error?.response?.data?.message || error?.message
      );
    }
  };

  const fetchTopScorePlayers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}${playerTopScoresApi}`);
      setTopScores(res?.data?.response);
      fetchTopAssistsPlayer();
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data?.message || error?.response?.data?.message || error?.message
      );
    }
  };

  const fetchDataFromBackend = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}${standingsApi}`);
      setStandingsData(res?.data?.response[0]?.league?.standings[0]);
      fetchTopScorePlayers();
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.data?.message || error?.response?.data?.message || error?.message
      );
    }
  };
  useEffect(() => {
    fetchDataFromBackend();
  }, []);
  return (
    <BackgroundImage>
      <Drawer item={4} />
      <Layout>
        <NavbarTop item={4} />
        <Navbar item={4} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
              <h3 className="text-center font-Lato font-bold tracking-widest">
                {lang === "english"
                  ? "Premier League Standings"
                  : lang === "french"
                  ? "Classement de la Premier League"
                  : lang === "spanish"
                  ? "Clasificación de la Premier League"
                  : "ترتيب الدوري الممتاز"}
              </h3>
            </div>

            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        position: "sticky",
                        left: 0,
                        backgroundColor: "#f5f5f5",
                        zIndex: 1,
                        maxWidth: "150px",
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      Club
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      MP
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      W
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      D
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      L
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      GF
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      GA
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: "16",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      GD
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {standingsData.map((data) => {
                    return (
                      <TableRow key={data?.rank}>
                        <TableCell
                          align="center"
                          style={{
                            position: "sticky",
                            left: 0,
                            backgroundColor: "#f5f5f5",
                            zIndex: 1,
                            maxWidth: "150px",
                          }}
                        >
                          <div className="flex justify-start items-center gap-4">
                            {data?.rank}
                            <img
                              src={data?.team?.logo}
                              alt=""
                              className="w-12 h-12 object-contain"
                            />
                            {data?.team?.name}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {data?.all?.played}
                        </TableCell>
                        <TableCell align="center">{data?.all?.win}</TableCell>
                        <TableCell align="center">{data?.all?.draw}</TableCell>
                        <TableCell align="center">{data?.all?.lose}</TableCell>
                        <TableCell align="center">
                          {data?.all?.goals?.for}
                        </TableCell>
                        <TableCell align="center">
                          {data?.all?.goals?.against}
                        </TableCell>
                        <TableCell align="center">{data?.goalsDiff}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70 my-4">
              <h3 className="text-center font-Lato font-bold tracking-widest">
                Top Players
              </h3>
            </div>
            <PlayerStandingsByGoal topScores={topScores} />
            <div className="mt-4">
              <PlayerStandingsByAssists topScores={topAssists} />
            </div>
          </>
        )}
      </Layout>
      <Language />
    </BackgroundImage>
  );
};

export default Standings;
