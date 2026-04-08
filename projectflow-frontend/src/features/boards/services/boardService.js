import apiClient from "../../../shared/api/apiCliente";

export const createBoardRequest = async (projectId, boardData) => {
    console.log("Esto va al backend: ", boardData)
    const response = await apiClient.post(`/boards/${projectId}/create`, boardData)
    return response.data;
}

export const getBoardsRequest = async (projectId) => {
    const response = await apiClient.get(`/boards/projects/${projectId}`)
    console.log("TABLERO: ", response.data)
    return response.data;
};

export const getColumnsRequest = async (boardId) => {
    const response = await apiClient.get(`/boards/${boardId}`);
    console.log("Columnas: ", response.data)
    return response.data.columnas;
};

export const createColumnRequest = async (boardId, nombre) => {
    //console.log("Crear Columna: ", boardId, nombre)
    const response = await apiClient.post(`/columns/${boardId}`, { nombreColumna: nombre });
    return response.data;
};

export const createTaskRequest = async (columnId, task) => {
    //console.log("Esto tiene task: ", task)
    const response = await apiClient.post(`/tasks/${columnId}`, task);
    return response.data;
}

export const updateTaskRequest = async (taskId, taskData) => {
    //console.log("Request Actualizar taskData: ", taskData)
    const response = await apiClient.put(`/tasks/${taskId}`, {
        titulo: taskData.titulo,
        descripcion: taskData.descripcion,
        prioridad: taskData.prioridad,
        fechaLimite: taskData.fechaLimite || null,
        estado: taskData.estado,
        usuariosAsignados: taskData.usuariosAsignados ?? [],
    });
    return response.data;
}

export const markTaskDoneRequest = async (taskId) => {
    const response = await apiClient.post(`/tasks/${taskId}/done`)
    return response.data;
}

export const moveTaskRequest = async (taskId, sourceColumnId, destColumnId, newPosition) => {
    const response = await apiClient.put(`/tasks/${taskId}/mover`,
        { columnaDestinoId: destColumnId, nuevaPosicion: newPosition },
        { params: { columnaOrigenId: sourceColumnId } }
    )
    return response.data;
}

export const searchUserRequest = async (correo) => {
    const response = await apiClient.get(`/users/buscar`, {
        params: { correo }
    });
    return response.data;
};


