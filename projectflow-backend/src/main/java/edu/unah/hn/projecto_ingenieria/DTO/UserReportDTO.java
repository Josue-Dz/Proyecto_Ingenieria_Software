package edu.unah.hn.projecto_ingenieria.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReportDTO {

    private String nombre;

    private String iniciales;

    private int pendientes;

    private int enProgreso;

    private int finalizadas;

    private int totalAsignadas;
    
    private double eficiencia;

}
