package edu.unah.hn.projecto_ingenieria.entities;

import edu.unah.hn.projecto_ingenieria.enums.RolEnum;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "proyecto_x_usuarios")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProyectoUsuario {
    @EmbeddedId
    private ProyectoUsuarioId id;

    @Enumerated(EnumType.STRING)
    private RolEnum rol;

    @ManyToOne
    @MapsId("idUsuario")
    private Usuario usuario;

    @ManyToOne
    @MapsId("idProyecto")
    private Proyecto proyecto;
}