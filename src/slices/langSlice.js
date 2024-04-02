import { createSlice } from "@reduxjs/toolkit";

const storedLangState = JSON.parse(localStorage.getItem("lang"));
const initialState = storedLangState
  ? storedLangState
  : {
      lang: "english",
    };

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLangToFrench: (state, action) => {
      state.lang = "french";
      localStorage.setItem("lang", JSON.stringify(state));
      return state;
    },
    changeLangToSpanish: (state, action) => {
      state.lang = "spanish";
      localStorage.setItem("lang", JSON.stringify(state));
      return state;
    },
    changeLangToEnglish: (state, action) => {
      state.lang = "english";
      localStorage.setItem("lang", JSON.stringify(state));
      return state;
    },
    changeLangToArabic: (state, action) => {
      state.lang = "arabic";
      localStorage.setItem("lang", JSON.stringify(state));
      return state;
    },
  },
});

export const {
  changeLangToFrench,
  changeLangToSpanish,
  changeLangToArabic,
  changeLangToEnglish,
} = langSlice.actions;
export default langSlice;
