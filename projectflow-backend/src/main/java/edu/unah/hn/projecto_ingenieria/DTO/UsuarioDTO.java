package edu.unah.hn.projecto_ingenieria.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Validaciones
import jakarta.validation.constraints.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsuarioDTO {

    private Long idUsuario;

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @NotBlank(message = "El apellido no puede estar vacío")
    private String apellido;

    @NotBlank(message = "El nombre completo de usuario no puede estar vacío")
    private String nombreCompleto;

    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "El correo debe ser válido")
    private String correo;

    @NotBlank(message = "Las iniciales no pueden estar vacías")
    private String iniciales;

    // Constructor extra para registro sin id ni rol
    public UsuarioDTO(String nombre, String apellido, String nombreCompleto, String correo, String iniciales) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreCompleto = nombreCompleto;
        this.correo = correo;
        this.iniciales = iniciales;
    }

}
