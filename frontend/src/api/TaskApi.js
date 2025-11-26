import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const addTaskApi = async (data) => {
  return axios.post(`${API_URL}/tasks/create`, data, {
    withCredentials: true,
  });
};

export const allTasksApi = async () => {
  return axios.get(`${API_URL}/tasks`, {
    withCredentials: true,
  });
};

export const deleteTaskApi = async (id) => {
  return axios.delete(`${API_URL}/tasks/delete/${id}`, {
    withCredentials: true,
  });
};

export const updateTaskApi = async (id, data) => {
  return axios.put(`${API_URL}/tasks/update/${id}`, data, {
    withCredentials: true,
  });
};
