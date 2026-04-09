package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class TableroResponseDTO {
    
    private Long idTablero;

    private Long idProyecto;

    private String nombreTablero;

    private String descripcionTablero;

    private List<ColumnaDTO> columnas;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;
}
