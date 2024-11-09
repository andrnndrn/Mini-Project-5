import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStudentsApi from "../utils/useStudentsApi";
import { LanguageContext, ThemeContext } from "../App";
import PropTypes from "prop-types";

const StudentsTable = () => {
  const { students, loading, error, removeStudent } = useStudentsApi();
  const [notification, setNotification] = useState("");
  const [searchInput, setSearchInput] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (loading) {
      setNotification("Loading...");
    } else if (error) {
      setNotification(`Error: ${error}`);
    } else if (students.length === 0) {
      setNotification(
        language === "en" ? "Students Not Found" : "Mahasiswa Tidak Ditemukan"
      );
    } else {
      setNotification(""); 
      setSearchResults(students); 
    }
  }, [loading, error, students]);

  const handleSearch = (e) => {
    const searchItem = e.target.value.toLowerCase();
    setSearchInput(searchItem);

    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchItem) ||
        student.class.toLowerCase().includes(searchItem) ||
        student.nim.toLowerCase().includes(searchItem) 
    );

    setSearchResults(filteredStudents);
  };

  return (
    <div className="students-table-cstm" style={{background: theme === "light" ? "white" : "#0000004c" }}>
      {/* header */}
      <div className="students-header">
        <h1>{language === "en" ? "LIST OF STUDENTS" : "DAFTAR MAHASISWA"}</h1>
      </div>
      <div className="container-btn-res">
        <Link to="/add" style={{ textDecoration: "none" }}>
          <button className="btn-add-res">
            <i className="bi bi-plus-circle"></i>
          </button>
        </Link>
      </div>
      <div className="table-header-cstm">
        <Link to="/add" style={{ textDecoration: "none" }}>
          <button className="btn-add-pc">
            <i className="bi bi-plus-circle"></i>{" "}
            {language === "en" ? "Add New Student" : "Tambah Mahasiswa Baru"}
          </button>
        </Link>
        <input
          className="form-table-cstm"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchInput}
          onChange={handleSearch}
        ></input>
      </div>

      {/* table */}
      <div className="table-container">
        <table className="table-cstm">
          <thead>
            <tr>
              <th>No</th>
              <th>{language === "en" ? "Name" : "Nama"}</th>
              <th>{language === "en" ? "NIM" : "Student ID"}</th>
              <th>{language === "en" ? "Class" : "Kelas"}</th>
              <th>{language === "en" ? "Action" : "Aksi"}</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <th>{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.nim}</td>
                <td>{student.class}</td>
                <td>
                  <div className="form-btn-res">
                    <Link>
                      <button
                        className="btn-delete"
                        onClick={() => removeStudent(student.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </Link>
                    <Link to={`/edit/${student.id}`}>
                      <button className="btn-edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                    <Link to={`/info/${student.id}`}>
                      <button className="btn-info">
                        <i className="bi bi-info-circle"></i>
                      </button>
                    </Link>
                  </div>
                  <div className="form-btn-pc">
                    <Link>
                      <button
                        className="btn-delete"
                        onClick={() => removeStudent(student.id)}
                      >
                        <i className="bi bi-trash"></i>
                        {language === "en" ? "Delete" : "Hapus"}
                      </button>
                    </Link>
                    <Link to={`/edit/${student.id}`}>
                      <button className="btn-edit">
                        <i className="bi bi-pencil"></i>
                        {language === "en" ? "Edit" : "Ubah"}
                      </button>
                    </Link>
                    <Link to={`/info/${student.id}`}>
                      <button className="btn-info">
                        <i className="bi bi-info-circle"></i>Info
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {notification && <p className="notification">{notification}</p>}
      </div>
    </div>
  );
};

StudentsTable.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nim: PropTypes.string.isRequired,
      class: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

export default StudentsTable;
