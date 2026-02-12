import { combineReducers } from "@reduxjs/toolkit";
import userSlcie from "./slices/authSlice";
import uiSlice from "./slices/uiStates";

const rootReducer = combineReducers({
    userState: userSlcie,
    uiState: uiSlice
})

export default rootReducer;