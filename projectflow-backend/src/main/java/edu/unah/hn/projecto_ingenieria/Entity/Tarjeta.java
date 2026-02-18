package edu.unah.hn.projecto_ingenieria.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_tarjetas")
@Getter
@Setter
@AllArgsConstructor
public class Tarjeta {

       public enum EstadoTarjeta {
    PENDIENTE,
    EN_PROGRESO,
    FINALIZADA
}

    public enum Prioridad {
        BAJA,
        MEDIA,
        ALTA
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "id_tarjeta")
    private Long idTarjeta;

    private String titulo;

    @Lob
    private String descripcion;

    @JoinColumn(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @JoinColumn(name = "fecha_limite")
    private LocalDate fechaLimite;

    @Enumerated(EnumType.STRING)
    private Prioridad prioridad;

    @Enumerated(EnumType.STRING)
    private EstadoTarjeta estado;

    @ManyToOne
    @JoinColumn(name = "id_creador")
    private Usuario creador;

    @ManyToOne
    @JoinColumn(name = "id_columna")
    private Columna columna;

    @ManyToMany
    @JoinTable(
        name = "tbl_tarjetas_x_usuarios",
        joinColumns = @JoinColumn(name = "id_tarjeta"),
        inverseJoinColumns = @JoinColumn(name = "id_usuario")
    )
    
    private List<Usuario> asignados;
}

