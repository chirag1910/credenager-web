import styles from "../../styles/dialog/authForm.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const ResetKey = ({ encKey }) => {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [key, setKey] = useState("");
    const [confirmation, setConfirmation] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (encKey) {
            router.replace("");
        }
    }, [encKey]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            const response = await new Api().resetKey(password, key);

            if (response.status === "ok") {
                toast.success(response.message);
                router.replace({
                    href: "",
                    query: {
                        action: "key",
                    },
                });
            } else {
                toast.error(response.error);
                setLoading(false);
            }
        }
    };

    const isValidForm = () => {
        if (!password) {
            toast.error("Password is required");
            return false;
        }

        if (!key) {
            toast.error("Encryption key is required");
            return false;
        }

        return true;
    };

    const handleAction = (action) => {
        router.replace({ href: "", query: { action } });
    };

    return (
        <>
            <div className={styles.main}>
                <h2>Reset Key</h2>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className={styles.formControl}>
                        <label htmlFor="password" value="password" />
                        <div className={styles.inputField}>
                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <label htmlFor="key" value="key" />
                        <div className={styles.inputField}>
                            <input
                                type={showKey ? "text" : "password"}
                                id="key"
                                name="key"
                                placeholder="New Encryption Key"
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
                        <label htmlFor="confirmation" value="confirmation" />
                        <div className={styles.inputField}>
                            <input
                                type="text"
                                id="confirmation"
                                name="confirmation"
                                placeholder='Type "Reset" to confirm'
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
                            loading || confirmation.toLowerCase() !== "reset"
                        }
                    >
                        Reset key
                    </button>
                </form>

                <p>
                    <strong>
                        Note: All the data will be wiped out as the key is
                        non-recoverable!
                    </strong>
                </p>

                <button
                    className={styles.linkButton}
                    type="button"
                    onClick={() => handleAction("key")}
                >
                    Verify key instead?
                </button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        encKey: state.auth.key,
    };
};

export default connect(mapStateToProps)(ResetKey);
