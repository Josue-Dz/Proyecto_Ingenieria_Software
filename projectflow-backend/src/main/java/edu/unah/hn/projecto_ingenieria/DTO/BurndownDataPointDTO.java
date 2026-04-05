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
public class BurndownDataPointDTO {

    private LocalDate fecha;
    private int tareasTotalesEsperadas;
    private int tareasCompletadasEnDia;
    private int tareasRestantes;
}
