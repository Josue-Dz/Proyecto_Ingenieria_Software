package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.EstadoTarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.Prioridad;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
@NoArgsConstructor
public class TarjetaResponseDTO {

    private Long idTarjeta;

    private String titulo;

    private String descripcion;

    private LocalDateTime fechaCreacion;

    private LocalDate fechaLimite;

    private Prioridad prioridad;

    private EstadoTarjeta estado;

    private List<UsuarioDTO> asignados;
}

