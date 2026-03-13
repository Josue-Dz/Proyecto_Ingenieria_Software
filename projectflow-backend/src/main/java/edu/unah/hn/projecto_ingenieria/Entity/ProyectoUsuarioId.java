package edu.unah.hn.projecto_ingenieria.Entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
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
@Embeddable
public class ProyectoUsuarioId implements Serializable {
    
    private Long usuario;
    
    private Long proyecto;

    

    // Constructor, getters, setters, equals y hashCode
}
