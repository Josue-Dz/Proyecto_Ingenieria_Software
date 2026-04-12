package edu.unah.hn.projecto_ingenieria.DTO;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {

    private Long proyectosActivos;

    private int pendientes;

    private int enProgreso;

    private int finalizadas;

    private int vencidas;
    
    private double eficiencia;

    private List<Map<String, Object>> progresoSemanal;

    private List<Map<String, Object>> tareasPorProyecto;

}
