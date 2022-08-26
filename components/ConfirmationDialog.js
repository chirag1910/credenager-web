import { useState, useEffect, useRef } from "react";
import styles from "../styles/confirmationDialog.module.css";

const ConfirmationDialog = ({
    heading = "Are you sure?",
    buttonText = "Yes",
    onCancel = () => {},
    onSuccess = () => {},
}) => {
    const dialog = useRef(null);

    const [show, setShow] = useState(false);
    const [dismissable, setDismissable] = useState(true);

    useEffect(() => {
        setShow(true);
        if (dismissable) {
            window.addEventListener("mousedown", handleMouseClick);
            window.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            window.removeEventListener("mousedown", handleMouseClick);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [dismissable]);

    const handleKeyPress = (e) => {
        e = e || window.event;
        if (e.code === "Escape") {
            e.preventDefault();
            handleDismiss();
        }
    };

    const handleMouseClick = (e) => {
        if (dialog.current && !dialog.current.contains(e.target)) {
            handleDismiss();
        }
    };

    const handleDismiss = () => {
        setShow(false);
        onCancel();
    };

    const handleSuccess = () => {
        setDismissable(false);
        onSuccess();
    };

    return (
        <>
            <div
                className={[styles.main, show ? styles.show : undefined].join(
                    " "
                )}
            >
                <div className={styles.body} ref={dialog}>
                    <div className={styles.container}>
                        <h3>{heading}</h3>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                onClick={handleDismiss}
                                disabled={!dismissable}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                onClick={handleSuccess}
                                disabled={!dismissable}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;
