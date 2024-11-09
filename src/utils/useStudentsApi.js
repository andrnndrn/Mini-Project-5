import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "../utils/apiService";

const useStudentsApi = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchStudents(); 
      if (response.status === 'success') {
        setStudents(response.data);
      }
    } catch (error) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, []);

  const addStudent = async (student) => {
    setError(null); 
    try {
      const res = await createStudent(student);
      setStudents((prev) => [...prev, res.data]);
      Swal.fire("Success", "Student added successfully", "success");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", "Failed to add student", "error");
    }
  };

  const editStudent = async (id, student) => {
    try {
      const res = await updateStudent(id, student);
      setStudents((prev) => prev.map((item) => (item.id === id ? res.data : item))
      );
      Swal.fire("Success", "Student updated successfully", "success");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", "Failed to update student", "error");
    }
  };

  const removeStudent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        deleteStudent(id)
          .then(() => {
            setStudents((prev) => (Array.isArray(prev) ? prev.filter((item) => item.id !== id): []));
            Swal.fire("Deleted!", "Student has been deleted.", "success");
          })
          .catch((err) => {
            setError(err.message);
            Swal.fire("Error", "Failed to delete student", "error");
          })
          .finally(() => setLoading(false));
      }
    });
  };

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  return { students, loading, error, fetchStudent, addStudent, editStudent, removeStudent };
};

export default useStudentsApi;
