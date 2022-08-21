import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import nprogress from "nprogress";
import Api from "../../utils/api";
import {
    setGroups as setGroupsAction,
    setCreds as setCredsAction,
    setDataLoaded as setDataLoadedAction,
} from "../../redux/action/data";
import styles from "../../styles/homePage/home.module.css";
import Groups from "./Groups";

const Home = ({
    user,
    encKey,
    setDataLoadedAction,
    setGroupsAction,
    setCredsAction,
}) => {
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
                    group.credentials.forEach((cred) => creds.push(cred));
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
        loading ? nprogress.start() : nprogress.done();
    }, [loading]);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.left}>
                    <Groups />
                </div>
                <div className={styles.right}></div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        encKey: state.auth.key,
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
