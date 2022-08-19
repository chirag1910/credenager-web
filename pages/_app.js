import "../styles/globals.css";
import Init from "../components/Init";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Init />
        </>
    );
}

export default MyApp;
