package edu.unah.hn.projecto_ingenieria.WebSocket;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import edu.unah.hn.projecto_ingenieria.Jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class WebSocketAuthInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {

        if (request instanceof ServletServerHttpRequest servletRequest) {
            String token = extraerToken(servletRequest.getServletRequest());
            
            if (token == null) return false;

            try {
                // Se extrae el username del subject del JWT
                String username = jwtService.getUsernameFromToken(token);
                
                // Se carga el UserDetails para validar
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                                
                if (!jwtService.isTokenValid(token, userDetails)) return false;

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                // Se guarda en atributos de sesión WebSocket
                attributes.put("user", auth);
                SecurityContextHolder.getContext().setAuthentication(auth);
                return true;

            } catch (UsernameNotFoundException e) {

                return false;
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {}

    private String extraerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return request.getParameter("token");
    }
}