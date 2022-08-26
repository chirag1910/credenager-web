import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
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
import {
    setActiveGroup as setActiveGroupAction,
    setShowGroupMenu as setShowGroupMenuAction,
} from "../../redux/action/misc";
import styles from "../../styles/homePage/home.module.css";
import Groups from "./Groups";
import Right from "./Right";

const Home = ({
    user,
    encKey,
    groups,
    dataLoaded,
    showGroupMenu,
    setDataLoadedAction,
    setGroupsAction,
    setCredsAction,
    setActiveGroupAction,
    setShowGroupMenuAction,
}) => {
    const router = useRouter();
    const { type, id } = router.query;

    const leftComponent = useRef(null);

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
                setActiveGroupAction("all", null, "All");
            } else {
                setActiveGroupAction("group", group._id, group.name);
            }
        }
    }, [type, id, router, dataLoaded, groups]);

    useEffect(() => {
        setShowGroupMenuAction(false);
    }, [router]);

    useEffect(() => {
        window.addEventListener("mousedown", handleMouseClick);

        return () => {
            window.removeEventListener("mousedown", handleMouseClick);
        };
    }, [showGroupMenu, leftComponent]);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    const handleMouseClick = (e) => {
        if (
            showGroupMenu &&
            leftComponent.current &&
            !leftComponent.current.contains(e.target)
        ) {
            setShowGroupMenuAction(false);
        }
    };

    return (
        <>
            <div className={styles.main}>
                <div
                    className={[
                        styles.left,
                        showGroupMenu ? styles.show : undefined,
                    ].join(" ")}
                    ref={leftComponent}
                >
                    <Groups />
                </div>
                <div className={styles.right}>
                    <Right />
                    <div className={styles.overlay} />
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
        showGroupMenu: state.misc.showGroupMenu,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGroupsAction: (groups) => dispatch(setGroupsAction(groups)),
        setCredsAction: (creds) => dispatch(setCredsAction(creds)),
        setDataLoadedAction: () => dispatch(setDataLoadedAction()),
        setActiveGroupAction: (type, id, name) =>
            dispatch(setActiveGroupAction(type, id, name)),
        setShowGroupMenuAction: (show) =>
            dispatch(setShowGroupMenuAction(show)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
