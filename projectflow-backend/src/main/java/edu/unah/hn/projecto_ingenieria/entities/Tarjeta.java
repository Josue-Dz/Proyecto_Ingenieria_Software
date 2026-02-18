package edu.unah.hn.projecto_ingenieria.entities;

import java.util.Date;
import java.util.List;

import edu.unah.hn.projecto_ingenieria.enums.EstadoEnum;
import edu.unah.hn.projecto_ingenieria.enums.PrioridadEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_tarjetas")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tarjeta {
    @Id
    @Column(name = "id_tarjeta")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTarjeta;

    private String titulo;

    private String descripcion;

    @Column(name = "fecha_creacion")
    private Date fechaCreacion;

    @Column(name = "fecha_limite")
    private Date fechaLimite;

    @Enumerated(EnumType.STRING)
    private PrioridadEnum prioridad;

    @Enumerated(EnumType.STRING)
    private EstadoEnum estado;

    @ManyToOne
    @Column(name = "id_creador")
    private Usuario usuarioCreador;

    @ManyToOne
    @Column(name = "id_columna")
    private Columna columna;

    @OneToMany(mappedBy = "tarjeta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TarjetaUsuario> tarjetaUsuarios;
}