import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const loginApi = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

export const registerApi = async (data) => {
  return await axios.post(`${API_URL}/auth/register`, data);
};
