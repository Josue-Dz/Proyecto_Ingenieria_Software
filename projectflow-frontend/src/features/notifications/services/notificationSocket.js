import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const conectarNotificaciones = (onNotificacion) => {
    if (stompClient && stompClient.active) return;

    stompClient = new Client({
        webSocketFactory: () =>
            new SockJS("http://localhost:8080/ws"),

        reconnectDelay: 5000,

        onConnect: () => {
            console.log("WebSocket conectado");

            stompClient.subscribe("/user/queue/notificaciones", (message) => {
                const notificacion = JSON.parse(message.body);
                onNotificacion(notificacion);
            });
        },

        onDisconnect: () => console.log("WebSocket desconectado"),

        onStompError: (frame) => {
            console.error("Error STOMP:", frame.headers["message"]);
        },
    });

    stompClient.activate();
};

export const desconectarNotificaciones = () => {
    stompClient?.deactivate();
    stompClient = null;
};