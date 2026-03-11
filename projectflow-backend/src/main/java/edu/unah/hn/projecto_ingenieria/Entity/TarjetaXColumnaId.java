package edu.unah.hn.projecto_ingenieria.Entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class TarjetaXColumnaId implements Serializable {

    private Long idTarjeta;

    private Long idColumna;
    
}
