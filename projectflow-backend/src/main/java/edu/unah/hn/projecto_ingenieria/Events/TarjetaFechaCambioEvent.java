package edu.unah.hn.projecto_ingenieria.Events;

import java.time.LocalDate;

import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class TarjetaFechaCambioEvent extends ApplicationEvent {

    private final Tarjeta tarjeta;
    private final LocalDate fechaAntigua;
    private final LocalDate fechaNueva;

    public TarjetaFechaCambioEvent(Object source, Tarjeta tarjeta, LocalDate fechaAntigua, LocalDate fechaNueva) {
        super(source);
        this.tarjeta = tarjeta;
        this.fechaAntigua = fechaAntigua;
        this.fechaNueva = fechaNueva;
    }
}