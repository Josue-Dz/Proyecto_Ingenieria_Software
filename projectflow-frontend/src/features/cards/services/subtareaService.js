import apiClient from "../../../shared/api/apiCliente"

export const getSubtasksRequest = async (taskId) => {
    const response = await apiClient.get(`/subtasks/${taskId}`);
    return response.data;
}

export const createSubtaskRequest = async (taskId, descripcion) => {
    const response = await apiClient.post(`/subtasks/create/${taskId}`, {
        descripcion
    });
    
    console.log("SUBTAREA: ", response.data)
    return response.data; 
}

export const toggleSubtaskRequest = async (subtaskId) => {
    console.log("SUBTASKID: ", subtaskId)
    const response = await apiClient.put(`/subtasks/${subtaskId}/toggle`);
    return response.data;
}