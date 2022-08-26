import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "../../styles/homePage/credCard.module.css";
import Api from "../../utils/api";
import { encrypt } from "../../utils/crypt";
import { addCred as addCredAction } from "../../redux/action/data";

const CredCard = ({
    groupId = null,
    onHide = () => {},
    encKey,
    addCredAction,
}) => {
    const router = useRouter();

    const [identifier, setIdentifier] = useState("");
    const [value, setValue] = useState("");

    const [showCred, setShowCred] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [identifier, value, encKey]);

    const handleKeyPress = (e) => {
        e = e || window.event;
        if (e.code === "Escape") {
            e.preventDefault();
            onHide();
        } else if (e.code === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (encKey) {
            const response = await new Api().createCred(
                identifier,
                encrypt(value, encKey),
                groupId
            );

            if (response.status === "ok") {
                toast.success(response.message);
                addCredAction(response._id, identifier, value, groupId);
                onHide();
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

    return (
        <>
            <tr className={styles.tr}>
                <td className={styles.idInput}>
                    <input
                        className={styles.editing}
                        type="text"
                        value={identifier}
                        placeholder="Identifier"
                        onChange={(e) => setIdentifier(e.target.value)}
                        disabled={loading}
                    />
                </td>
                <td className={styles.credInput}>
                    <input
                        className={styles.editing}
                        type={showCred ? "text" : "password"}
                        value={value}
                        placeholder="Credential"
                        onChange={(e) => setValue(e.target.value)}
                        disabled={loading}
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

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                title="Create"
                            >
                                <svg viewBox="0 0 67 67" fill="none">
                                    <path d="M48.039 0C59.3955 0 67 7.973 67 19.832V47.2048C67 59.027 59.3955 67 48.039 67H18.9945C7.638 67 0 59.027 0 47.2048V19.832C0 7.973 7.638 0 18.9945 0H48.039ZM47.503 23.45C46.364 22.311 44.488 22.311 43.349 23.45L29.5135 37.2855L23.651 31.423C22.512 30.284 20.636 30.284 19.497 31.423C18.358 32.562 18.358 34.4045 19.497 35.577L27.47 43.5165C28.0395 44.086 28.7765 44.354 29.5135 44.354C30.284 44.354 31.021 44.086 31.5905 43.5165L47.503 27.604C48.642 26.465 48.642 24.6225 47.503 23.45Z" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowCred(!showCred)}
                                title={showCred ? "Hide" : "Show"}
                            >
                                {showCred ? (
                                    <svg viewBox="0 0 20 17" fill="none">
                                        <path d="M17.1704 0.214131C17.4631 -0.0713769 17.9217 -0.0713769 18.2046 0.214131C18.4974 0.499638 18.4974 0.972202 18.2046 1.25771L16.4288 3.04952C17.8436 4.34907 19.0438 6.10149 19.9415 8.20834C20.0195 8.3954 20.0195 8.61199 19.9415 8.7892C17.8534 13.6921 14.1358 16.6259 9.99868 16.6259H9.98892C8.10575 16.6259 6.30063 16.0056 4.71018 14.8735L2.81725 16.7834C2.67089 16.9311 2.4855 17 2.30011 17C2.11472 17 1.91957 16.9311 1.78297 16.7834C1.53903 16.5373 1.5 16.1435 1.69515 15.858L1.72442 15.8186L16.1556 1.25771C16.1751 1.23802 16.1946 1.21833 16.2044 1.19864C16.2239 1.17895 16.2434 1.15926 16.2532 1.13957L17.1704 0.214131ZM10.0013 0.385337C11.3966 0.385337 12.7529 0.720069 14.0018 1.35015L10.7429 4.63841C10.5087 4.59903 10.255 4.5695 10.0013 4.5695C7.84494 4.5695 6.09836 6.33177 6.09836 8.50753C6.09836 8.7635 6.12764 9.01948 6.16667 9.25576L2.55643 12.8984C1.5807 11.7564 0.731804 10.3781 0.0585443 8.79304C-0.0195148 8.61583 -0.0195148 8.39924 0.0585443 8.21218C2.14662 3.30933 5.86419 0.385337 9.99156 0.385337H10.0013ZM13.2186 6.28855L12.1551 7.36166C12.3307 7.69639 12.4283 8.0902 12.4283 8.50369C12.4283 9.85247 11.3354 10.9551 9.99868 10.9551C9.58887 10.9551 9.19858 10.8567 8.86683 10.6795L7.80327 11.7526C8.42774 12.1759 9.18882 12.4319 9.99868 12.4319C12.1453 12.4319 13.8919 10.6696 13.8919 8.50369C13.8919 7.68655 13.6382 6.91863 13.2186 6.28855Z" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 22 18" fill="none">
                                        <path d="M11 0C13.2751 0 15.4322 0.789333 17.3102 2.25067C19.1883 3.70133 20.7873 5.824 21.9356 8.48C22.0215 8.68267 22.0215 8.91733 21.9356 9.10933C19.639 14.4213 15.5502 17.6 11 17.6H10.9893C6.44976 17.6 2.36098 14.4213 0.0643902 9.10933C-0.0214634 8.91733 -0.0214634 8.68267 0.0643902 8.48C2.36098 3.168 6.44976 0 10.9893 0H11ZM11 4.53333C8.62829 4.53333 6.70732 6.44267 6.70732 8.8C6.70732 11.1467 8.62829 13.056 11 13.056C13.361 13.056 15.282 11.1467 15.282 8.8C15.282 6.44267 13.361 4.53333 11 4.53333ZM11.0013 6.13099C12.4715 6.13099 13.6735 7.32565 13.6735 8.79765C13.6735 10.259 12.4715 11.4537 11.0013 11.4537C9.52031 11.4537 8.31836 10.259 8.31836 8.79765C8.31836 8.61632 8.33982 8.44565 8.37202 8.27499H8.42568C9.6169 8.27499 10.5828 7.33632 10.6257 6.16299C10.7437 6.14165 10.8725 6.13099 11.0013 6.13099Z" />
                                    </svg>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={onHide}
                                disabled={loading}
                                title="Cancel"
                            >
                                <svg viewBox="0 0 72 72" fill="none">
                                    <path d="M36 0C16.1215 0 0 16.1215 0 36C0 55.8785 16.1215 72 36 72C55.8785 72 72 55.8785 72 36C72 16.1215 55.8785 0 36 0ZM53.1818 48.2727L48.2727 53.1818L36 40.9091L23.7273 53.1818L18.8182 48.2727L31.0909 36L18.8182 23.7273L23.7273 18.8182L36 31.0909L48.2727 18.8182L53.1818 23.7273L40.9091 36L53.1818 48.2727Z" />
                                </svg>
                            </button>
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
        addCredAction: (id, identifier, value, groupId) =>
            dispatch(addCredAction(id, identifier, value, groupId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CredCard);
