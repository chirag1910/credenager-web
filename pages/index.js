import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Landing from "../components/landingPage/Landing";

const LandingPage = ({ user, userLoaded }) => {
    const router = useRouter();

    useEffect(() => {
        if (userLoaded && user) {
            router.replace({ href: "/home" });
        }
    }, [user, userLoaded]);

    return (
        <>
            <Head>
                <title>Credenager</title>
            </Head>

            <Landing />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoaded: state.auth.loaded,
    };
};

export default connect(mapStateToProps)(LandingPage);
