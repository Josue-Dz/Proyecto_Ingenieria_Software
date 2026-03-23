package edu.unah.hn.projecto_ingenieria.Events;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class TarjetaMovidaEvent extends ApplicationEvent {

    private final Tarjeta tarjeta;
    private final Columna columnaAntigua;
    private final Columna columnaNueva;

    public TarjetaMovidaEvent(Object source, Tarjeta tarjeta, Columna columnaAntigua, Columna columnaNueva) {
        super(source);
        this.tarjeta = tarjeta;
        this.columnaAntigua = columnaAntigua;
        this.columnaNueva = columnaNueva;
    }
}