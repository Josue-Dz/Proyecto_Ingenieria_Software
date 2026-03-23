package edu.unah.hn.projecto_ingenieria.Events;

import java.util.List;

import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class TarjetaAsignadaEvent extends ApplicationEvent {

    private final Tarjeta tarjeta;
    private final List<Usuario> usuariosAsignados;

    public TarjetaAsignadaEvent(Object source, Tarjeta tarjeta, List<Usuario> usuariosAsignados) {
        super(source);
        this.tarjeta = tarjeta;
        this.usuariosAsignados = usuariosAsignados;
    }
}