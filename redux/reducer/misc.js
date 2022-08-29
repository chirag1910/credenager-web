import * as types from "../actionType/misc";

const INITIAL_STATE = {
    activeGroup: null,
    showGroupMenu: false,
    showAddCred: false,
    theme: "light",
    dndCred: null,
};

const misc = (state = INITIAL_STATE, action) => {
    if (action.type === types.SET_ACTIVE_GROUP) {
        return {
            ...state,
            activeGroup: action.payload,
        };
    } else if (action.type === types.SET_SHOW_GROUP_MENU) {
        return {
            ...state,
            showGroupMenu: action.payload,
        };
    } else if (action.type === types.SET_SHOW_ADD_CRED) {
        return {
            ...state,
            showAddCred: action.payload,
        };
    } else if (action.type === types.SET_THEME) {
        return {
            ...state,
            theme: action.payload,
        };
    } else if (action.type === types.SET_DND_CRED) {
        return {
            ...state,
            dndCred: action.payload,
        };
    } else {
        return state;
    }
};

export default misc;
