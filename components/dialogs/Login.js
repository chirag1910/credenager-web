import styles from "../../styles/dialog/authForm.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import GoogleLogin from "../GoogleLogin";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [googleAllowed, setGoogleAllowed] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleGoogleFailure = () => {
        toast.error("Error connecting google");
    };

    const handleAuthGoogle = async (credential) => {
        if (!credential) {
            toast.error("Some error occurred");
            return false;
        }

        setLoading(true);

        //api

        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            // api
            setLoading(false);
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

        return true;
    };

    const handleAction = (action) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, action },
        });
    };

    return (
        <>
            <div className={styles.main}>
                <h2>Login</h2>

                <GoogleLogin
                    onSuccess={handleAuthGoogle}
                    onError={handleGoogleFailure}
                    onLoad={() => setGoogleAllowed(true)}
                />

                {googleAllowed && <p className={styles.or}>OR</p>}

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

                    <button
                        className={styles.formButton}
                        type="submit"
                        disabled={loading}
                    >
                        Login
                    </button>
                </form>

                <button
                    className={styles.linkButton}
                    type="button"
                    onClick={() => handleAction("reset")}
                >
                    Forgot password?
                </button>

                <button
                    className={styles.linkButton}
                    type="button"
                    onClick={() => handleAction("signup")}
                >
                    Don&#39;t have an account?
                </button>
            </div>
        </>
    );
};

export default Login;
