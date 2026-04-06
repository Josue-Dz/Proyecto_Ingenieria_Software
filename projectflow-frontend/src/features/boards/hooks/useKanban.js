import { useEffect, useState } from "react";
import { createColumnRequest, createTaskRequest, getColumnsRequest, moveTaskRequest } from "../services/boardService";

export function useKanban(boardId) {
    const [columns, setColumns] = useState([]);
    const [items, setItems] = useState({});
    const [taskMap, setTaskMap] = useState({}); 
    //const [proyectoId, setProyectoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!boardId) return;
        const fetchColumns = async () => {
            try {
                const data = await getColumnsRequest(boardId);
                setColumns(data);
                console.log("Columnas obtenidas: ", data);
                const newItems = {};
                const newTaskMap = {};
                data.forEach(col => {
                    newItems[String(col.idColumna)] = (col.tarjetas ?? []).map(t => t.idTarjeta);
                    (col.tarjetas ?? []).forEach(t => {
                        newTaskMap[t.idTarjeta] = t;
                    });
                });
                setItems(newItems);
                setTaskMap(newTaskMap);
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
        try {
            const newColumn = await createColumnRequest(boardId, nombre);
            const id = String(newColumn.idColumna);
            setColumns(prev => [...prev, newColumn]);
            setItems(prev => ({ ...prev, [id]: [] }));
        } catch (err) {
            console.error("Error al crear columna:", err);
        }
    };

    const addTask = async (columnId, taskData) => {
        try {
            const newTask = await createTaskRequest(columnId, taskData);
            const id = String(columnId);
            setItems(prev => ({ ...prev, [id]: [...(prev[id] ?? []), newTask.idTarjeta] }));
            setTaskMap(prev => ({ ...prev, [newTask.idTarjeta]: newTask }));
        } catch (err) {
            console.error("Error al crear tarea:", err);
        }
    };

    const moveTask = async (taskId, sourceColumnId, destColumnId, newPosition) => {
        try {
            await moveTaskRequest(taskId, sourceColumnId, destColumnId, newPosition);
        } catch (err) {
            console.error("Error al mover tarea:", err);
            const data = await getColumnsRequest(boardId);
            setColumns(data);
            const newItems = {};
            const newTaskMap = {};
            data.forEach(col => {
                newItems[String(col.idColumna)] = (col.tarjetas ?? []).map(t => t.idTarjeta);
                (col.tarjetas ?? []).forEach(t => { newTaskMap[t.idTarjeta] = t; });
            });
            setItems(newItems);
            setTaskMap(newTaskMap);
        }
    };

    const updateTask = (updated) => {
        setTaskMap(prev => ({ ...prev, [updated.idTarjeta]: updated }));
    };

    return { columns, items, taskMap, setItems, loading, error, addColumn, addTask, moveTask, updateTask };
}