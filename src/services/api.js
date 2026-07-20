import axios from "axios";

const api = axios.create({
    // VITE_API_URL lets production deployments point to their own API.
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
    timeout: 10000,
});

export default api;
