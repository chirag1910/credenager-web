import * as types from "../actionType/misc";

export const setActiveGroup = (type, id, name) => {
    return {
        type: types.SET_ACTIVE_GROUP,
        payload: {
            type,
            id,
            name,
        },
    };
};

export const setShowGroupMenu = (show) => {
    return {
        type: types.SET_SHOW_GROUP_MENU,
        payload: show,
    };
};

export const setShowAddCred = (show) => {
    return {
        type: types.SET_SHOW_ADD_CRED,
        payload: show,
    };
};

export const setTheme = (theme) => {
    return {
        type: types.SET_THEME,
        payload: theme,
    };
};
