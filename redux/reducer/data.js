import * as types from "../actionType/data";

const INITIAL_STATE = {
    groups: [],
    creds: [],
    loaded: false,
};

const data = (state = INITIAL_STATE, action) => {
    if (action.type === types.SET_DATA_LOADED) {
        return {
            ...state,
            loaded: action.payload,
        };
    } else if (action.type === types.SET_GROUPS) {
        return {
            ...state,
            groups: action.payload,
        };
    } else if (action.type === types.ADD_GROUP) {
        return {
            ...state,
            groups: [...state.groups, action.payload],
        };
    } else if (action.type === types.DELETE_GROUP) {
        return {
            ...state,
            groups: state.groups.filter(
                (group) => group._id !== action.payload
            ),
        };
    } else if (action.type === types.UPDATE_GROUP) {
        return {
            ...state,
            groups: state.groups.map((group) =>
                group._id !== action.payload.id
                    ? group
                    : { ...group, name: action.payload.name }
            ),
        };
    } else if (action.type === types.SET_CREDS) {
        return {
            ...state,
            creds: action.payload,
        };
    } else if (action.type === types.ADD_CRED) {
        return {
            ...state,
            creds: [...state.creds, action.payload],
        };
    } else if (action.type === types.DELETE_CRED) {
        return {
            ...state,
            creds: state.creds.filter((cred) => cred._id !== action.payload),
        };
    } else if (action.type === types.UPDATE_CRED) {
        return {
            ...state,
            creds: state.creds.map((cred) =>
                cred._id !== action.payload.id
                    ? cred
                    : {
                          ...cred,
                          identifier: action.payload.identifier,
                          value: action.payload.value,
                      }
            ),
        };
    } else if (action.type === types.UPDATE_CRED_GROUP) {
        return {
            ...state,
            creds: state.creds.map((cred) =>
                cred._id !== action.payload.id
                    ? cred
                    : {
                          ...cred,
                          groupId: action.payload.groupId,
                      }
            ),
        };
    } else {
        return state;
    }
};

export default data;
