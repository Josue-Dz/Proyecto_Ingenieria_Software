package edu.unah.hn.projecto_ingenieria.Jwt;

import edu.unah.hn.projecto_ingenieria.DTO.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class AuthResponse {

    private UsuarioDTO usuario;

}
