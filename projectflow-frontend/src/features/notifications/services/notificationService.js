import apiClient from "../../../shared/api/apiCliente";

export const getMisNotificacionesRequest = async () => {
    const response = await apiClient.get("/notifications");
    return response.data;
};

export const getcontarNoLeidasRequest = async () => {
    const response = await apiClient.get("/notifications/no/read");
    return response.data;
};

export const marcarComoLeidaRequest = async (id) => {
    const response = await apiClient.put(`/notifications/${id}/read`);
    return response.data;
};

export const marcarTodasComoLeidasRequest = async () => {
    await apiClient.put("/notifications/read/all");
};