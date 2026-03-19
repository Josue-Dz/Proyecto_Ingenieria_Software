package edu.unah.hn.projecto_ingenieria.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ColumnaDTO {

        private Long idColumna;
    
        private String nombreColumna;

        private Integer posicion;
        
        private Long idTablero;

        private List<TarjetaResponseDTO> tarjetas;
}
