import { useState, useCallback } from "react";
import { getBurndownRequest } from "../services/reportService";

export const useBurndown = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBurndown = useCallback(async (idTablero, fechaInicio, fechaFin) => {
        setLoading(true);
        setError(null);
        try {
            const result = await getBurndownRequest(idTablero, fechaInicio, fechaFin);
            setData(result);
        } catch (err) {
            const status = err?.response?.status;
            setError(
                status === 403 ? "No tienes permisos para ver este reporte." :
                status === 404 ? "Tablero no encontrado." :
                status === 400 ? "Fechas inválidas." :
                "Error al cargar el reporte."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, fetchBurndown };
};