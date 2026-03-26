package edu.unah.hn.projecto_ingenieria.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_notificaciones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notificacion")
    private Long idNotificacion;

    @Column(name = "mensaje", nullable = false)
    private String mensaje;

    @Column(name = "tipo", nullable = false)
    private String tipo; // Ej: "ASIGNACION", "MOVIMIENTO", "FECHA_CAMBIO"

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "leida")
    private Boolean leida = false;

    // Relación opcional con Tarjeta si se quiere rastrear
    @ManyToOne
    @JoinColumn(name = "id_tarjeta")
    private Tarjeta tarjeta;
}