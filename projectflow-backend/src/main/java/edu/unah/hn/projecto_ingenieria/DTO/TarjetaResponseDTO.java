package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TarjetaResponseDTO {

    private Long idTarjeta;

    private String titulo;

    private String descripcion;

    private LocalDateTime fechaCreacion;

    private LocalDate fechaLimite;

    private String prioridad;

    private String estado;
}

