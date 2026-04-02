import apiClient from "../../../shared/api/apiCliente"

export const getProjectsRequest = async () => {
    const response = await apiClient.get("/projects/mine");
    return response.data;
}

export const createProjectRequest = async (projectData) => {
    const response = await apiClient.post("/projects/create", projectData)
    return response.data;
}

export const getProjectRequest = async (id) => {
    const response = await apiClient.get(`/projects/${id}`)
    return response.data;
}

export const deleteBoardRequest = async () => {
    return null;
}

export const updateProjectRequest = async (id, projectData) => {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
}

export const deleteProjectRequest = async (id) => {
    await apiClient.delete(`/projects/${id}`);
}