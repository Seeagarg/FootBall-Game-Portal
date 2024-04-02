import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("slideUpState"));
const initialState = storedState ? storedState : {
    openSlide: false,
    id:null
};

const slideUpSlice = createSlice({
    name: "slideUp",
    initialState,
    reducers: {
        openHandler: (state, action) => {
            state.openSlide = true;
            state.id=action.payload;
            localStorage.setItem("slideUpState", JSON.stringify(state));
            return state;
        },
        closeHandler: (state, action) => {
            state.openSlide = false;
            state.id=null;
            localStorage.removeItem("slideUpState");
            return state;
        }
    }
});

export const { openHandler, closeHandler } = slideUpSlice.actions;
export default slideUpSlice;
