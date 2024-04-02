import React from "react";
import classes from "./NavbarPlayers.module.css";
import { useDispatch } from "react-redux";
import { setActive } from "../../../slices/navbarPlayersSlice";

const NavbarPlayers = (props) => {
    const dispatch=useDispatch();
    const handleDispatch=(active,name)=>{
        dispatch(setActive({active:active,name:name}));
    }
  return (
    <div className="w-full flex justify-between items-center">
      <div
        className="flex w-full justify-around items-center gap-4 bg-background_navbar p-3 rounded-lg 
      max-[600px]:gap-2 max-[600px]:justify-center max-[600px]:p-1
      "
      >
        <div
          className={
            props.item === 0
              ? `bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer ${classes.text_trim}`
              : `p-4 text-text_navbar_color cursor-pointer ${classes.text_trim}`
          }
          onClick={()=>handleDispatch(0,'goalkeepers')}
        >
         {props.goalkeeper.length} Gk
        </div>
        <div
          className={
            props.item === 1
              ? `bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer ${classes.text_trim}`
              : `p-4 text-text_navbar_color cursor-pointer ${classes.text_trim}`
          }
          onClick={()=>handleDispatch(1,'defenders')}
        >
          {props.defenders.length} Defenders
        </div>
        <div
          className={
            props.item === 2
              ? `bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer ${classes.text_trim}`
              : `p-4 text-text_navbar_color cursor-pointer  ${classes.text_trim}`
          }
          onClick={()=>handleDispatch(2,'midfielders')}
        >
          {props.midfielders.length} MidFielders
        </div>
        <div
          className={
            props.item === 3
              ? `bg-background_navbar_item p-4 text-color_white rounded-lg cursor-pointer ${classes.text_trim}`
              : `p-4 text-text_navbar_color cursor-pointer  ${classes.text_trim}`
          }
          onClick={()=>handleDispatch(3,'attackers')}
        >
         {props.attackers.length} Attackers
        </div>
      </div>
    </div>
  );
};

export default NavbarPlayers;
