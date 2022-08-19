import styles from "../../styles/dialog/authForm.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { connect } from "react-redux";
import {
    login as loginAction,
    setKey as setKeyAction,
} from "../../redux/action/auth";

const Signup = ({ user, loginAction, setKeyAction }) => {
    const router = useRouter();
    const { next, prefill } = router.query;

    const [email, setEmail] = useState(prefill || "");
    const [password, setPassword] = useState("");
    const [key, setKey] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.query = {};
            router.replace(next ? next : router);
        }
    }, [user]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            const response = await new Api().signup(
                email.trim(),
                password,
                key
            );

            if (response.status === "ok") {
                toast.success(response.message);
                setKeyAction(key);
                loginAction(response.userID, response.email);
            } else {
                toast.error(response.error);
                setLoading(false);
            }
        }
    };

    const isValidForm = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }

        if (!password) {
            toast.error("Password is required");
            return false;
        }

        if (password.length < 8) {
            toast.error("Minimum password length must be 8 characters");
            return false;
        }

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
                <h2>Signup</h2>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.formControl}>
                        <label htmlFor="email" />
                        <div className={styles.inputField}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

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
                                placeholder="Key"
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

                    <button
                        className={styles.formButton}
                        type="submit"
                        disabled={loading}
                    >
                        Signup
                    </button>
                </form>

                <button
                    className={styles.linkButton}
                    type="button"
                    onClick={() => handleAction("login")}
                >
                    Login instead?
                </button>

                <p>Note: Key can never be changed or recovered!</p>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userID, email) => dispatch(loginAction(userID, email)),
        setKeyAction: (key) => dispatch(setKeyAction(key)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
