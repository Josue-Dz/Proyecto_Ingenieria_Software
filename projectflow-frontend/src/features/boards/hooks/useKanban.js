import { useEffect, useState } from "react";
import { createColumnRequest, createTaskRequest, getColumnsRequest, moveTaskRequest } from "../services/boardService";

export function useKanban(boardId){
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectId, setProjectId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!boardId) return;
        const fetchColumns = async () => {
            try {
                const data = await getColumnsRequest(boardId);
                setColumns(data);
            } catch (err) {
                setError("No se pudo cargar el tablero.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchColumns();
    }, [boardId]);

    const addColumn = async (nombre) => {
        console.log("=== ADD COLUMN LLAMADO ===", nombre)
        try {
            const newColumn = await createColumnRequest(boardId,nombre);
            console.log("newColumn del backend:", newColumn);
            setColumns(prev => [...prev, { ...newColumn, tarjetas:[] }]);
        } catch (err) {
            console.error("Error al crear columna: ", err);
        }
    };

    const addTask = async (columnId, taskData) => {
        try {
            const newTask = await createTaskRequest(columnId, taskData);
            console.log("newTask del backend:", newTask);
            setColumns(prev => prev.map(col => col.idColumna === columnId 
                ? {...col, tarjetas: [...col.tarjetas, newTask]}
                : col
            ));
        } catch (err) {
            console.error("Error al crear tarea:", err);
        }
    };

     const moveTask = async (taskId, sourceColumnId, destColumnId, newPosition) => {
        try {
            console.log("movetask useKanban: ", taskId,sourceColumnId, destColumnId, newPosition)
            await moveTaskRequest(taskId, sourceColumnId, destColumnId, newPosition);
        } catch (err) {
            console.error("Error al mover tarea:", err);
            const data = await getColumnsRequest(boardId);
            setColumns(data);
        }
     };

     return { columns, projectId, setColumns, loading, error, addColumn, addTask, moveTask }
}