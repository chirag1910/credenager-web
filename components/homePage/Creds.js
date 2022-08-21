import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage/creds.module.css";
import CUGroup from "./CUGroup";

const Creds = ({ creds, dataLoaded }) => {
    const router = useRouter();
    const { type, id } = router.query;

    const [query, setQuery] = useState("");
    const [tempCreds, setTempCreds] = useState([]);
    const [finalCreds, setFinalCreds] = useState([]);

    const [showGroupDialog, setShowGroupDialog] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            if (type !== "group") {
                setTempCreds(creds);
            } else {
                setTempCreds(
                    creds.filter(
                        (cred) =>
                            (cred.groupId || undefined) === (id || undefined)
                    )
                );
            }
        }
    }, [type, id, router, creds]);

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
                        <div className={styles.header}>
                            <input
                                type="text"
                                id="query"
                                name="query"
                                placeholder="Search here..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />

                            <button type="button">Add</button>
                        </div>

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
