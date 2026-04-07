package edu.unah.hn.projecto_ingenieria.Events;

import org.springframework.context.ApplicationEvent;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import lombok.Getter;

@Getter
public class ColumnaCreadaEvent extends ApplicationEvent {
    private final Columna columna;
    private final Proyecto proyecto;
    private final Usuario usuarioAccion;
    
    public ColumnaCreadaEvent(Object source, Columna columna, Proyecto proyecto, Usuario usuarioAccion) {
        super(source);
        this.columna = columna;
        this.proyecto = proyecto;
        this.usuarioAccion = usuarioAccion;
    }
}
