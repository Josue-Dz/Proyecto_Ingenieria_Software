package edu.unah.hn.projecto_ingenieria.Jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    // Usa una clave suficientemente larga (mínimo 256 bits para HS256).
    private static final String SECRET_KEY = "CLAVE_SECRETA_PARA_PROYECTO_INGENIERIA_SOFTWARE_1234567890";

    public String getToken(UserDetails usuario) {
        return getToken(new HashMap<>(), usuario);
    }

    public String getToken(Map<String, Object> claims, UserDetails usuario) {
        return Jwts.builder()
                .claims(claims)
                .subject(usuario.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas
                .signWith(getKey()) // se pasa la clave directamente
                .compact();
    }

    private Key getKey() {
        // si la clave es una cadena, se convierte a bytes y se usa para generar la clave HMAC
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

     // Validar token
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


  private Claims getAllClaims(String token) {
    return Jwts.parser()                    
            .verifyWith((SecretKey) getKey())
            .build()
            .parseSignedClaims(token)       
            .getPayload();                  
}

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver)
    {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);

    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }
}