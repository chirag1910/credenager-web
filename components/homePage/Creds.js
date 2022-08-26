import { connect } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/creds.module.css";
import CredCard from "./CredCard";
import AddCredCard from "./AddCredCard";

const Creds = ({
    creds,
    dataLoaded,
    query,
    showAddCred,
    setShowAddCred,
    selectedGroup,
}) => {
    const [tempCreds, setTempCreds] = useState([]);
    const [finalCreds, setFinalCreds] = useState([]);

    useEffect(() => {
        if (selectedGroup?.type) {
            if (selectedGroup?.type !== "group") {
                setTempCreds(creds);
            } else {
                setTempCreds(
                    creds.filter(
                        (cred) =>
                            (cred.groupId || undefined) ===
                            (selectedGroup?.id || undefined)
                    )
                );
            }
        }
    }, [selectedGroup, creds]);

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
            <div className={styles.main}>
                {dataLoaded ? (
                    <>
                        <div className={styles.header}>
                            <h3>Credentials</h3>
                        </div>

                        {finalCreds.length || showAddCred ? (
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
                                                groupId={selectedGroup?.id}
                                                onHide={() =>
                                                    setShowAddCred(false)
                                                }
                                            />
                                        )}
                                        {finalCreds.map((cred) => (
                                            <CredCard cred={cred} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className={styles.statusText}>
                                {query ? "No credentials found" : "Empty Group"}
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        <div className={styles.container}></div>
                    </>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        creds: state.data.creds,
        dataLoaded: state.data.loaded,
    };
};

export default connect(mapStateToProps)(Creds);
