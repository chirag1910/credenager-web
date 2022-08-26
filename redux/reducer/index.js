import { combineReducers } from "redux";
import auth from "./auth";
import data from "./data";
import misc from "./misc";

export default combineReducers({
    auth,
    data,
    misc,
});
