import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeHandler } from "../../slices/slideUp";
import { baseUrl, playerStatisticsApi } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";
import ModalNavbar from "./ModalNavbar";
import { Slide } from "@mui/material";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "0%",
  left: "0%",
  transform: "translate(0%, 0%)",
  width: "100%",
  height: "100vh",
  overflowY: "scroll",
  bgcolor: "background.paper",
};

export default function PlayerStatisticsModal() {
  const { openSlide, id } = useSelector((state) => state.slide);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState();
  const [statistics, setStatistics] = useState([]);
  const { lang } = useSelector((state) => state.lang);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeHandler());
  };

  const fetchDataFromBackend = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}${playerStatisticsApi}${id}`);
      console.log(res?.data, "res");
      setPlayer(res?.data?.response?.player);
      setStatistics(res?.data?.response?.statistics);
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong..."
      );
      dispatch(closeHandler());
    }
  };
  console.log(player, "player");
  console.log(statistics, "player statistics");

  useEffect(() => {
    if (openSlide) {
      fetchDataFromBackend();
    }
  }, [id, openSlide]);

  return (
    <Modal
      open={openSlide}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Slide direction="up" in={openSlide} mountOnEnter unmountOnExit>
        <Box sx={style}>
          <ModalNavbar />
          {loading ? (
            <Loader />
          ) : (
            <Layout>
              <div className="flex justify-center items-center my-4">
                <img
                  src={player?.photo}
                  alt={player?.name}
                  className="object-cover w-40 h-40"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-900 rounded-lg p-4 w-2/4 max-[900px]:w-full">
                  <div className="p-2">
                    <h1 className="text-white">
                      {lang === "english"
                        ? "Name:"
                        : lang === "french"
                        ? "Nom:"
                        : lang === "spanish"
                        ? "Nombre:"
                        : "اسم:"}{" "}
                      {player?.firstname} {player?.lastname}
                    </h1>
                  </div>
                  <div className="p-2">
                    <h1 className="text-white">
                      {lang === "english"
                        ? "Age :"
                        : lang === "french"
                        ? "Âge :"
                        : lang === "spanish"
                        ? "Edad :"
                        : "عمر :"}
                      {player?.age}
                    </h1>
                  </div>
                  <div className="p-2">
                    <h1 className="text-white">
                      {lang === "english"
                        ? " Nationality: "
                        : lang === "french"
                        ? "Nationalité:"
                        : lang === "spanish"
                        ? "Nacionalidad:"
                        : "جنسية:"}
                      {player?.nationality}
                    </h1>
                  </div>
                </div>
              </div>

              <div class="my-8 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Current Team"
                          : lang === "french"
                          ? "Équipe actuelle"
                          : lang === "spanish"
                          ? "Equipo actual"
                          : "الفريق الحالي"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Position"
                          : lang === "french"
                          ? "Position"
                          : lang === "spanish"
                          ? "Posición"
                          : "موضع"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Games Played"
                          : lang === "french"
                          ? "Parties jouées"
                          : lang === "spanish"
                          ? "Juegos jugados"
                          : "الألعاب التي تم لعبها"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Goals Done"
                          : lang === "french"
                          ? "Objectifs atteints"
                          : lang === "spanish"
                          ? "Metas cumplidas"
                          : "تم تنفيذ الأهداف"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Goals Conceded"
                          : lang === "french"
                          ? "Buts encaissés"
                          : lang === "spanish"
                          ? "Objetivos concedidos"
                          : "الأهداف قبلت"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Goals Saved"
                          : lang === "french"
                          ? "Buts enregistrés"
                          : lang === "spanish"
                          ? "Metas guardadas"
                          : "الأهداف المحفوظة"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Assists"
                          : lang === "french"
                          ? "Aides"
                          : lang === "spanish"
                          ? "Asistencias"
                          : "يساعد"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Minutes"
                          : lang === "french"
                          ? "Minutes"
                          : lang === "spanish"
                          ? "Minutos"
                          : "دقائق"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Rating"
                          : lang === "french"
                          ? "Notation"
                          : lang === "spanish"
                          ? "Clasificación"
                          : "تقييم"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {statistics[0]?.team?.name}
                      </th>
                      <td class="px-6 py-4">
                        {statistics[0]?.games?.position == null
                          ? 0
                          : statistics[0]?.games?.position}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.games?.appearences == null
                          ? 0
                          : statistics[0]?.games?.appearences}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.goals?.total == null
                          ? 0
                          : statistics[0]?.goals?.total}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.goals?.conceded == null
                          ? 0
                          : statistics[0]?.goals?.conceded}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.goals?.saves == null
                          ? 0
                          : statistics[0]?.goals?.saves}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.goals?.assists == null
                          ? 0
                          : statistics[0]?.goals?.assists}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.games?.minutes == null
                          ? 0
                          : statistics[0]?.games?.minutes}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.games?.rating == null
                          ? "Not Rated"
                          : statistics[0]?.games?.rating}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {lang === "english"
                      ? "Player Tackles"
                      : lang === "french"
                      ? "Tacles des joueurs"
                      : lang === "spanish"
                      ? "Entradas del jugador"
                      : "تدخلات اللاعب"}

                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"></p>
                  </caption>
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Total Tackles"
                          : lang === "french"
                          ? "Total des plaquages"
                          : lang === "spanish"
                          ? "Tacleadas totales"
                          : "إجمالي التدخلات"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Blocks"
                          : lang === "french"
                          ? "Blocs"
                          : lang === "spanish"
                          ? "Bloques"
                          : "كتل"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Interceptions"
                          : lang === "french"
                          ? "Interceptions"
                          : lang === "spanish"
                          ? "Intercepciones"
                          : "اعتراضات"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Dribbles"
                          : lang === "french"
                          ? "Dribbles"
                          : lang === "spanish"
                          ? "regates"
                          : "المراوغات"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Dribbles Success"
                          : lang === "french"
                          ? "Succès des dribbles"
                          : lang === "spanish"
                          ? "Éxito en regates"
                          : "نجاح المراوغات"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {statistics[0]?.tackles?.total == null
                          ? 0
                          : statistics[0]?.tackles?.total}
                      </th>
                      <td class="px-6 py-4">
                        {statistics[0]?.tackles?.blocks == null
                          ? 0
                          : statistics[0]?.tackles?.blocks}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.tackles?.interceptions == null
                          ? 0
                          : statistics[0]?.tackles?.interceptions}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.dribbles?.attempts == null
                          ? 0
                          : statistics[0]?.dribbles?.attempts}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.dribbles?.success == null
                          ? 0
                          : statistics[0]?.dribbles?.success}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="my-8 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {lang === "english"
                      ? "Player Shots"
                      : lang === "french"
                      ? "Tirs des joueurs"
                      : lang === "spanish"
                      ? "Tiros de jugador"
                      : "لقطات اللاعب"}

                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"></p>
                  </caption>
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Total Shots"
                          : lang === "french"
                          ? "Nombre total de tirs"
                          : lang === "spanish"
                          ? "Disparos totales"
                          : "مجموع الطلقات"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Shots on Goal"
                          : lang === "french"
                          ? "Tirs au but"
                          : lang === "spanish"
                          ? "Tiros a puerta"
                          : "تسديدة على المرمى"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {statistics[0]?.shots?.total == null
                          ? 0
                          : statistics[0]?.shots?.total}
                      </th>
                      <td class="px-6 py-4">
                        {statistics[0]?.shots?.on == null
                          ? 0
                          : statistics[0]?.shots?.on}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="my-8 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {lang === "english"
                      ? "Player Fouls"
                      : lang === "french"
                      ? "Fautes des joueurs"
                      : lang === "spanish"
                      ? "Faltas de jugador"
                      : "أخطاء اللاعب"}

                    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"></p>
                  </caption>
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Total Fouls"
                          : lang === "french"
                          ? "Total des fautes"
                          : lang === "spanish"
                          ? "Total de faltas"
                          : "مجموع الأخطاء"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Yellow Card"
                          : lang === "french"
                          ? "Carte jaune"
                          : lang === "spanish"
                          ? "Tarjeta amarilla"
                          : "بطاقة صفراء"}
                      </th>
                      <th scope="col" class="px-6 py-3">
                        {lang === "english"
                          ? "Red Card"
                          : lang === "french"
                          ? "Carte rouge"
                          : lang === "spanish"
                          ? "Tarjeta roja"
                          : "البطاقة الحمراء"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {statistics[0]?.fouls?.committed == null
                          ? 0
                          : statistics[0]?.fouls?.committed}
                      </th>
                      <td class="px-6 py-4">
                        {statistics[0]?.cards?.yellow == null
                          ? 0
                          : statistics[0]?.cards?.yellow}
                      </td>
                      <td class="px-6 py-4">
                        {statistics[0]?.cards?.red == null
                          ? 0
                          : statistics[0]?.cards?.red}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Layout>
          )}
        </Box>
      </Slide>
    </Modal>
  );
}
