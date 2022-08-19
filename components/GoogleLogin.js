import { useEffect } from "react";

const GoogleLogin = ({ onSuccess, onError, onLoad }) => {
    useEffect(() => {
        loadScript();
    }, []);

    const loadScript = () => {
        const script = document.createElement("script");

        script.src = "https://accounts.google.com/gsi/client";

        script.onload = handleLoadSuccess;
        script.onerror = onError;

        document.head.appendChild(script);
    };

    function handleCredentialResponse(response) {
        onSuccess(response.credential);
    }

    const handleLoadSuccess = () => {
        google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        onLoad();

        google.accounts.id.renderButton(
            document.getElementById("googleLoginButton"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    };

    return (
        <div
            style={{ width: "max-content", margin: "auto" }}
            id="googleLoginButton"
        />
    );
};

export default GoogleLogin;
