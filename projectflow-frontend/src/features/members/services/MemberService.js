import apiClient from "../../../shared/api/apiCliente";

export const getMembersRequest = async (idProyecto) => {
    const response = await apiClient.get(`/projects/${idProyecto}/members`);
    //console.log("Members response:", response.data);
    return response.data;
};

export const inviteMemberRequest = async (idProyecto, data) => {
    const response = await apiClient.post(`/projects/${idProyecto}/members/invite`, data);
    return response.data;
};

export const changeRolRequest = async (idProyecto, idUsuario, data) => {
    const response = await apiClient.put(`/projects/${idProyecto}/members/${idUsuario}/role`, data);
    return response.data;
};

export const removeMemberRequest = async (idProyecto, idUsuario) => {
    await apiClient.delete(`/projects/${idProyecto}/members/${idUsuario}`);
};