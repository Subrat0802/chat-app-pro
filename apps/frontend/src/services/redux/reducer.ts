import { combineReducers } from "@reduxjs/toolkit";
import userSlcie from "./slices/authSlice";
import uiSlice from "./slices/uiStates";
import currentMessage from "./slices/currentMessage";

const rootReducer = combineReducers({
    userState: userSlcie,
    uiState: uiSlice,
    msgState: currentMessage
})

export default rootReducer;