package edu.unah.hn.projecto_ingenieria.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class TableroDTO {
    
    private Long idTablero;

    private Long idProyecto;

    private String nombreProyecto;

    private String descripcion;

    private List<ColumnaDTO> columnas;
}
