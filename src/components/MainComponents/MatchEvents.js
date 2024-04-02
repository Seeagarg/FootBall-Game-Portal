import React from "react";
import { useSelector } from "react-redux";

const MatchEvents = ({data}) => {
  const {lang}=useSelector(state=>state.lang);

  return (
    <div
      className="bg-gradient-to-r from-stone-900/100 to-stone-900/100
                rounded-lg p-4"
    >
      <div className="flex justify-center items-center">
      {lang === "english" ? "Time:" : lang === "french" ? "Temps:" : lang==="spanish"? "Tiempo:":"وقت:"} {data?.time?.elapsed}`
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div>{lang === "english" ? "Goal By : " : lang === "french" ? "Objectif d'ici :" : lang==="spanish"? "Gol por:":"الوقت:"}{data?.player?.name}</div>
      </div>
    </div>
  );
};

export default MatchEvents;
