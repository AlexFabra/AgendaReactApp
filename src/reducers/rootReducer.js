import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})