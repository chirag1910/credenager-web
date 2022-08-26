import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/dialog/authForm.module.css";
import dialogStyles from "../../styles/dialog/dialog.module.css";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { logout as logoutAction } from "../../redux/action/auth";
import {
    setCreds as setCredsAction,
    setGroups as setGroupsAction,
} from "../../redux/action/data";

const DeleteAccount = ({
    close = () => {},
    logoutAction,
    setCredsAction,
    setGroupsAction,
}) => {
    const router = useRouter();

    const dialog = useRef(null);

    const [pass, setPass] = useState("");
    const [key, setKey] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    useEffect(() => {
        setShow(true);
        window.addEventListener("mousedown", handleMouseClick);
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("mousedown", handleMouseClick);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

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
        setLoading(false);
        setShow(false);
        close();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            const response = await new Api().deleteAccount(pass, key);

            if (response.status === "ok") {
                toast.success(response.message);
                setCredsAction([]);
                setGroupsAction([]);
                logoutAction();
                router.push("/");
            } else {
                toast.error(response.error);
            }

            setLoading(false);
        }
    };

    const isValidForm = () => {
        if (!pass) {
            toast.error("Password is required");
            return false;
        }

        if (!key) {
            toast.error("Encryption key is required");
            return false;
        }
        return true;
    };

    return (
        <>
            <div
                className={[
                    dialogStyles.main,
                    show ? dialogStyles.show : undefined,
                ].join(" ")}
            >
                <div className={dialogStyles.container} ref={dialog}>
                    <div className={styles.main}>
                        <h2>Delete Account</h2>
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            style={{ marginBottom: "0px" }}
                        >
                            <div className={styles.formControl}>
                                <label htmlFor="pass" />
                                <div className={styles.inputField}>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        id="pass"
                                        name="pass"
                                        placeholder="Password"
                                        value={pass}
                                        onChange={(e) =>
                                            setPass(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                    >
                                        {showPass ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formControl}>
                                <label htmlFor="key" />
                                <div className={styles.inputField}>
                                    <input
                                        type={showKey ? "text" : "password"}
                                        id="key"
                                        name="key"
                                        placeholder="Encryption Key"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowKey(!showKey)}
                                    >
                                        {showKey ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formControl}>
                                <label
                                    htmlFor="confirmation"
                                    value="confirmation"
                                />
                                <div className={styles.inputField}>
                                    <input
                                        type="text"
                                        id="confirmation"
                                        name="confirmation"
                                        placeholder='Type "Delete" to confirm'
                                        value={confirmation}
                                        onChange={(e) =>
                                            setConfirmation(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <button
                                className={styles.formButton}
                                type="submit"
                                disabled={
                                    loading ||
                                    confirmation.toLowerCase() !== "delete"
                                }
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logoutAction()),
        setGroupsAction: (groups) => dispatch(setGroupsAction(groups)),
        setCredsAction: (creds) => dispatch(setCredsAction(creds)),
    };
};

export default connect(null, mapDispatchToProps)(DeleteAccount);
