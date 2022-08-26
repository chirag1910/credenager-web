const getTheme = () => {
    if (localStorage) {
        const theme = localStorage.getItem("theme");
        if (theme === "light" || theme === "dark") {
            return theme;
        }
    }

    return typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const setTheme = (theme) => {
    if (localStorage) {
        localStorage.setItem("theme", theme);
    }
};

const changeTheme = (theme) => {
    if (document) {
        document.documentElement.setAttribute("data-theme", theme);
    }
};

export { getTheme, setTheme, changeTheme };
