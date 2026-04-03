package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistorialActividadDTO {

    private String usuarioAccion;

    private String mensaje;

    private String tipo;

    private String tituloTarjeta;

    private LocalDateTime fechaCreacion;
}
