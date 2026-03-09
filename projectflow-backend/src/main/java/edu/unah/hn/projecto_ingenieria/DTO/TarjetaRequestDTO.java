package edu.unah.hn.projecto_ingenieria.DTO;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TarjetaRequestDTO {

    private String titulo;

    private String descripcion;

    private LocalDate fechaLimite;

    private String prioridad;
    
    private List<Long> usuariosAsignados;
}
