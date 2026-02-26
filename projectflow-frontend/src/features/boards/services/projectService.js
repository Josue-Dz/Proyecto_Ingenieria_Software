import apiClient from "../../../shared/api/apiCliente"

export const getProjectsRequest = async () => {
    const response = await apiClient.get("/projects/mine");
    return response.data;
}

export const createProjectRequest = async () => {
    const response = await apiClient.post("/projects/create")
    return response.data;
}

export const deleteBoardRequest = async () => {
    return null;
}