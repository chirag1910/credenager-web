import * as types from "../actionType/auth";

const INITIAL_STATE = {
    user: null,
    loaded: false,
    key: null,
};

const auth = (state = INITIAL_STATE, action) => {
    if (action.type === types.LOGIN) {
        return {
            ...state,
            user: action.payload,
        };
    } else if (action.type === types.LOGOUT) {
        return {
            ...state,
            user: action.payload,
            key: null,
        };
    } else if (action.type === types.SET_USER_LOADED) {
        return {
            ...state,
            loaded: action.payload,
        };
    } else if (action.type === types.SET_KEY) {
        return {
            ...state,
            key: action.payload,
        };
    } else {
        return state;
    }
};

export default auth;
