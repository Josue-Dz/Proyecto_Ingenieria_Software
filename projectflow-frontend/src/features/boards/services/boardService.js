import apiClient from "../../../shared/api/apiCliente"

export const getBoards = async () => {
    const response = await apiClient.get("/board/boards");
    return response.data;
}

export const createBoard = async (boarData) => {
    const response = await apiClient.post("/board/create")
    return response.data;
}

export const deleteBoard = async () => {
    return null;
}