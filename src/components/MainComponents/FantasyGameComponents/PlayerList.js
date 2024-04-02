import React from "react";
import classes from "./PlayerList.module.css";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer, removePlayer } from "../../../slices/userTeamSlice";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";

const PlayerList = ({
  dataItem,
  teamName,
  attackers,
  defenders,
  midfielders,
  goalkeeper,
  homeTeam,
  awayTeam
}) => {
  const { team } = useSelector((state) => state.userTeamSlice);
  const dispatch = useDispatch();

  const handleAddClick = (data) => {
    console.log(data,'data in add');
    console.log(homeTeam,awayTeam)
    if(data?.position=='Goalkeeper' && goalkeeper.length==1){
      toast.info("You Can Only Select 1 GoalKeeper!");
      return;
    }
    if(data?.position=='Midfielder' && midfielders.length==4){
      toast.info("You Can Only Select 4 Midfielders!");
      return;
    }
    if(data?.position=='Defender' && defenders.length==4){
      toast.info("You Can Only Select 4 Defenders!");
      return;
    }
    if(data?.position=='Attacker' && attackers.length==2){
      toast.info("You Can Only Select 2 Attackers!");
      return;
    }
    dispatch(addPlayer(data));
  };

  const handleRemoveClick = (id) => {
    dispatch(removePlayer(id));
  };


  return (
    <>
      <div key={dataItem?.id} className={classes.players_sub_container}>
        <div className={classes.player_info_container}>
          <div className={classes.player_info}>
            <div className={classes.player_image}>
              <img
                src={dataItem?.photo}
                alt={dataItem?.name}
                className={classes.img}
              />
            </div>
          </div>
          <div className={classes.player_name}>
            <p>
              {dataItem?.name} <br />
              ({teamName})
            </p>
          </div>
          {
            (homeTeam?.find((data)=>data.player.id == dataItem.id) || awayTeam?.find((data)=>data.player.id == dataItem.id)) && (team.find((data)=>data.id == dataItem?.id))
            && 
            <div className='text-white'>
            playing
          </div>
          }
        </div>
        {team?.find((data) => {
          return data?.id == dataItem?.id;
        }) ? (
          <IconButton
            aria-label="delete"
            color="success"
            onClick={() => handleRemoveClick(dataItem?.id)}
            sx={{ backgroundColor: "rgba(255,255,255,1)" }}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            color="success"
            onClick={() => handleAddClick({ ...dataItem, teamName,captain:false,viceCaptain:false })}
            sx={{ backgroundColor: "rgba(255,255,255,1)" }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.underline}></div>
    </>
  );
};

export default PlayerList;
