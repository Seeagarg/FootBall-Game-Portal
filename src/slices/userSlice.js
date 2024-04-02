import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../cookie/cookie";

const initialState = {
  user: getCookie("token") ? getCookie("token") : null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
        state.user=action.payload;
        setCookie(action.payload);
        return state;
    },
    logoutUser:(state,action)=>{
      state.user=null;
      removeCookie("token");
      return state;
    }
  },
});

export const {setUser,logoutUser}=userSlice.actions;

export default userSlice;