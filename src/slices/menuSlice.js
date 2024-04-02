import { createSlice } from "@reduxjs/toolkit";

const initialState={
    open:false
}

const menuSlice=createSlice({
    name:"menu",
    initialState,
    reducers:{
        openHandler:(state,action)=>{
            state.open=true;
            return state;
        },
        closeHandler:(state,action)=>{
            state.open=false;
            return state;
        }
    }
})

export const {openHandler,closeHandler}=menuSlice.actions;
export default menuSlice;