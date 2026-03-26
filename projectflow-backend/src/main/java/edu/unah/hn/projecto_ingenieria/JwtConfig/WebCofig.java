package edu.unah.hn.projecto_ingenieria.JwtConfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCofig implements WebMvcConfigurer{
    
    // Uses the Vercel URL from environment variables, or defaults to localhost
    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
        .allowedOrigins(frontendUrl) 
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // OPTIONS is required for pre-flight cross-domain requests
        .allowedHeaders("*")
        .allowCredentials(true);
    }
}