package edu.unah.hn.projecto_ingenieria.WebSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final WebSocketAuthInterceptor webSocketAuthInterceptor;
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // Prefijo para mensajes del broker hacia el cliente
        config.enableSimpleBroker("/topic", "/queue");

        // Prefijo para mensajes del cliente hacia el servidor
        config.setApplicationDestinationPrefixes("/app");
        
        // Prefijo para canales privados por usuario
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("http://localhost:5173") 
                .addInterceptors(webSocketAuthInterceptor)
                .withSockJS();
    }
}