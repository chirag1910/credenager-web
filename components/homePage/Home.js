import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import { decrypt } from "../../utils/crypt";
import {
    setGroups as setGroupsAction,
    setCreds as setCredsAction,
    setDataLoaded as setDataLoadedAction,
} from "../../redux/action/data";
import styles from "../../styles/homePage/home.module.css";
import Groups from "./Groups";
import Right from "./Right";

const Home = ({
    user,
    encKey,
    groups,
    dataLoaded,
    setDataLoadedAction,
    setGroupsAction,
    setCredsAction,
}) => {
    const router = useRouter();
    const { type, id } = router.query;

    const [selectedGroup, setSelectedGroup] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            setLoading(true);

            const response = await new Api().get();

            if (response.status === "ok") {
                const groups = [];
                const creds = [];

                response.data.forEach((group) => {
                    groups.push({ _id: group._id, name: group.name });
                    group.credentials.forEach((cred) =>
                        creds.push({
                            ...cred,
                            value: decrypt(cred.value, encKey),
                            groupId: group._id,
                        })
                    );
                });

                setGroupsAction(groups);
                setCredsAction(creds);
                setDataLoadedAction();
            } else {
                toast.error(response.error);
            }

            setLoading(false);
        };

        if (user && encKey) {
            run();
        }
    }, [user, encKey]);

    useEffect(() => {
        if (router.isReady && dataLoaded) {
            let group = null;

            if (type === "group") {
                group = groups.find(
                    (g) => (g._id || undefined) === (id || undefined)
                );
            }

            if (!group) {
                group = { type: "all", id: null };
            } else {
                group = {
                    type: "group",
                    id: group._id || undefined,
                    name: group.name,
                };
            }

            setSelectedGroup(group);
        }
    }, [type, id, router, dataLoaded, groups]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.left}>
                    <Groups selectedGroup={selectedGroup} />
                </div>
                <div className={styles.right}>
                    <Right selectedGroup={selectedGroup} />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        encKey: state.auth.key,
        groups: state.data.groups,
        dataLoaded: state.data.loaded,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGroupsAction: (groups) => dispatch(setGroupsAction(groups)),
        setCredsAction: (creds) => dispatch(setCredsAction(creds)),
        setDataLoadedAction: () => dispatch(setDataLoadedAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
