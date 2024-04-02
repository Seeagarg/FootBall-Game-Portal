import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [],
};

const userTeamSlice = createSlice({
  name: "userTeam",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      if (state.team.find((data) => data?.id == action.payload?.id)) {
        return;
      } else {
        state.team = [...state.team, action.payload];
        return state;
      }
    },
    removePlayer: (state, action) => {
      state.team = state.team.filter((data) => data?.id != action.payload);
      return state;
    },
    addCaptain: (state, action) => {
      
      const playerIndex = state.team.findIndex(
        (player) => player.id === action.payload
      );
      if (playerIndex !== -1) {
        state.team[playerIndex].captain = true;
      }
      return state;
    },
    removeCaptain: (state, action) => {
      console.log(action.payload);
      const playerIndex = state.team.findIndex(
        (player) => player.id === action.payload
      );
      if (playerIndex !== -1) {
        state.team[playerIndex].captain = false;
      }
      return state;
    },
    addViceCaptain: (state, action) => {
      const playerIndex = state.team.findIndex(
        (player) => player.id === action.payload
      );
      if (playerIndex !== -1) {
        state.team[playerIndex].viceCaptain = true;
      }
      return state;
    },
    removeViceCaptain: (state, action) => {
      const playerIndex = state.team.findIndex(
        (player) => player.id === action.payload
      );
      if (playerIndex !== -1) {
        state.team[playerIndex].viceCaptain = false;
      }
      return state;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
      return state;
    },
    resetTeam: (state, action) => {
      state.team = [];
      return state;
    },
  },
});

export const { addPlayer, removePlayer, setTeam,resetTeam,addCaptain,addViceCaptain,removeCaptain,removeViceCaptain } = userTeamSlice.actions;
export default userTeamSlice;
