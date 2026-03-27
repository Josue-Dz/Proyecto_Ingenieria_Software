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
public class NotificacionDTO {
    
    private Long idNotificacion;

    private String mensaje;

    private String tipo;

    private LocalDateTime fechaCreacion;

    private boolean leida;

    private Long idTarjeta;

}
