import nProgress from "nprogress";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogManager from "./dialogs/DialogManager";

const Init = () => {
    useEffect(() => {
        const run = async () => {
            nProgress.start();
            //get basic
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

export default Init;
