import "../styles/globals.css";
import nProgress from "nprogress";
import "../styles/nprogress.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Router from "next/router";
import Init from "../components/Init";

function MyApp({ Component, pageProps }) {
    Router.events.on("routeChangeStart", nProgress.start);
    Router.events.on("routeChangeError", nProgress.done);
    Router.events.on("routeChangeComplete", nProgress.done);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <Init />
        </Provider>
    );
}

export default MyApp;
