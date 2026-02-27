import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
})

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