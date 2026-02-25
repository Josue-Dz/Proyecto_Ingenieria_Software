package edu.unah.hn.projecto_ingenieria.JwtAuth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.Jwt.AuthResponse;
import edu.unah.hn.projecto_ingenieria.Jwt.LoginRequestDTO;
import edu.unah.hn.projecto_ingenieria.Jwt.UsuarioRegistroDTO;
import edu.unah.hn.projecto_ingenieria.Services.AuthService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UsuarioRegistroDTO dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

}