import { connect } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/creds.module.css";
import CUGroup from "./CUGroup";

const Creds = ({ creds, dataLoaded, query, selectedGroup }) => {
    const [tempCreds, setTempCreds] = useState([]);
    const [finalCreds, setFinalCreds] = useState([]);

    const [showGroupDialog, setShowGroupDialog] = useState(false);

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
                        {finalCreds.length ? (
                            <div className={styles.container}>
                                {finalCreds.map((cred) => (
                                    <p>{cred.identifier}</p>
                                ))}
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

            {showGroupDialog && (
                <CUGroup close={() => setShowGroupDialog(false)} />
            )}
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
