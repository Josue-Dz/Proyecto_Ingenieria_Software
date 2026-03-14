import apiClient from "../../../shared/api/apiCliente";

export const createBoardRequest = async (projectId, boardData) => {
    console.log("Esto va al backend: ", boardData)
    const response = await apiClient.post(`/boards/${projectId}/create`, boardData)
    return response.data;
}

export const getBoardsRequest = async (projectId) => {
    const response = await apiClient.get(`/boards/projects/${projectId}`)
    return response.data;
};

export const getColumnsRequest = async (boardId) => {
    const response = await apiClient.get(`/boards/${boardId}`);
    return response.data.columnas;
};

export const createColumnRequest = async (boardId, nombre) => {
    const response = await apiClient.post(`/boards/${boardId}/columns`, { nombre });
    return response.data;
};

export const createTaskRequest = async (columnId, task) => {
    const response = await apiClient.post(`/colums/${columnId}/tasks`, task);
    return response.data;
}

export const updateTaskRequest = async (taskId, taskData) => {
    const response = await apiClient.put(`/tasks/${taskId}`, taskData);
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


