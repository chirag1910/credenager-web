import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Settings from "../components/settingsPage/Settings";

const SettingsPage = ({ user, userLoaded }) => {
    const router = useRouter();

    useEffect(() => {
        if (userLoaded && !user) {
            router.replace({
                href: "",
                query: {
                    ...router.query,
                    action: "login",
                },
            });
        }
    }, [user, userLoaded]);

    return (
        <>
            <Head>
                <title>Settings · Credenager</title>
            </Head>

            <Settings />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoaded: state.auth.loaded,
    };
};

export default connect(mapStateToProps)(SettingsPage);
