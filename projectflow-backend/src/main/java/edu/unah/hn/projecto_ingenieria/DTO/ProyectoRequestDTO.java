package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProyectoRequestDTO {
    

    private String nombreProyecto;

    private String descripcion;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;
}
