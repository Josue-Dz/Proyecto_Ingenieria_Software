import apiClient from "../../../shared/api/apiCliente"

export const loginRequest = async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
}

export const registerRequest = async (userData) => {
    const response = await apiClient.post("/auth/register",userData);
    return response.data;
}

export const logoutRequest = async () => {
    const response = await apiClient.post("/auth/logout")
    return response.data;
}

export const verifySessionRequest = async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
}