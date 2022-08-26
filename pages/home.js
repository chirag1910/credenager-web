import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Home from "../components/homePage/Home";

const HomePage = ({ user, userLoaded, encKey }) => {
    const router = useRouter();

    useEffect(() => {
        if (userLoaded && !user) {
            router.replace({
                href: "",
                query: {
                    ...router.query,
                    action: "login",
                    next: "?action=key",
                },
            });
        }
    }, [user, userLoaded]);

    useEffect(() => {
        if (user && !encKey) {
            router.replace({
                href: "",
                query: { ...router.query, action: "key" },
            });
        }
    }, [user, encKey]);

    return (
        <>
            <Head>
                <title>Home · Credenager</title>
            </Head>

            <Home />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoaded: state.auth.loaded,
        encKey: state.auth.key,
    };
};

export default connect(mapStateToProps)(HomePage);
