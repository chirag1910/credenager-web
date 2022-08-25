import { connect } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/creds.module.css";
import CredCard from "./CredCard";

const Creds = ({ creds, dataLoaded, query, selectedGroup }) => {
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
        console.log(tempCreds);
        setFinalCreds(
            tempCreds.filter((cred) =>
                cred.identifier.toLowerCase().includes(query)
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

                        {finalCreds.length ? (
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
