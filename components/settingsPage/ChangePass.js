import styles from "../../styles/dialog/authForm.module.css";
import dialogStyles from "../../styles/dialog/dialog.module.css";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";

const ChangePass = ({ close = () => {} }) => {
    const dialog = useRef(null);

    const [oldPass, setoldPass] = useState("");
    const [pass, setPass] = useState("");

    const [showPass, setShowPass] = useState(false);

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

            const response = await new Api().changePassword(oldPass, pass);

            if (response.status === "ok") {
                toast.success(response.message);
                handleDismiss();
            } else {
                toast.error(response.error);
            }

            setLoading(false);
        }
    };

    const isValidForm = () => {
        if (!oldPass) {
            toast.error("Old password is required");
            return false;
        }

        if (!pass) {
            toast.error("New password is required");
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
                        <h2>Change Password</h2>
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            style={{ marginBottom: "0px" }}
                        >
                            <div className={styles.formControl}>
                                <label htmlFor="oldPass" />
                                <div className={styles.inputField}>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        id="oldPass"
                                        name="oldPass"
                                        placeholder="Old Password"
                                        value={oldPass}
                                        onChange={(e) =>
                                            setoldPass(e.target.value)
                                        }
                                        autoFocus="true"
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
                                <label htmlFor="pass" />
                                <div className={styles.inputField}>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        id="pass"
                                        name="pass"
                                        placeholder="New Password"
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

                            <button
                                className={styles.formButton}
                                type="submit"
                                disabled={loading}
                            >
                                Change
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePass;
