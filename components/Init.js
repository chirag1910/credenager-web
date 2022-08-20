import nProgress from "nprogress";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogManager from "./dialogs/DialogManager";
import Api from "../utils/api";
import { connect } from "react-redux";
import {
    login as loginAction,
    setUserLoaded as setUserLoadedAction,
} from "../redux/action/auth";

const Init = ({ loginAction, setUserLoadedAction }) => {
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

    return (
        <>
            <ToastContainer position="top-right" />
            <DialogManager />
            {/* TODO: toast theme */}
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userID, email) => dispatch(loginAction(userID, email)),
        setUserLoadedAction: () => dispatch(setUserLoadedAction()),
    };
};

export default connect(null, mapDispatchToProps)(Init);
