package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TarjetaRequestDTO {

    private String titulo;

    private String descripcion;

    private LocalDate fechaLimite;

    private String prioridad;
    
    private Long idColumna;
}
