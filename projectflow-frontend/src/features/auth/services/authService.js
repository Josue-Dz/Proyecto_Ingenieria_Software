import apiClient from "../../../shared/api/apiCliente"

export const loginRequest = async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    const token = response.data.token;
    return response.data;
}

export const registerRequest = async (userData) => {
    const response = await apiClient.post("/auth/register",userData);
    return response.data;
}

export const getMyProfile = async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
}