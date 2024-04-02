import React from "react";
import MatchComparisonProgressBar from "./MatchComparisonProgressBar";
import { useSelector } from "react-redux";

const MatchComparison = ({
  teamStatistics,
}) => { 
  const {lang}=useSelector(state=>state.lang);
  return (
    <>
    <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamTotalShotsPer}
      percentage2={teamStatistics?.awayTeamTotalShotsPer}
      value1={teamStatistics?.homeTeamTotalShots!=null?teamStatistics?.homeTeamTotalShots:0}
      value2={teamStatistics?.awayTeamTotalShots!=null?teamStatistics?.awayTeamTotalShots:0}
      name={lang === "english" ? "Total Shots" : lang === "french" ? "Nombre total de tirs" : lang==="spanish"? "Disparos totales":"مجموع الطلقات"}
    />
    <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamShotsOnGoalPer}
      percentage2={teamStatistics?.awayTeamShotsOnGoalPer}
      value1={teamStatistics?.homeTeamShotsOnGoal!=null?teamStatistics?.homeTeamShotsOnGoal:0}
      value2={teamStatistics?.awayTeamShotsOnGoal!=null?teamStatistics?.awayTeamShotsOnGoal:0}
      name={lang === "english" ?"Shots On Goal" : lang === "french" ? "Tirs au but" : lang==="spanish"? "Tiros a puerta":"تسديدة على المرمى"}
    />
    <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamShotsOffGoalPer}
      percentage2={teamStatistics?.awayTeamShotsOffGoalPer}
      value1={teamStatistics?.homeTeamShotsOffGoal!=null?teamStatistics?.homeTeamShotsOffGoal:0}
      value2={teamStatistics?.awayTeamShotsOffGoal!=null?teamStatistics?.awayTeamShotsOffGoal:0}
      name={lang === "english" ?"Shots Off Goal" : lang === "french" ? "Tirs hors but" : lang==="spanish"?"Tiros fuera de portería":"التسديدات خارج المرمى"}
    />
     <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamFoulsPer}
      percentage2={teamStatistics?.awayTeamFoulsPer}
      value1={teamStatistics?.homeTeamFouls!=null?teamStatistics?.homeTeamFouls:0}
      value2={teamStatistics?.awayTeamFouls!=null?teamStatistics?.awayTeamFouls:0}
      name={lang === "english" ? "Fouls" : lang === "french" ? "Fautes" : lang==="spanish"? "Faltas":"الأخطاء"}
    />
     <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamCornerPer}
      percentage2={teamStatistics?.awayTeamCornerPer}
      value1={teamStatistics?.homeTeamCorner!=null?teamStatistics?.homeTeamCorner:0}
      value2={teamStatistics?.awayTeamCorner!=null?teamStatistics?.awayTeamCorner:0}
      name={lang === "english" ? "Corner Kicks" : lang === "french" ? "Coups de pied de coin" : lang==="spanish"?"Tiros de esquina":"ركن الركلات"}
    />
     <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamOffsidesPer}
      percentage2={teamStatistics?.awayTeamOffsidesPer}
      value1={teamStatistics?.homeTeamOffsides!=null?teamStatistics?.homeTeamOffsides:0}
      value2={teamStatistics?.awayTeamOffsides!=null?teamStatistics?.awayTeamOffsides:0}
      name={lang === "english" ? "Offsides" : lang === "french" ? "Hors-jeu" : lang==="spanish"? "Fueras de juego":"التسلل"}
    />
   
    <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamYellowCardPer}
      percentage2={teamStatistics?.awayTeamYellowCardPer}
      value1={teamStatistics?.homeTeamYellowCard!=null?teamStatistics?.homeTeamYellowCard:0}
      value2={teamStatistics?.awayTeamYellowCard!=null?teamStatistics?.awayTeamYellowCard:0}
      name={lang === "english" ? "Yellow Cards" : lang === "french" ? "Cartons jaunes" : lang==="spanish"? "Tarjetas amarillas":"البطاقات الصفراء"}
    />
    <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamRedCardPer}
      percentage2={teamStatistics?.awayTeamRedCardPer}
      value1={teamStatistics?.homeTeamRedCard!=null?teamStatistics?.homeTeamRedCard:0}
      value2={teamStatistics?.awayTeamRedCard!=null?teamStatistics?.awayTeamRedCard:0}
      name={lang === "english" ? "Red Cards" : lang === "french" ? "Cartons rouges" : lang==="spanish"? "Tarjetas rojas":"البطاقات الحمراء"}
    />
     <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamPossession.replace('%','')}
      percentage2={teamStatistics?.awayTeamPossession.replace('%','')}
      value1={teamStatistics?.homeTeamPossession!=null?teamStatistics?.homeTeamPossession:0}
      value2={teamStatistics?.awayTeamPossession!=null?teamStatistics?.awayTeamPossession:0}
      name={lang === "english" ? "Ball Possession" : lang === "french" ? "Possession de la balle" : lang==="spanish"?"Posesión del balón":"امتلاك الكرة"}
    />
      <MatchComparisonProgressBar
      percentage1={teamStatistics?.homeTeamPassesPer}
      percentage2={teamStatistics?.awayTeamPassesPer}
      value1={teamStatistics?.homeTeamPasses!=null?teamStatistics?.homeTeamPasses:0}
      value2={teamStatistics?.awayTeamPasses!=null?teamStatistics?.awayTeamPasses:0}
      name={lang === "english" ? "Passes" : lang === "french" ? "Laissez-passer" : lang==="spanish"? "Pases":"يمر، يمرر، اجتاز بنجاح"}

    />
    </>

  );
};

export default MatchComparison;
