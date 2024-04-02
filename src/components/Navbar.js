import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const {lang}=useSelector(state=>state.lang);
  
  return (
    <div className="w-full flex justify-between items-center">
      
      <div className="flex w-full justify-around items-center gap-4 bg-background_navbar p-3 rounded-lg 
      max-[600px]:gap-2 max-[600px]:justify-center max-[600px]:p-1
      ">
        <Link to="/">
          <div
            className={
              props.item === 0
                ? "bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer"
                : "p-4 text-text_navbar_color cursor-pointer"
            }
          >
             
             {lang === "english"
            ? "Live Matches"
            : lang === "french"
            ? "Matchs en direct"
            : lang==="spanish"? "Partidos en vivo":"المباريات الحية"}
              
          </div>
        </Link>
        <Link to="/recent-matches">
          <div
            className={
              props.item === 1
                ? "bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer"
                : "p-4 text-text_navbar_color cursor-pointer"
            }
          >
            
            {lang === "english"
            ? "Recent Fixtures"
            : lang === "french"
            ? "Calendriers récents"
            : lang==="spanish"? "Calendario reciente":"المباريات الأخيرة"}
          </div>
        </Link>
        <Link to="/weekly-matches">
          <div
            className={
              props.item === 2
                ? "bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer"
                : "p-4 text-text_navbar_color cursor-pointer"
            }
          >
            
            {lang === "english"
            ? "Weekly Fixtures"
            : lang === "french"
            ? "Rencontres hebdomadaires"
            : lang==="spanish"? "Calendario semanal":"المباريات الأسبوعية"}
          </div>
        </Link>

        
      </div>
      
    </div>
  );
};

export default Navbar;