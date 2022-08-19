import { combineReducers } from "redux";
import auth from "./auth";
import data from "./data";

export default combineReducers({
    auth,
    data,
});
