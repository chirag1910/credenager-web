import * as types from "../actionType/data";

export const setDataLoaded = () => {
    return {
        type: types.SET_DATA_LOADED,
        payload: true,
    };
};

export const setGroups = (groups) => {
    return {
        type: types.SET_GROUPS,
        payload: groups,
    };
};

export const addGroup = (_id, name) => {
    return {
        type: types.ADD_GROUP,
        payload: {
            _id,
            name,
        },
    };
};

export const deleteGroup = (id) => {
    return {
        type: types.DELETE_GROUP,
        payload: id,
    };
};

export const updateGroup = (id, name) => {
    return {
        type: types.UPDATE_GROUP,
        payload: {
            id,
            name,
        },
    };
};

export const setCreds = (creds) => {
    return {
        type: types.SET_CREDS,
        payload: creds,
    };
};

export const addCred = (_id, identifier, value) => {
    return {
        type: types.ADD_CRED,
        payload: {
            _id,
            identifier,
            value,
        },
    };
};

export const deleteCred = (id) => {
    return {
        type: types.DELETE_CRED,
        payload: id,
    };
};

export const updateCred = (id, identifier, value) => {
    return {
        type: types.UPDATE_CRED,
        payload: {
            id,
            identifier,
            value,
        },
    };
};

export const updateCredGroup = (id, groupId) => {
    return {
        type: types.UPDATE_CRED_GROUP,
        payload: {
            id,
            groupId,
        },
    };
};
