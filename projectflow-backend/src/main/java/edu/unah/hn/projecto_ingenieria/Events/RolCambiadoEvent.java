package edu.unah.hn.projecto_ingenieria.Events;

import org.springframework.context.ApplicationEvent;

import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import lombok.Getter;

@Getter
public class RolCambiadoEvent extends ApplicationEvent {
    private final Proyecto proyecto;
    private final Usuario usuario;
    private final String rolAnterior;
    private final String rolNuevo;

    public RolCambiadoEvent(Object source, Proyecto proyecto, Usuario usuario, String rolAnterior, String rolNuevo) {
        super(source);
        this.proyecto = proyecto;
        this.usuario = usuario;
        this.rolAnterior = rolAnterior;
        this.rolNuevo = rolNuevo;
    }
}
