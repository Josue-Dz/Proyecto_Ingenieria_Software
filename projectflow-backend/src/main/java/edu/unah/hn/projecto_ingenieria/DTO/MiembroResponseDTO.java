package edu.unah.hn.projecto_ingenieria.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MiembroResponseDTO {
    
    private Long idUsuario;

    private String nombre;

    private String apellido;

    private String correo;

    private String iniciales;

    private String rol;
}
