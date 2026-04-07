import apiClient from "../../../shared/api/apiCliente";

export const getHistorialProyectoRequest = async (idProyecto) => {
    const response = await apiClient.get(`/historial/${idProyecto}`);
    return response.data;
};