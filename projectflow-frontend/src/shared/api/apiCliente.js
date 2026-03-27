import axios from "axios"

const apiClient = axios.create({
    // Use Vite's environment variables to switch between localhost and Azure
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
})

apiClient.interceptors.request.use((config) => {

const token = localStorage.getItem("token");
if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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


export default apiClient
