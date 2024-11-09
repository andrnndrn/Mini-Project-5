import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useStudentsApi from "../utils/useStudentsApi";
import { LanguageContext, ThemeContext } from "../App";
import PropTypes from "prop-types";

const StudentsInfo = () => {
  const { language} = useContext(LanguageContext);
  const { id } = useParams();
  const { students = [], loading, error } = useStudentsApi();
  const [student, setStudent] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const selectedStudent = students.find((student) => student.id === id);
    setStudent(selectedStudent);
  }, [id, students]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!student) return <p>Student not found for ID: {id}</p>;

  return (
    <div className="student-info" style={{background: theme === "light" ? "#0000004c" : "white"}}>
      <div className="btn-back-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <button className="btn-back" >
            {language === "en" ? "Back to List" : "Kembali ke Daftar"}
          </button>
        </Link>
      </div>
      <div className="student-name">
        <h2>{student.name}</h2>
      </div>
      <div className="student-details">
        <table className="student-table">
          <tr>
            <th>{language === "en" ? "Class" : "Kelas"}</th>
            <th>: {student.class}</th>
          </tr>
          <tr>
            <th>{language === "en" ? "Year" : "Tahun"}</th>
            <th>: {student.year}</th>
          </tr>
          <tr>
            <th>{language === "en" ? "NIM" : "NIM"}</th>
            <th>: {student.nim}</th>
          </tr>
          <tr>
            <th>{language === "en" ? "Gender" : "Jenis Kelamin"}</th>
            <th>: {student.gender}</th>
          </tr>
          <tr>
            <th>{language === "en" ? "Guardian Name" : "Nama Wali"}</th>
            <th>: {student.guardian_name}</th>
          </tr>
          <tr>
            <th>{language === "en" ? "Birth Date" : "Tanggal Lahir"}</th>
            <th>: {student.birthDate}</th>
          </tr>
          <tr>
            <th>{language === "en" ? "Address" : "Alamat"}</th>
            <th>: {student.address}</th>
          </tr>
        </table>
      </div>
    </div>
  );
};

StudentsInfo.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      nim: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      guardian_name: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};


export default StudentsInfo;
