import styles from "../../styles/dialog/authForm.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { connect } from "react-redux";
import { setKey as setKeyAction } from "../../redux/action/auth";

const VerifyKey = ({ user, userLoaded, encKey, setKeyAction }) => {
    const router = useRouter();

    const [key, setKey] = useState("");

    const [showKey, setShowKey] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (encKey) {
            router.replace({
                href: "",
                query: {
                    ...router.query,
                    action: null,
                },
            });
        }
    }, [encKey]);

    useEffect(() => {
        if (userLoaded && !user) {
            router.replace({
                href: "",
                query: {
                    ...router.query,
                    action: "login",
                    next: "?action=key",
                },
            });
        }
    }, [user, userLoaded]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            const response = await new Api().verifyKey(key);

            if (response.status === "ok") {
                toast.success("Key verified");
                setKeyAction(key);
            } else {
                toast.error(response.error);
            }

            setLoading(false);
        }
    };

    const isValidForm = () => {
        if (!key) {
            toast.error("Key is required");
            return false;
        }

        return true;
    };

    const handleAction = (action) => {
        router.replace({ href: "", query: { ...router.query, action } });
    };

    return (
        <>
            <div className={styles.main}>
                <h2>Verify Key</h2>
                <h3>
                    {userLoaded
                        ? `Logged in as ${user?.email}`
                        : "Getting User Information..."}
                </h3>

                <form onSubmit={(e) => handleSubmit(e)}>
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
                                autoFocus="true"
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                            >
                                {showKey ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        className={styles.formButton}
                        type="submit"
                        disabled={loading}
                    >
                        Verify
                    </button>
                </form>

                <button
                    className={styles.linkButton}
                    type="button"
                    onClick={() => handleAction("reset_key")}
                >
                    Forgot key?
                </button>

                {/* Logout button */}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoaded: state.auth.loaded,
        encKey: state.auth.key,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setKeyAction: (key) => dispatch(setKeyAction(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKey);
