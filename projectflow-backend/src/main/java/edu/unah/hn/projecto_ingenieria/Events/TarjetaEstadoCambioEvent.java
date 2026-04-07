package edu.unah.hn.projecto_ingenieria.Events;

import java.time.LocalDateTime;

import org.springframework.context.ApplicationEvent;

import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.EstadoTarjeta;
import lombok.Getter;

@Getter
public class TarjetaEstadoCambioEvent extends ApplicationEvent {

    private final Tarjeta tarjeta;
    private final Tablero tablero;
    private final EstadoTarjeta estadoAnterior;
    private final EstadoTarjeta estadoNuevo;
    private final LocalDateTime fechaCambio;

    public TarjetaEstadoCambioEvent(
            Object source,
            Tarjeta tarjeta,
            Tablero tablero,
            EstadoTarjeta estadoAnterior,
            EstadoTarjeta estadoNuevo,
            LocalDateTime fechaCambio) {
        super(source);
        this.tarjeta = tarjeta;
        this.tablero = tablero;
        this.estadoAnterior = estadoAnterior;
        this.estadoNuevo = estadoNuevo;
        this.fechaCambio = fechaCambio;
    }
}
