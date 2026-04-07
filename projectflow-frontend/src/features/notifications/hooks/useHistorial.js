import { useState, useEffect, useCallback } from "react";
import { getHistorialProyectoRequest } from "../services/historialService";

export const useHistorial = (idProyecto, isOpen) => {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(false);

    const cargarHistorial = useCallback(async () => {
        if (!idProyecto) return;
        setLoading(true);
        try {
            const data = await getHistorialProyectoRequest(idProyecto);
            setHistorial(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar historial:", error);
        } finally {
            setLoading(false);
        }
    }, [idProyecto]);

    // Solo carga cuando se abre el panel
    useEffect(() => {
        if (isOpen) cargarHistorial();
    }, [isOpen, cargarHistorial]);

    return { historial, loading, refetch: cargarHistorial };
};