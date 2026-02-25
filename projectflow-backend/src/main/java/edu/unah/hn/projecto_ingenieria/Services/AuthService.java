package edu.unah.hn.projecto_ingenieria.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Jwt.AuthResponse;
import edu.unah.hn.projecto_ingenieria.Jwt.JwtService;
import edu.unah.hn.projecto_ingenieria.Jwt.LoginRequestDTO;
import edu.unah.hn.projecto_ingenieria.Jwt.UsuarioRegistroDTO;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    
    public AuthResponse login(LoginRequestDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );
        UserDetails user = usuarioRepository.findByCorreo(dto.getEmail()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    

    public AuthResponse register(UsuarioRegistroDTO dto) {

        Usuario usuario = Usuario.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .correo(dto.getCorreo())
                .password(passwordEncoder.encode(dto.getPassword()))
                .estado("A")
                .fechaRegistro(LocalDateTime.now())
                .proyectosUsuario(new ArrayList<>()) // ← inicializa la lista vacía
                .build();
        
        usuarioRepository.save(usuario);

        return AuthResponse.builder()
        .token(jwtService.getToken(usuario))
        .build();
    }

}