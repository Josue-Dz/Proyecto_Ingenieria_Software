package edu.unah.hn.projecto_ingenieria.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
@Table(name = "tbl_historial_estado_tarjeta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistorialEstadoTarjeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Long idHistorial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tarjeta", nullable = false)
    private Tarjeta tarjeta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tablero", nullable = false)
    private Tablero tablero;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_anterior")
    private Tarjeta.EstadoTarjeta estadoAnterior;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_nuevo", nullable = false)
    private Tarjeta.EstadoTarjeta estadoNuevo;

    @Column(name = "fecha_cambio", nullable = false)
    private LocalDateTime fechaCambio;
}
