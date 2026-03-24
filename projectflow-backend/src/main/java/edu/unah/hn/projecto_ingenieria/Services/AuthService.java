package edu.unah.hn.projecto_ingenieria.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.ActualizarPerfilDTO;
import edu.unah.hn.projecto_ingenieria.DTO.CambioContraseniaDTO;

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
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));

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

        // Crear la cookie
        Cookie cookie = crearCookie(token);
        response.addCookie(cookie);

        Usuario user = usuarioRepository.findByCorreo(usuario.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UsuarioDTO usuarioDTO = crearUsuarioDTO(user);

        return AuthResponse.builder()
                .user(usuarioDTO)
                .build();
    }

    public UsuarioDTO getMyProfile() {
        
        Usuario usuarioPrincipal = getUsuarioAutenticado();
        
        UsuarioDTO usuarioDTO = new UsuarioDTO(
                usuarioPrincipal.getIdUsuario(),
                usuarioPrincipal.getNombre(),
                usuarioPrincipal.getApellido(),
                usuarioPrincipal.getNombre() + " " + usuarioPrincipal.getApellido(),
                usuarioPrincipal.getCorreo(),
                usuarioPrincipal.obtenerInicialesDeNombre(usuarioPrincipal.getNombre(), usuarioPrincipal.getApellido()));

        return usuarioDTO;
    }

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(false);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private UsuarioDTO crearUsuarioDTO(Usuario usuario) {
        return new UsuarioDTO(
                usuario.getIdUsuario(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getNombre() + " " + usuario.getApellido(),
                usuario.getCorreo(),
                usuario.obtenerInicialesDeNombre(usuario.getNombre(), usuario.getApellido()));
    }

    private Cookie crearCookie(String token) {
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(3600);
        return cookie;
    }

    public UsuarioDTO updateMyProfile(ActualizarPerfilDTO actualizarPerfil) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = (Usuario) authentication.getPrincipal();

        // Recargar desde BD para tener la entidad gestionada
        Usuario usuarioBD = usuarioRepository.findById(usuario.getIdUsuario())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        if (actualizarPerfil.getNombre() == null || actualizarPerfil.getNombre().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre no puede estar vacío");

        if (actualizarPerfil.getApellido() == null || actualizarPerfil.getApellido().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El apellido no puede estar vacío");

        usuarioBD.setNombre(actualizarPerfil.getNombre());
        usuarioBD.setApellido(actualizarPerfil.getApellido());
        usuarioRepository.save(usuarioBD);

        return new UsuarioDTO(
                usuarioBD.getIdUsuario(),
                usuarioBD.getNombre(),
                usuarioBD.getApellido(),
                usuarioBD.getNombre() + " " + usuarioBD.getApellido(),
                usuarioBD.getCorreo(),
                usuarioBD.obtenerInicialesDeNombre(usuarioBD.getNombre(), usuarioBD.getApellido()));

    }

    public void changeMyPassword(CambioContraseniaDTO cambioContrasenia) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String correo = authentication.getName();// El correo / nombre del usuario

        Usuario usuarioBD = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        if (!passwordEncoder.matches(cambioContrasenia.getContraseniaActual(), usuarioBD.getPassword()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contraseña actual es incorrecta");

        if (cambioContrasenia.getNuevaContrasenia() == null || cambioContrasenia.getNuevaContrasenia().length() < 8)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La nueva contraseña debe tener al menos 8 caracteres");

        usuarioBD.setPassword(passwordEncoder.encode(cambioContrasenia.getNuevaContrasenia()));
        usuarioRepository.save(usuarioBD);

    }

    public Usuario getUsuarioAutenticado() {
        Usuario usuarioPrincipal = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return usuarioRepository.findByCorreo(usuarioPrincipal.getCorreo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));
    }

}