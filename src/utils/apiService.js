import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      "api-key": "RJS1-202402",
    },
});
  
export const fetchStudents = async () => {
  const response = await api.get(API_URL);
  return response.data;
};
export const createStudent = (student) => api.post(API_URL, student);
export const updateStudent = (id, student) => api.put(`${API_URL}/${id}`, student);
export const deleteStudent = (id) => api.delete(`${API_URL}/${id}`);
