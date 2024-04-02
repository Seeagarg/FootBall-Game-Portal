import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from '@mui/icons-material/Home';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StarsIcon from '@mui/icons-material/Stars';
import { useNavigate } from "react-router-dom";

const BottomNavbar = ({active}) => {
  const navigate=useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:'fixed',
        bottom:8
      }}
    >
      <BottomNavigation
        sx={{ width: 300 ,borderRadius:8}}
        showLabels
        value={active}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={()=>navigate("/fantasy-team")} />
        <BottomNavigationAction label="My Matches" onClick={()=>navigate("/my-matches")} icon={<SportsSoccerIcon />} />
        <BottomNavigationAction label="Rewards" icon={<StarsIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavbar;
