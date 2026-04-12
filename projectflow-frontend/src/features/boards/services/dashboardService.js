import apiClient from "../../../shared/api/apiCliente";

export const getDashboard = async () => {
    const response = await apiClient.get("/dashboard/get");
    console.log("DASHBOARD:", response.data)
    return response.data;
};