import styles from "../../styles/dialog/authForm.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const ResetPass = ({ user }) => {
    const router = useRouter();
    const { next, prefill } = router.query;

    const [email, setEmail] = useState(prefill || "");
    const [otp, setotp] = useState("");
    const [password, setPassword] = useState("");

    const [otpSent, setOtpSent] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const [allowResend, setAllowResend] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.replace(next ? next : "");
        }
    }, [user]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleAllowResend = () => {
        setTimeout(() => {
            setAllowResend(true);
        }, 10 * 1000);
    };

    const handleOtpResend = async () => {
        if (!email) {
            toast.error("Email is required");
        } else {
            setLoading(true);
            const response = await new Api().resetPassInit(email.trim());

            if (response.status === "ok") {
                toast.success("OTP Sent");
                setAllowResend(false);
                handleAllowResend();
            } else {
                toast.error(response.error);
            }
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValidForm()) {
            setLoading(true);

            if (!otpSent) {
                const response = await new Api().resetPassInit(email.trim());

                if (response.status === "ok") {
                    toast.success("OTP Sent");
                    setOtpSent(true);
                    setAllowResend(false);
                    handleAllowResend();
                } else {
                    toast.error(response.error);
                }
                setLoading(false);
            } else {
                const response = await new Api().resetPass(
                    email.trim(),
                    otp.trim(),
                    password
                );

                if (response.status === "ok") {
                    toast.success("Password reset");
                    router.replace({
                        href: "",
                        query: {
                            ...router.query,
                            action: "login",
                            prefill: email.trim(),
                        },
                    });
                } else {
                    toast.error(response.error);
                    setLoading(false);
                }
            }
        }
    };

    const isValidForm = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }

        if (otpSent) {
            if (!otp) {
                toast.error("OTP is required");
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
        }

        return true;
    };

    const handleAction = (action) => {
        router.replace({ href: "", query: { ...router.query, action } });
    };

    return (
        <>
            <div className={styles.main}>
                <h2>Reset password</h2>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className={styles.formControl}>
                        <label htmlFor="email" value="email" />
                        <div className={styles.inputField}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={otpSent || loading}
                            />
                            {otpSent && !loading && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOtpSent(false);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>

                    {otpSent && (
                        <>
                            <div className={styles.formControl}>
                                <label htmlFor="otp" value="otp" />
                                <div className={styles.inputField}>
                                    <input
                                        type="number"
                                        id="otp"
                                        name="otp"
                                        placeholder="OTP"
                                        value={otp}
                                        onChange={(e) => setotp(e.target.value)}
                                    />
                                    {allowResend && !loading && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                handleOtpResend();
                                            }}
                                        >
                                            Resend
                                        </button>
                                    )}
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
                                        onChange={(e) =>
                                            setPassword(e.target.value)
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
                        </>
                    )}

                    <button
                        className={styles.formButton}
                        type="submit"
                        disabled={loading}
                    >
                        {otpSent ? "Reset" : "Send OTP"}
                    </button>
                </form>

                <button
                    className={styles.linkButton}
                    type="button"
                    onClick={() => handleAction("login")}
                >
                    Login instead?
                </button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(ResetPass);
