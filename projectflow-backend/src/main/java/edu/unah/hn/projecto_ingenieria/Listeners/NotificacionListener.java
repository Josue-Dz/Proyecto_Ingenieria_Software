package edu.unah.hn.projecto_ingenieria.Listeners;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaAsignadaEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaFechaCambioEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaMovidaEvent;
import edu.unah.hn.projecto_ingenieria.Repository.NotificacionRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificacionListener {

    private final NotificacionRepository notificacionRepository;

    @EventListener
    public void handleTarjetaAsignada(TarjetaAsignadaEvent event) {
        Tarjeta tarjeta = event.getTarjeta();
        List<Usuario> usuarios = event.getUsuariosAsignados();

        for (Usuario usuario : usuarios) {
            Notificacion notificacion = new Notificacion();
            notificacion.setMensaje("Has sido asignado a la tarjeta: " + tarjeta.getTitulo());
            notificacion.setTipo("ASIGNACION");
            notificacion.setFechaCreacion(LocalDateTime.now());
            notificacion.setUsuario(usuario);
            notificacion.setTarjeta(tarjeta);
            notificacionRepository.save(notificacion);
        }
    }

    @EventListener
    public void handleTarjetaMovida(TarjetaMovidaEvent event) {
        Tarjeta tarjeta = event.getTarjeta();
        String columnaAntigua = event.getColumnaAntigua().getNombreColumna();
        String columnaNueva = event.getColumnaNueva().getNombreColumna();

        List<Usuario> usuarios = tarjeta.getAsignados();
        if (usuarios != null) {
            for (Usuario usuario : usuarios) {
                Notificacion notificacion = new Notificacion();
                notificacion.setMensaje("La tarjeta '" + tarjeta.getTitulo() + "' se movió de '" + columnaAntigua + "' a '" + columnaNueva + "'");
                notificacion.setTipo("MOVIMIENTO");
                notificacion.setFechaCreacion(LocalDateTime.now());
                notificacion.setUsuario(usuario);
                notificacion.setTarjeta(tarjeta);
                notificacionRepository.save(notificacion);
            }
        }
    }

    @EventListener
    public void handleTarjetaFechaCambio(TarjetaFechaCambioEvent event) {
        Tarjeta tarjeta = event.getTarjeta();
        LocalDate fechaAntigua = event.getFechaAntigua();
        LocalDate fechaNueva = event.getFechaNueva();

        List<Usuario> usuarios = tarjeta.getAsignados();
        if (usuarios != null) {
            for (Usuario usuario : usuarios) {
                Notificacion notificacion = new Notificacion();
                notificacion.setMensaje("La fecha límite de la tarjeta '" + tarjeta.getTitulo() + "' cambió de " + fechaAntigua + " a " + fechaNueva);
                notificacion.setTipo("FECHA_CAMBIO");
                notificacion.setFechaCreacion(LocalDateTime.now());
                notificacion.setUsuario(usuario);
                notificacion.setTarjeta(tarjeta);
                notificacionRepository.save(notificacion);
            }
        }
    }
}