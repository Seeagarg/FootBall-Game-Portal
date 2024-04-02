import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: 0,
  name: "goalkeepers",
};

const navbarPlayersSlice = createSlice({
  name: "navbarPlayers",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload.active;
      state.name = action.payload.name;
      return state;
    },
    resetActive: (state, action) => {
      state.active = 0;
      state.name = "goalkeepers";
      return state;
    },
  },
});

export const { setActive, setName } = navbarPlayersSlice.actions;
export default navbarPlayersSlice;
