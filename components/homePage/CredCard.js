import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "../../styles/homePage/credCard.module.css";
import Api from "../../utils/api";
import { encrypt } from "../../utils/crypt";
import {
    updateCred as updateCredAction,
    deleteCred as deleteCredAction,
} from "../../redux/action/data";

const CredCard = ({ cred, encKey, updateCredAction, deleteCredAction }) => {
    const router = useRouter();

    const [identifier, setIdentifier] = useState("");
    const [value, setValue] = useState("");
    const [showCred, setShowCred] = useState(false);
    const [allowEditing, setAllowEditing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIdentifier(cred.identifier);
        setValue(cred.value);
    }, [cred]);

    useEffect(() => {
        if (allowEditing) {
            window.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [allowEditing, identifier, value, encKey, cred]);

    const handleKeyPress = (e) => {
        e = e || window.event;
        if (allowEditing) {
            if (e.code === "Escape") {
                e.preventDefault();
                handleEditCancel();
            } else if (e.code === "Enter") {
                e.preventDefault();
                handleEdit();
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const handleEditCancel = () => {
        setAllowEditing(false);
        setIdentifier(cred.identifier);
        setValue(cred.value);
    };

    const handleEdit = async () => {
        setLoading(true);

        if (encKey) {
            const response = await new Api().updateCred(
                cred._id,
                identifier,
                encrypt(value, encKey)
            );

            if (response.status === "ok") {
                toast.success(response.message);
                updateCredAction(cred._id, identifier, value);
                setAllowEditing(false);
            } else {
                toast.error(response.error);
            }
        } else {
            router.replace({
                href: "",
                query: { ...router.query, action: "key" },
            });
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);

        const response = await new Api().deleteCred(cred._id);

        if (response.status === "ok") {
            toast.success(response.message);
            deleteCredAction(cred._id);
        } else {
            toast.error(response.error);
        }

        setLoading(false);
    };

    return (
        <>
            <tr className={styles.tr}>
                <td className={styles.idInput}>
                    <input
                        className={allowEditing ? styles.editing : undefined}
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        disabled={!allowEditing || loading}
                    />
                </td>
                <td className={styles.credInput}>
                    <input
                        className={allowEditing ? styles.editing : undefined}
                        type={showCred || allowEditing ? "text" : "password"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!allowEditing || loading}
                    />
                </td>
                <td>
                    <div className={styles.actions}>
                        <div className={styles.menu}>
                            <button type="button">
                                <svg viewBox="0 0 32 18" fill="none">
                                    <path d="M31.2858 17.5005C30.7533 18.033 29.92 18.0815 29.3327 17.6457L29.1645 17.5005L16.2252 4.56185L3.28582 17.5005C2.75328 18.033 1.91996 18.0815 1.33274 17.6457L1.1645 17.5005C0.631966 16.968 0.583553 16.1346 1.01926 15.5474L1.1645 15.3792L15.1645 1.37919C15.697 0.846657 16.5304 0.798245 17.1176 1.23395L17.2858 1.37919L31.2858 15.3792C31.8716 15.965 31.8716 16.9147 31.2858 17.5005Z" />
                                </svg>
                            </button>

                            {allowEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleEdit}
                                        disabled={loading}
                                    >
                                        <svg viewBox="0 0 67 67" fill="none">
                                            <path d="M48.039 0C59.3955 0 67 7.973 67 19.832V47.2048C67 59.027 59.3955 67 48.039 67H18.9945C7.638 67 0 59.027 0 47.2048V19.832C0 7.973 7.638 0 18.9945 0H48.039ZM47.503 23.45C46.364 22.311 44.488 22.311 43.349 23.45L29.5135 37.2855L23.651 31.423C22.512 30.284 20.636 30.284 19.497 31.423C18.358 32.562 18.358 34.4045 19.497 35.577L27.47 43.5165C28.0395 44.086 28.7765 44.354 29.5135 44.354C30.284 44.354 31.021 44.086 31.5905 43.5165L47.503 27.604C48.642 26.465 48.642 24.6225 47.503 23.45Z" />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleEditCancel}
                                        disabled={loading}
                                    >
                                        <svg viewBox="0 0 58 58" fill="none">
                                            <path
                                                d="M53.5477 53.5477L4 4.00009M53.5477 4L4.00006 53.5477"
                                                stroke="var(--button-primary)"
                                                strokeWidth="7"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" onClick={handleCopy}>
                                        {copied ? (
                                            <svg
                                                viewBox="0 0 67 67"
                                                fill="none"
                                            >
                                                <path d="M48.039 0C59.3955 0 67 7.973 67 19.832V47.2048C67 59.027 59.3955 67 48.039 67H18.9945C7.638 67 0 59.027 0 47.2048V19.832C0 7.973 7.638 0 18.9945 0H48.039ZM47.503 23.45C46.364 22.311 44.488 22.311 43.349 23.45L29.5135 37.2855L23.651 31.423C22.512 30.284 20.636 30.284 19.497 31.423C18.358 32.562 18.358 34.4045 19.497 35.577L27.47 43.5165C28.0395 44.086 28.7765 44.354 29.5135 44.354C30.284 44.354 31.021 44.086 31.5905 43.5165L47.503 27.604C48.642 26.465 48.642 24.6225 47.503 23.45Z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <path d="M2.07162 2.9541L2.07118 12.0417C2.07118 13.9194 3.63726 15.4559 5.61713 15.5758L5.86668 15.5833L12.5686 15.5843C12.2557 16.4092 11.4124 17 10.4213 17H5.10758C2.59214 17 0.552979 15.0972 0.552979 12.75V4.95833C0.552979 4.03294 1.18689 3.2457 2.07162 2.9541ZM13.4577 0C14.7154 0 15.735 0.951395 15.735 2.125V12.0417C15.735 13.2153 14.7154 14.1667 13.4577 14.1667H5.86668C4.60896 14.1667 3.58938 13.2153 3.58938 12.0417V2.125C3.58938 0.951395 4.60896 0 5.86668 0H13.4577Z" />
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowCred(!showCred)}
                                    >
                                        {showCred ? (
                                            <svg
                                                viewBox="0 0 20 17"
                                                fill="none"
                                            >
                                                <path d="M17.1704 0.214131C17.4631 -0.0713769 17.9217 -0.0713769 18.2046 0.214131C18.4974 0.499638 18.4974 0.972202 18.2046 1.25771L16.4288 3.04952C17.8436 4.34907 19.0438 6.10149 19.9415 8.20834C20.0195 8.3954 20.0195 8.61199 19.9415 8.7892C17.8534 13.6921 14.1358 16.6259 9.99868 16.6259H9.98892C8.10575 16.6259 6.30063 16.0056 4.71018 14.8735L2.81725 16.7834C2.67089 16.9311 2.4855 17 2.30011 17C2.11472 17 1.91957 16.9311 1.78297 16.7834C1.53903 16.5373 1.5 16.1435 1.69515 15.858L1.72442 15.8186L16.1556 1.25771C16.1751 1.23802 16.1946 1.21833 16.2044 1.19864C16.2239 1.17895 16.2434 1.15926 16.2532 1.13957L17.1704 0.214131ZM10.0013 0.385337C11.3966 0.385337 12.7529 0.720069 14.0018 1.35015L10.7429 4.63841C10.5087 4.59903 10.255 4.5695 10.0013 4.5695C7.84494 4.5695 6.09836 6.33177 6.09836 8.50753C6.09836 8.7635 6.12764 9.01948 6.16667 9.25576L2.55643 12.8984C1.5807 11.7564 0.731804 10.3781 0.0585443 8.79304C-0.0195148 8.61583 -0.0195148 8.39924 0.0585443 8.21218C2.14662 3.30933 5.86419 0.385337 9.99156 0.385337H10.0013ZM13.2186 6.28855L12.1551 7.36166C12.3307 7.69639 12.4283 8.0902 12.4283 8.50369C12.4283 9.85247 11.3354 10.9551 9.99868 10.9551C9.58887 10.9551 9.19858 10.8567 8.86683 10.6795L7.80327 11.7526C8.42774 12.1759 9.18882 12.4319 9.99868 12.4319C12.1453 12.4319 13.8919 10.6696 13.8919 8.50369C13.8919 7.68655 13.6382 6.91863 13.2186 6.28855Z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                viewBox="0 0 22 18"
                                                fill="none"
                                            >
                                                <path d="M11 0C13.2751 0 15.4322 0.789333 17.3102 2.25067C19.1883 3.70133 20.7873 5.824 21.9356 8.48C22.0215 8.68267 22.0215 8.91733 21.9356 9.10933C19.639 14.4213 15.5502 17.6 11 17.6H10.9893C6.44976 17.6 2.36098 14.4213 0.0643902 9.10933C-0.0214634 8.91733 -0.0214634 8.68267 0.0643902 8.48C2.36098 3.168 6.44976 0 10.9893 0H11ZM11 4.53333C8.62829 4.53333 6.70732 6.44267 6.70732 8.8C6.70732 11.1467 8.62829 13.056 11 13.056C13.361 13.056 15.282 11.1467 15.282 8.8C15.282 6.44267 13.361 4.53333 11 4.53333ZM11.0013 6.13099C12.4715 6.13099 13.6735 7.32565 13.6735 8.79765C13.6735 10.259 12.4715 11.4537 11.0013 11.4537C9.52031 11.4537 8.31836 10.259 8.31836 8.79765C8.31836 8.61632 8.33982 8.44565 8.37202 8.27499H8.42568C9.6169 8.27499 10.5828 7.33632 10.6257 6.16299C10.7437 6.14165 10.8725 6.13099 11.0013 6.13099Z" />
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setAllowEditing(true)}
                                        disabled={loading}
                                    >
                                        <svg viewBox="0 0 19 17" fill="none">
                                            <path d="M17.7489 15.067C18.3128 15.067 18.7714 15.5005 18.7714 16.0335C18.7714 16.5675 18.3128 17 17.7489 17H11.9695C11.4057 17 10.9471 16.5675 10.9471 16.0335C10.9471 15.5005 11.4057 15.067 11.9695 15.067H17.7489ZM13.7409 0.660227L15.2338 1.76685C15.846 2.21356 16.2542 2.80241 16.3938 3.42171C16.5549 4.10295 16.3831 4.772 15.8997 5.35069L7.00675 16.0819C6.59861 16.5692 5.99716 16.8433 5.35274 16.8535L1.80842 16.8941C1.6151 16.8941 1.45399 16.7723 1.41103 16.5997L0.605507 13.3407C0.465882 12.7417 0.605507 12.1224 1.01364 11.6453L7.31822 4.03086C7.42562 3.90903 7.61895 3.88974 7.74783 3.9801L10.4007 5.94969C10.5725 6.08167 10.8088 6.15274 11.0559 6.12228C11.5821 6.06137 11.9366 5.61466 11.8829 5.13749C11.8506 4.89383 11.7218 4.69078 11.5499 4.53849C11.4962 4.49788 8.97223 2.60951 8.97223 2.60951C8.81112 2.48768 8.7789 2.26433 8.90779 2.11305L9.90664 0.903887C10.8303 -0.202738 12.4414 -0.304263 13.7409 0.660227Z" />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={loading}
                                    >
                                        <svg viewBox="0 0 18 17" fill="none">
                                            <path d="M15.245 5.69256C15.4349 5.69256 15.6073 5.76651 15.7434 5.89146C15.8704 6.02491 15.9343 6.19066 15.9158 6.36576C15.9158 6.42356 15.4081 12.1525 15.1181 14.5639C14.9365 16.0438 13.8674 16.9422 12.2637 16.9669C11.0306 16.9915 9.82529 17 8.6385 17C7.37853 17 6.14635 16.9915 4.95031 16.9669C3.40036 16.9337 2.33031 16.0191 2.15799 14.5639C1.85967 12.144 1.36124 6.42356 1.35198 6.36576C1.34271 6.19066 1.40571 6.02491 1.53356 5.89146C1.65956 5.76651 1.84114 5.69256 2.03199 5.69256H15.245ZM10.6017 0C11.4439 0 12.1962 0.524445 12.4139 1.27244L12.5695 1.89293C12.6955 2.39868 13.1865 2.75652 13.7517 2.75652H16.5292C16.8998 2.75652 17.2083 3.03107 17.2083 3.38042V3.70341C17.2083 4.04426 16.8998 4.32731 16.5292 4.32731H0.741538C0.370031 4.32731 0.0615234 4.04426 0.0615234 3.70341V3.38042C0.0615234 3.03107 0.370031 2.75652 0.741538 2.75652H3.51903C4.08324 2.75652 4.57426 2.39868 4.70118 1.89378L4.84664 1.31409C5.07269 0.524445 5.81663 0 6.66804 0H10.6017Z" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        encKey: state.auth.key,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCredAction: (id, identifier, value) =>
            dispatch(updateCredAction(id, identifier, value)),
        deleteCredAction: (id) => dispatch(deleteCredAction(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CredCard);
