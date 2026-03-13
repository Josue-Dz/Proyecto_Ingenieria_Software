import apiClient from "../../../shared/api/apiCliente"

export const getMyProfileRequest = async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
};
 
export const updateMyProfileRequest = async (profileData) => {
    const response = await apiClient.put("/auth/me", profileData);
    return response.data;
};
 
export const changeMyPasswordRequest = async (passwordData) => {
    const response = await apiClient.put("/auth/me/password", passwordData);
    return response.data;
};