import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const loginApi = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data,
    { withCredentials: true }
  );
};

export const registerApi = async (data) => {
  return await axios.post(`${API_URL}/auth/register`, data);
};

export const logoutApi = async () => {
  return await axios.post(
    `${API_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
};

export const checkAuthApi = async () => {
  return axios.get(`${API_URL}/auth/check-auth`, { withCredentials: true });
};
