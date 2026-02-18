package edu.unah.hn.projecto_ingenieria.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProyectoUsuarioId implements Serializable {
    private int idUsuario;
    private int idProyecto;
}