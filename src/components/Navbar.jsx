import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext, ThemeContext } from "../App";

export default function Navbar() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar-cstm" style={{background: theme === "light" ? "white" : "#0000004c" }}>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          DATABASE
        </Link>
      </div>
      <div>
        <button className="btn-theme" onClick={toggleTheme}>
          {theme === "light" ? (
            <i className="bi bi-sun"></i>
          ) : (
            <i className="bi bi-sun-fill"></i>
          )}
        </button>
        <button
          onClick={() => setLanguage(language === "en" ? "id" : "en")}
          className="btn-language"
        >
          {language === "en" ? "English" : "Indonesia"}
        </button>
      </div>
    </nav>
  );
}
