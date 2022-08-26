import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="keywords"
                    content="credenager, credential, password, manager, keys, safecode, secure, passkey"
                />
                <meta name="author" content="Chirag Goyal" />
                <meta
                    property="og:url"
                    content="https://credenager.vercel.app"
                />
                <meta property="og:type" content="Website" />
                <meta property="og:title" content="Credenager" />
                <meta
                    property="og:description"
                    content="Encrypted Credentials Manager. Helps user to manage their keys, codes, password or any other type of sensitive data."
                />
                <meta
                    property="og:image"
                    content="https://credenager.vercel.app/mockup_6.webp"
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://credenager.vercel.app"
                />
                <meta property="twitter:title" content="Credenager" />
                <meta
                    property="twitter:description"
                    content="Encrypted Credentials Manager. Helps user to manage their keys, codes, password or any other type of sensitive data."
                />
                <meta
                    property="twitter:image"
                    content="https://credenager.vercel.app/mockup_3.webp"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
