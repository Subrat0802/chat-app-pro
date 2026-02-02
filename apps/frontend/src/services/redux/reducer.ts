import { combineReducers } from "@reduxjs/toolkit";
import userSlcie from "./slices/authSlice";

const rootReducer = combineReducers({
    userState: userSlcie
})

export default rootReducer;