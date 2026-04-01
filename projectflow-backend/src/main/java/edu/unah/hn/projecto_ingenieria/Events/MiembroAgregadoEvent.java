package edu.unah.hn.projecto_ingenieria.Events;

import org.springframework.context.ApplicationEvent;

import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import lombok.Getter;

@Getter
public class MiembroAgregadoEvent extends ApplicationEvent {
    private final Proyecto proyecto;
    private final Usuario usuario;

    public MiembroAgregadoEvent(Object source, Proyecto proyecto, Usuario usuario) {
        super(source);
        this.proyecto = proyecto;
        this.usuario = usuario;
    }
}

