import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Home from "../components/homePage/Home";

const HomePage = ({ user, userLoaded }) => {
    const router = useRouter();

    useEffect(() => {
        if (userLoaded && !user) {
            router.replace({
                href: "",
                query: { action: "login" },
            });
        }
    }, [user, userLoaded]);

    return (
        <>
            <Home />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userLoaded: state.auth.loaded,
    };
};

export default connect(mapStateToProps)(HomePage);
