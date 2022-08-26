import nProgress from "nprogress";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogManager from "./dialogs/DialogManager";
import { getTheme, changeTheme } from "../utils/theme";
import Api from "../utils/api";
import { connect } from "react-redux";
import {
    login as loginAction,
    setUserLoaded as setUserLoadedAction,
} from "../redux/action/auth";
import { setTheme as setThemeAction } from "../redux/action/misc";

const Init = ({ theme, loginAction, setUserLoadedAction, setThemeAction }) => {
    useEffect(() => {
        const run = async () => {
            nProgress.start();
            const response = await new Api().getBasic();

            if (response.status === "ok") {
                loginAction(response.userID, response.email);
            }
            setUserLoadedAction();
            nProgress.done();
        };
        run();
    }, []);

    useEffect(() => {
        setThemeAction(getTheme());
    }, []);

    useEffect(() => {
        changeTheme(theme);
    }, [theme]);

    return (
        <>
            <ToastContainer position="top-right" theme={theme} />
            <DialogManager />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        theme: state.misc.theme,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userID, email) => dispatch(loginAction(userID, email)),
        setUserLoadedAction: () => dispatch(setUserLoadedAction()),
        setThemeAction: (theme) => dispatch(setThemeAction(theme)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Init);
