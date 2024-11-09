import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentsTable from "./pages/StudentsTable";
import StudentsInfo from "./pages/StudentsInfo";
import StudentsForm from "./pages/StudentsForm";
import ErrorPage from "./pages/ErrorPages";
import Navbar from "./components/Navbar";

export const ThemeContext = createContext();
export const LanguageContext = createContext();
export default function App() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleChangeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <LanguageContext.Provider
          value={{ language, setLanguage: handleChangeLanguage }}
        >
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<StudentsTable />} />
                <Route path="/info/:id" element={<StudentsInfo />} />
                <Route path="/edit/:id" element={<StudentsForm />} />
                <Route path="/add" element={<StudentsForm />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </Router>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
