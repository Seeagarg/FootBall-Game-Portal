import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch,useSelector } from "react-redux";
import { openHandler } from "../../slices/slideUp";

const Accordian = ({ team, formation, coach, startXI }) => {
  const {lang}=useSelector(state=>state.lang);
  const dispatch=useDispatch();
  const getPlayerDetails = async (id) => {
    dispatch(openHandler(id));
  };
  return (
    <div>
      <Accordion sx={{ backgroundColor: "black", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex flex-row justify-between mr-10 items-center w-full max-[800px]:mr-4">
            <div className="flex flex-row gap-2 justify-start items-center">
              <img
                src={team?.logo}
                alt={team?.name}
                className="object-fit h-12"
              />
              <p>{team?.name}</p>
            </div>
            <div>{lang === "english" ? "Formation:" : lang === "french" ? "Formation:" : lang ==="spanish"?"Formación:":"تشكيل:"} {formation}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-8 flex flex-col justify-center">
            <div className="flex flex-col justify-center gap-4">
              <div className="flex p-2 bg-black flex-row justify-start gap-4 items-center">
                <div className="w-full text-center">{lang === "english" ? "Player Number" : lang === "french" ? "Numéro de joueur" : lang==="spanish"? "Número de jugador":"رقم اللاعب"}</div>
                <div className="w-full text-center">{lang === "english" ? "Player Name" : lang === "french" ? "Nom de joueur" : lang==="spanish"?"Nombre del jugador":"اسم اللاعب"}</div>
                <div className="w-full text-center">{lang === "english" ? "Player Position" : lang === "french" ? "La position du joueur" : lang==="spanish"? "Posición de jugador":"مركز اللاعب"}</div>
                <div className="w-full text-center">
                  <BoyIcon sx={{ color: "white" }} />
                </div>
              </div>
              {startXI.map((data, i) => {
                const { player } = data;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      getPlayerDetails(player?.id);
                    }}
                    className="flex p-2 cursor-pointer bg-black flex-row justify-start gap-4 items-center"
                  >
                    <div className="w-full text-center">{player?.number}</div>
                    <div className="w-full text-center">{player?.name}</div>
                    <div className="w-full text-center">
                      {player?.pos == "D"
                        ? "Defence"
                        : player?.pos == "F"
                        ? "Forward"
                        : player?.pos == "G"
                        ? "GoalKeeper"
                        : player?.pos == "M"
                        ? "MidFielder"
                        : null}
                    </div>
                    <div className="w-full text-center">
                      <BoyIcon sx={{ color: "white" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-2 bg-gradient-to-r from-black to-black ">
            <p className="text-center">{lang === "english" ? "Coach:" : lang === "french" ? "Entraîneur:" : lang==="spanish"?"Entrenador:":"مدرب"} {coach?.name}</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordian;
