package edu.unah.hn.projecto_ingenieria.JwtConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import edu.unah.hn.projecto_ingenieria.Jwt.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter JwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
   
    return http
    .cors(Customizer.withDefaults())
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(authRequest -> 
        authRequest.requestMatchers("/api/auth/login", "/api/auth/register").permitAll() //se especifican las rutas publicas
        .anyRequest().authenticated() //aqui las rutas privadas
    )   
    .sessionManagement(sessionManager -> 
        sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
    .exceptionHandling(ex -> ex
        .authenticationEntryPoint((request, response, authException) -> {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    })
)
    .build();
  }
}
