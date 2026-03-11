package edu.unah.hn.projecto_ingenieria;

import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;

import edu.unah.hn.projecto_ingenieria.Jwt.JwtService;
import jakarta.servlet.http.Cookie;
//import lombok.With;

/**
 * Test class for HTTP requests
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class HttpTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserDetailsService UserDetailsService;

    @Autowired
    private JwtService jwtService;

    // Rutas Publicas, login y registro en AuthController /api/auth/login y /api/auth/register
    @Test
    void testRegister() throws Exception {
        // Test register, nota un nuevo usuario en verdad se va crear en la BD si no usamos la anotacion @Transactional, se probo exitosamente pero fue quitada para poder hacer reporte de github
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"Test\",\"apellido\":\"User\",\"correo\":\"newtest@example.com\",\"password\":\"password123\"}"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.header().exists("Set-Cookie"));
    }

    @Test
    void testLogin() throws Exception {
        // Test login, USAR usuario que ya existe en la BD
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"newtest@example.com\",\"password\":\"password123\"}"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.header().exists("Set-Cookie"));
    }

    // Rutas Privadas, requieren la cookie de autenticación
    // Test que ruta privada en verdad bloquea sin autenticación, usaremos api/projects/mine como ejemplo
    @Test
    void testPrivateRoute() throws Exception {
        // Test private route
        mockMvc.perform(MockMvcRequestBuilders.get("/api/projects/mine"))
            .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    // Test que ruta privada funciona con autenticación, usaremos api/projects/mine como ejemplo
    @Test
    void testAuthorizedProjectsMine() throws Exception {
        // Conseguimos los detalles de un usuario en la BD MySQL para generar un token JWT válido, recordar que este usuario existe en la BD
        UserDetails userDetails = UserDetailsService.loadUserByUsername("newtest@example.com");

        String token = jwtService.getToken(userDetails);

        Cookie authCookie = new Cookie("token", token);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/projects/mine").cookie(authCookie))
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

    }
