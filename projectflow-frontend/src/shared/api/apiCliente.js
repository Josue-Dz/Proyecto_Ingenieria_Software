import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthMe = error.config?.url?.includes("/auth/me");
        if (error.response?.status === 401 && !isAuthMe) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;