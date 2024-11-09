import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext, ThemeContext } from "../App";
import  PropTypes from "prop-types";
const ErrorPage = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="error-page" style={{background: theme === "light" ? "#0000004c" : "white"}}>
      <div>
        <h1>
          {language === "en"
            ? "Oops! Something went wrong."
            : "Ups! Terjadi kesalahan."}
        </h1>
        <p>
          {language === "en"
            ? "We couldn't find the page you're looking for."
            : "Kami tidak dapat menemukan halaman yang Anda cari."}
        </p>
        <p className="text-error">
          <strong>
            {language === "en"
              ? "Error 404: Page Not Found"
              : "Kesalahan 404: Halaman Tidak Ditemukan"}
          </strong>
        </p>
      </div>
      <div>
        <Link
          to="/"
          className="btn-back-error"
          style={{ textDecoration: "none" }}
        >
          {language === "en" ? "Back to Home" : "Kembali ke Beranda"}
        </Link>
      </div>
    </div>
  );
};

ErrorPage.contextTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default ErrorPage;
