import axios from "axios";

// const api = "https://telebit-api.onrender.com";
const api = "http://localhost:4040";

const instance = axios.create({
  baseURL: `${api}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default {
  login: (formData) => instance.post("/login", formData),
  register: (formData) => instance.post("/register", formData),
  verifyEmail: (formData) => instance.patch("/verifyEmail", formData),
  verifyToken: (token) => instance.get(`/verifyToken?token=${token}`),
  verifyGoogleToken: (token) => instance.post("/verifyGoogleToken", { token }),
};
