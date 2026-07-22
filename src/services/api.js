import axios from "axios";

let pendingRequests = 0;

function notifyRequestState() {
    window.dispatchEvent(new CustomEvent("hospital-api-request-state", {
        detail: { pendingRequests }
    }));
}

const api = axios.create({
    // VITE_API_URL lets production deployments point to their own API.
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
    // Render free instances can take around a minute to wake up after sleeping.
    timeout: 90000,
});

api.interceptors.request.use((config) => {
    pendingRequests += 1;
    notifyRequestState();
    return config;
});

api.interceptors.response.use(
    (response) => {
        pendingRequests = Math.max(0, pendingRequests - 1);
        notifyRequestState();
        return response;
    },
    (error) => {
        pendingRequests = Math.max(0, pendingRequests - 1);
        notifyRequestState();
        return Promise.reject(error);
    }
);

export default api;
