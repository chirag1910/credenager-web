class Api {
    constructor() {
        this.apiBaseUrl = process.env.API_BASE_URL;
    }

    callApi = async (url, bodyParams = {}) => {
        try {
            const res = await fetch(this.apiBaseUrl + url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                mode: "cors",
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify(bodyParams),
            });

            const data = await res.json();

            return data;
        } catch (err) {
            return {
                status: "error",
                code: 502,
                error: "Some error occurred, please try again later",
            };
        }
    };

    signup = (email, password, key) => {
        return this.callApi("user/signup", { email, password, key });
    };

    login = (email, password) => {
        return this.callApi("user/login", { email, password });
    };

    googleLogin = (googleToken) => {
        return this.callApi("user/login/google", { googleToken });
    };

    resetPassInit = (email) => {
        return this.callApi("user/reset/password/init", { email });
    };

    resetPass = (email, otp, password) => {
        return this.callApi("user/reset/password", { email, otp, password });
    };

    verifyKey = (key) => {
        return this.callApi("user/verify/key", { key });
    };

    resetKey = (password, key) => {
        return this.callApi("user/reset/key", { password, key });
    };

    changePassword = (oldPassword, password) => {
        return this.callApi("user/update/password", { oldPassword, password });
    };

    deleteAccount = (password, key) => {
        return this.callApi("user/delete", { password, key });
    };

    logout = () => {
        return this.callApi("user/logout");
    };

    getBasic = () => {
        return this.callApi("user/basic");
    };

    get = () => {
        return this.callApi("user/");
    };

    createGroup = (name) => {
        return this.callApi("group/create", { name });
    };

    updateGroup = (_id, name) => {
        return this.callApi("group/update", { _id, name });
    };

    deleteGroup = (_id) => {
        return this.callApi("group/delete", { _id });
    };

    createCred = (identifier, value, groupId) => {
        return this.callApi("credential/create", {
            identifier,
            value,
            groupId,
        });
    };

    updateCred = (_id, identifier, value) => {
        return this.callApi("credential/update", { _id, identifier, value });
    };

    deleteCred = (_id) => {
        return this.callApi("credential/delete", { _id });
    };
}

export default Api;
