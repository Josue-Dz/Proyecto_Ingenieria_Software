package edu.unah.hn.projecto_ingenieria.Events;

import org.springframework.context.ApplicationEvent;

import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import lombok.Getter;

@Getter
public class TarjetaCreadaEvent extends ApplicationEvent {
    private final Tarjeta tarjeta;
    private final Proyecto proyecto;

    public TarjetaCreadaEvent(Object source, Tarjeta tarjeta, Proyecto proyecto) {
        super(source);
        this.tarjeta = tarjeta;
        this.proyecto = proyecto;
    }
}
