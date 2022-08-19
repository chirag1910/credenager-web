import * as types from "../actionType/auth";

export const login = (userID, email) => {
    return {
        type: types.LOGIN,
        payload: {
            userID,
            email,
        },
    };
};

export const logout = () => {
    return {
        type: types.LOGOUT,
        payload: null,
    };
};

export const setUserLoaded = () => {
    return {
        type: types.SET_USER_LOADED,
        payload: true,
    };
};

export const setKey = (key) => {
    return {
        type: types.SET_KEY,
        payload: key,
    };
};
