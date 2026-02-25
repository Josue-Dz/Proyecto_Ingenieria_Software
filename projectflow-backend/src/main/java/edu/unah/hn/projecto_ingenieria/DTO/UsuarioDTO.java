package edu.unah.hn.projecto_ingenieria.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioDTO {
    private String nombre;

    private String apellido;

    private String nombreCompleto;

    private String correo;

    private String inciales;
}
