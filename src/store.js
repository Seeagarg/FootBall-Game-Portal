import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slices/menuSlice";
import slideUpSlice from "./slices/slideUp";
import langSlice from "./slices/langSlice";
import navbarPlayersSlice from "./slices/navbarPlayersSlice";
import userTeamSlice from "./slices/userTeamSlice";
import userSlice from "./slices/userSlice";

const store=configureStore({
    reducer:{    
        menu:menuSlice.reducer,
        slide:slideUpSlice.reducer,
        lang:langSlice.reducer,
        navbarPlayersSlice:navbarPlayersSlice.reducer,
        userTeamSlice:userTeamSlice.reducer,
        userSlice:userSlice.reducer
    },
});
export default store;