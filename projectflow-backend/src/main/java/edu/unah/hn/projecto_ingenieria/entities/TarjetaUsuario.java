package edu.unah.hn.projecto_ingenieria.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tarjetas_x_usuarios")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TarjetaUsuario {
    @EmbeddedId
    private TarjetaUsuarioId id;

    @ManyToOne
    @MapsId("idUsuario")
    private Usuario usuario;

    @ManyToOne
    @MapsId("idTarjeta")
    private Tarjeta tarjeta;
}