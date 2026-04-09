import apiClient from "../../../shared/api/apiCliente";

export const getBurndownRequest = async (idTablero, fechaInicio, fechaFin) => {
    const response = await apiClient.get(`/reportes/tablero/${idTablero}/burndown`, {
        params: { fechaInicio, fechaFin }
    });
    return response.data;
};

export const getUserAnalyticsRequest = async (idTablero) => {
    const response = await apiClient.get(`/reportes/usuarios`, {
        params: { idTablero }
    });
    console.log("Analíticas de usuario: ", response.data)
    return response.data;
}

export const exportarReporteRequest = async (idTablero, formato, fechaInicio, fechaFin) => {
    const response = await apiClient.get(`/reportes/tablero/${idTablero}/exportar`, {
        params: { formato, fechaInicio, fechaFin },
        responseType: "blob" // esto para archivos binarios
    });
    return response;
};

export const exportarReporteUsuariosRequest = async (idTablero, formato) => {
    const response = await apiClient.get(`/reportes/usuarios/exportar`, {
        params: { idTablero, formato },
        responseType: "blob"
    });
    return response;
};