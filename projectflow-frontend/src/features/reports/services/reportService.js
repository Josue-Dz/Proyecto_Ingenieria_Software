import apiClient from "../../../shared/api/apiCliente";

export const getBurndownRequest = async (idTablero, fechaInicio, fechaFin) => {
    const response = await apiClient.get(`/reportes/tablero/${idTablero}/burndown`, {
        params: { fechaInicio, fechaFin }
    });
    return response.data;
};