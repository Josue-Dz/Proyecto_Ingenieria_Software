package edu.unah.hn.projecto_ingenieria.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.unah.hn.projecto_ingenieria.DTO.UsuarioDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Jwt.AuthResponse;
import edu.unah.hn.projecto_ingenieria.Jwt.JwtService;
import edu.unah.hn.projecto_ingenieria.Jwt.LoginRequestDTO;
import edu.unah.hn.projecto_ingenieria.Jwt.UsuarioRegistroDTO;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UsuarioRepository usuarioRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthResponse login(LoginRequestDTO dto, HttpServletResponse response) {

                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
                Usuario user = usuarioRepository.findByCorreo(dto.getEmail())
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                String token = jwtService.getToken(user);

                // Crear la cookie
                Cookie cookie = crearCookie(token);
                response.addCookie(cookie);

                // Creo el dto con la data que tiene user
                UsuarioDTO usuarioDTO = crearUsuarioDTO(user);

                return AuthResponse.builder()
                                .user(usuarioDTO)
                                .build();

        }

        public AuthResponse register(UsuarioRegistroDTO dto, HttpServletResponse response) {

                Usuario usuario = Usuario.builder()
                                .nombre(dto.getNombre())
                                .apellido(dto.getApellido())
                                .correo(dto.getCorreo())
                                .password(passwordEncoder.encode(dto.getPassword()))
                                .estado("A")
                                .fechaRegistro(LocalDateTime.now())
                                .proyectosUsuario(new ArrayList<>())
                                .build();

                usuarioRepository.save(usuario);

                String token = jwtService.getToken(usuario);

                //Crear la cookie
                Cookie cookie = crearCookie(token);
                response.addCookie(cookie);

                Usuario user = usuarioRepository.findByCorreo(usuario.getCorreo())
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

               UsuarioDTO usuarioDTO = crearUsuarioDTO(user);

                return AuthResponse.builder()
                                .user(usuarioDTO)
                                .build();
        }

        public UsuarioDTO getMyProfile(){
                System.out.println("Estoy en getmyprofile");
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                System.out.println("Esto tiene authentication: " + authentication.getPrincipal());
                Usuario usuario = (Usuario) authentication.getPrincipal();

                UsuarioDTO usuarioDTO = new UsuarioDTO(
                        usuario.getNombre(),
                        usuario.getApellido(),
                        usuario.getNombre() + " " + usuario.getApellido(),
                        usuario.getCorreo(),
                        usuario.obtenerInicialesDeNombre(usuario.getNombre(), usuario.getApellido())
                );

                return usuarioDTO;
        }

        public void logout(HttpServletResponse response){
                Cookie cookie = new Cookie("token", null);
                cookie.setHttpOnly(false);
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
        }

        private UsuarioDTO crearUsuarioDTO(Usuario usuario){
                return new UsuarioDTO(
                        usuario.getNombre(),
                        usuario.getApellido(),
                        usuario.getNombre() + " " + usuario.getApellido(),
                        usuario.getCorreo(),
                        usuario.obtenerInicialesDeNombre(usuario.getNombre(), usuario.getApellido())
                );
        }

        private Cookie crearCookie(String token){
                Cookie cookie = new Cookie("token", token);
                cookie.setHttpOnly(true);
                cookie.setSecure(false);
                cookie.setPath("/");
                cookie.setMaxAge(3600);
                return cookie;
        }

}