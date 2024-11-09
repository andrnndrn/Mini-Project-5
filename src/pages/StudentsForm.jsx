import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useStudentsApi from "../utils/useStudentsApi";
import useFormValidation from "../utils/useFormValidation";
import PropTypes from "prop-types";
import { LanguageContext, ThemeContext } from "../App";

const StudentsForm = () => {
  const { id } = useParams();
  const { students, loading, addStudent, editStudent } = useStudentsApi();
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    formValidation,
    handleChange,
    resetFormValidation,
  } = useFormValidation({
    name: "",
    class: "",
    year: "",
    nim: "",
    gender: "",
    guardian_name: "",
    birthDate: "",
    address: "",
  });
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState(null);
  
  const isEditMode = id && students.some((student) => student.id === id);

  useEffect(() => {
    if (!loading) {
      resetFormValidation();

      if (isEditMode) {
        const student = students.find((student) => student.id === id);
        if (student) {
          setFormData({
            name: student.name,
            class: student.class,
            year: student.year,
            nim: student.nim,
            gender: student.gender,
            guardian_name: student.guardian_name,
            birthDate: student.birthDate,
            address: student.address,
          });
          setError(null);
        } else {
          setError("Student not found");
        }
      } else {
        setFormData({
          name: "",
          class: "",
          year: "",
          nim: "",
          gender: "",
          guardian_name: "",
          birthDate: "",
          address: "",
        });
      }
    }
  }, [id, students, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Reset error setiap kali submit

    if (id) {
      // Panggil editStudent dengan id dan formData
      editStudent(id, formData)
        .then(() => navigate("/"))
        .catch((err) =>
          setError(`Failed to save student data: ${err.message}`)
        );
    } else {
      // Panggil addStudent hanya dengan formData
      addStudent(formData)
        .then(() => navigate("/"))
        .catch((err) =>
          setError(`Failed to save student data: ${err.message}`)
        );
    }
  };

  if (loading) return <p className="loading-cstm">Loading...</p>;

  return (
    <div className="form-container" style={{background: theme === "light" ? "#0000004c" : "white"}}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button className="btn-back">
          {language === "en" ? "Back to Home" : "Kembali ke Daftar"}
        </button>
      </Link>
      <div className="form-header-cstm">
        <h1>
          {isEditMode
            ? language === "en"
              ? "EDIT STUDENT"
              : "EDIT MAHASISWA"
            : language === "en"
            ? "ADD STUDENT"
            : "TAMBAH MAHASISWA"}
        </h1>
      </div>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-cstm-1">
          {/* name form */}
          <div className="form">
            <label htmlFor="name">
              {language === "en" ? "Name :" : "Nama :"}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={formValidation.name?.isValid ? "valid" : "invalid"}
              required
            />
            {formValidation.name?.message && (
              <small className="validation">
                {formValidation.name.message}
              </small>
            )}
          </div>
          {/* class form */}
          <div className="form">
            <label htmlFor="class">
              {language === "en" ? "Class :" : "Kelas :"}
            </label>
            <input
              id="class"
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={formValidation.class?.isValid ? "valid" : "invalid"}
              required
            />
            {formValidation.class?.message && (
              <small className="validation">
                {formValidation.class.message}
              </small>
            )}
          </div>
          {/* year form */}
          <div className="form">
            <label htmlFor="year">
              {language === "en" ? "Year :" : "Tahun :"}
            </label>
            <input
              list="year-list"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={formValidation.year?.isValid ? "valid" : "invalid"}
              placeholder={language === "en" ? "Choose" : "Pilih"}
              required
            />
            {formValidation.year?.message && (
              <small className="validation">
                {formValidation.year.message}
              </small>
            )}
            <datalist id="year-list">
              {[...Array(25)].map((_, i) => (
                <option key={i} value={2000 + i}>
                  {2000 + i}
                </option>
              ))}
            </datalist>
          </div>
          {/* nim form */}
          <div className="form">
            <label htmlFor="nim">
              {language === "en" ? "NIM :" : "Student ID :"}
            </label>
            <input
              id="nim"
              type="text"
              name="nim"
              value={formData.nim}
              onChange={handleChange}
              className={formValidation.nim?.isValid ? "valid" : "invalid"}
              required
            />
            {formValidation.nim?.message && (
              <small className="validation">{formValidation.nim.message}</small>
            )}
          </div>
        </div>

        <div className="form-cstm-2">
          {/* gender form */}
          <div className="form">
            <label htmlFor="gender">
              {language === "en" ? "Gender :" : "Jenis Kelamin :"}
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={formValidation.gender?.isValid ? "valid" : "invalid"}
              required
            >
              {formValidation.gender?.message && (
                <small className="validation">
                  {formValidation.gender.message}
                </small>
              )}
              <option value="" disabled>
                {language === "en" ? "Choose..." : "Pilih..."}
              </option>
              <option value="male">
                {language === "en" ? "Male" : "Laki-laki"}
              </option>
              <option value="female">
                {language === "en" ? "Female" : "Perempuan"}
              </option>
            </select>
          </div>

          {/* guadian form */}
          <div className="form">
            <label htmlFor="guardian_name">
              {language === "en" ? "Guardian Name :" : "Nama Wali :"}
            </label>
            <input
              id="guardian_name"
              type="text"
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleChange}
              className={
                formValidation.guardian_name?.isValid ? "valid" : "invalid"
              }
              required
            />
            {formValidation.guardian_name?.message && (
              <small className="validation">
                {formValidation.guardian_name.message}
              </small>
            )}
          </div>

          {/* birthDate form */}
          <div className="form">
            <label htmlFor="birthDate">
              {language === "en" ? "Birth Date :" : "Tanggal Lahir :"}
            </label>
            <input
              id="birthDate"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={
                formValidation.birthDate?.isValid ? "valid" : "invalid"
              }
              required
            />
            {formValidation.birthDate?.message && (
              <small className="validation">
                {formValidation.birthDate.message}
              </small>
            )}
          </div>
        </div>

        <div className="form-cstm-3">
          {/* address form */}
          <div className="form">
            <label htmlFor="address">
              {language === "en" ? "Address :" : "Alamat :"}
            </label>
            <textarea
              id="address"
              name="address"
              minLength={20}
              value={formData.address}
              onChange={handleChange}
              className={formValidation.address.isValid ? "valid" : "invalid"}
              required
            />
            {formValidation.address?.message && (
              <small className="validation">
                {formValidation.address.message}
              </small>
            )}
          </div>
        </div>

        <button className="btn-submit" type="submit">
          {language === "en" ? "Submit" : "Kirim"}
        </button>
      </form>
    </div>
  );
};

StudentsForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    nim: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    guardian_name: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  })
};

export default StudentsForm;
