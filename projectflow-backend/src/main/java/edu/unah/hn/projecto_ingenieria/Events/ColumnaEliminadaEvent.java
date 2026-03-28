package edu.unah.hn.projecto_ingenieria.Events;

import org.springframework.context.ApplicationEvent;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import lombok.Getter;

@Getter
public class ColumnaEliminadaEvent extends ApplicationEvent {
    private final Columna columna;
    private final Proyecto proyecto;

    public ColumnaEliminadaEvent(Object source, Columna columna, Proyecto proyecto) {
        super(source);
        this.columna = columna;
        this.proyecto = proyecto;
    }
}
