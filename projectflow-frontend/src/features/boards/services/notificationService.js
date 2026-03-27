import apiClient from "../../../shared/api/apiCliente";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


export const getMisNotificacionesRequest = async () => {
    const response = await apiClient.get("/notifications");
    return response.data;
};

export const getcontarNoLeidasRequest = async () => {
    const response = await apiClient.get("/notifications/no/read");
    return response.data;
};

export const marcarComoLeidaRequest = async (id) => {
    const response = await apiClient.put(`/notifications/${id}/read`);
    return response.data;
};

export const marcarTodasComoLeidasRequest = async () => {
    await apiClient.put("/notifications/read/all");
};

// WebSocket 

let stompClient = null;

export const conectarNotificaciones = (onNotificacion) => {
    const token = localStorage.getItem("token"); // mismo lugar que tu interceptor de axios

    stompClient = new Client({
        webSocketFactory: () =>
            new SockJS(`http://localhost:8080/ws?token=${token}`),

        reconnectDelay: 5000,

        onConnect: () => {
            console.log("WebSocket conectado");
            stompClient.subscribe("/user/queue/notificaciones", (message) => {
                const notificacion = JSON.parse(message.body);
                onNotificacion(notificacion);
            });
        },

        onDisconnect: () => console.log("WebSocket desconectado"),

        onStompError: (frame) =>
            console.error("Error STOMP:", frame.headers["message"]),
    });

    stompClient.activate();
};

export const desconectarNotificaciones = () => {
    stompClient?.deactivate();
};