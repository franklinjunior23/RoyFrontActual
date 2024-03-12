import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ContextTheme = createContext();

export const UsecontextTheme = () => {
    const context = useContext(ContextTheme);
    return context;
    }

export const ThemeProvider = ({ children }) => {
    const [ThemeActual, setThemeActual] = useState(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        } else {
            return "light";
        }
    });
    useEffect(() => {
        if (ThemeActual == "dark") {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    }, [ThemeActual]);

    function HandleTheme() {
        setThemeActual((value) => (value == "light" ? "dark" : "light"));
    }
    return (
        <ContextTheme.Provider value={{ ThemeActual, HandleTheme }}>
            {children}
        </ContextTheme.Provider>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};