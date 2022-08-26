import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setShowAddCred as setShowAddCredAction } from "../../redux/action/misc";
import styles from "../../styles/homePage/creds.module.css";
import CredCard from "./CredCard";
import AddCredCard from "./AddCredCard";

const Creds = ({
    query,
    creds,
    dataLoaded,
    activeGroup,
    showAddCred,
    setShowAddCredAction,
}) => {
    const [tempCreds, setTempCreds] = useState([]);
    const [finalCreds, setFinalCreds] = useState([]);

    useEffect(() => {
        if (activeGroup?.type) {
            if (activeGroup?.type !== "group") {
                setTempCreds(creds);
            } else {
                setTempCreds(
                    creds.filter(
                        (cred) =>
                            (cred.groupId || undefined) ===
                            (activeGroup?.id || undefined)
                    )
                );
            }
        }
    }, [activeGroup, creds]);

    useEffect(() => {
        setFinalCreds(
            tempCreds.filter(
                (cred) =>
                    cred.identifier.toLowerCase().includes(query) ||
                    cred.value.toLowerCase().includes(query)
            )
        );
    }, [tempCreds, query]);

    return (
        <>
            {dataLoaded ? (
                <>
                    <div className={styles.main}>
                        {finalCreds.length || showAddCred ? (
                            <>
                                <div className={styles.header}>
                                    <h3>Credentials</h3>
                                </div>

                                <div className={styles.container}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Identifier</th>
                                                <th>Credential</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showAddCred && (
                                                <AddCredCard
                                                    groupId={activeGroup?.id}
                                                    onHide={() =>
                                                        setShowAddCredAction(
                                                            false
                                                        )
                                                    }
                                                />
                                            )}
                                            {finalCreds.map((cred) => (
                                                <CredCard cred={cred} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <p className={styles.statusText}>
                                {query ? "No credentials found" : "Empty Group"}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={[styles.main, styles.loading].join(" ")}>
                        <div className={styles.loader} />
                    </div>
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        creds: state.data.creds,
        dataLoaded: state.data.loaded,
        activeGroup: state.misc.activeGroup,
        showAddCred: state.misc.showAddCred,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setShowAddCredAction: (show) => dispatch(setShowAddCredAction(show)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creds);
