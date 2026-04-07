package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BurndownResponseDTO {

    private Long idTablero;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private List<BurndownDataPointDTO> puntos;
    private double porcentajeCompletitud;
}
