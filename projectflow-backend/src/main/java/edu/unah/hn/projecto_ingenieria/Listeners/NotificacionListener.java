package edu.unah.hn.projecto_ingenieria.Listeners;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Events.ColumnaCreadaEvent;
import edu.unah.hn.projecto_ingenieria.Events.ColumnaEliminadaEvent;
import edu.unah.hn.projecto_ingenieria.Events.MiembroAgregadoEvent;
import edu.unah.hn.projecto_ingenieria.Events.RolCambiadoEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaAsignadaEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaCreadaEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaEliminadaEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaFechaCambioEvent;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaMovidaEvent;
import edu.unah.hn.projecto_ingenieria.Repository.NotificacionRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificacionListener {

    private final NotificacionRepository notificacionRepository;

    private final ProyectoUsuarioRepository proyectoUsuarioRepository;

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

            @EventListener
        public void handleColumnaCreada(ColumnaCreadaEvent event) {
            Proyecto proyecto = event.getProyecto();
            Columna columna = event.getColumna();
            String mensaje = "Se creó la columna '" + columna.getNombreColumna() + "' en el proyecto " + proyecto.getNombreProyecto();
            notificarATodosLosMiembros(proyecto, mensaje, "COLUMNA_CREADA");
        }

        @EventListener
        public void handleColumnaEliminada(ColumnaEliminadaEvent event) {
            Proyecto proyecto = event.getProyecto();
            Columna columna = event.getColumna();
            String mensaje = "Se eliminó la columna '" + columna.getNombreColumna() + "' en el proyecto " + proyecto.getNombreProyecto();
            notificarATodosLosMiembros(proyecto, mensaje, "COLUMNA_ELIMINADA");
        }

        @EventListener
        public void handleTarjetaCreada(TarjetaCreadaEvent event) {
            Proyecto proyecto = event.getProyecto();
            Tarjeta tarjeta = event.getTarjeta();
            String mensaje = "Se creó la tarjeta '" + tarjeta.getTitulo() + "' en el proyecto " + proyecto.getNombreProyecto();
            notificarATodosLosMiembros(proyecto, mensaje, "TARJETA_CREADA");
        }

        @EventListener
        public void handleTarjetaEliminada(TarjetaEliminadaEvent event) {
            Proyecto proyecto = event.getProyecto();
            Tarjeta tarjeta = event.getTarjeta();
            String mensaje = "La tarjeta '" + tarjeta.getTitulo() + "' fue eliminada en el proyecto " + proyecto.getNombreProyecto();
            notificarATodosLosMiembros(proyecto, mensaje, "TARJETA_ELIMINADA");
        }

        @EventListener
        public void handleMiembroAgregado(MiembroAgregadoEvent event) {
            Proyecto proyecto = event.getProyecto();
            Usuario usuario = event.getUsuario();
            String mensaje = "El usuario " + usuario.getNombre() + " " + usuario.getApellido() + " fue agregado al proyecto " + proyecto.getNombreProyecto();
            notificarATodosLosMiembros(proyecto, mensaje, "MIEMBRO_AGREGADO");
        }

        @EventListener
        public void handleRolCambiado(RolCambiadoEvent event) {
            Proyecto proyecto = event.getProyecto();
            Usuario usuario = event.getUsuario();
            String mensaje = "El rol del usuario " + usuario.getNombre() + " " + usuario.getApellido() +
                            " cambió de " + event.getRolAnterior() + " a " + event.getRolNuevo() +
                            " en el proyecto " + proyecto.getNombreProyecto();
            notificarATodosLosMiembros(proyecto, mensaje, "ROL_CAMBIADO");
        }

    private void notificarATodosLosMiembros(Proyecto proyecto, String mensaje, String tipo) {

    List<ProyectoUsuario> miembros = proyectoUsuarioRepository.findByProyecto_IdProyecto(proyecto.getIdProyecto());

    for (ProyectoUsuario pu : miembros) {
        Usuario usuario = pu.getUsuario();
        Notificacion notificacion = new Notificacion();
        notificacion.setMensaje(mensaje);
        notificacion.setTipo(tipo);
        notificacion.setFechaCreacion(LocalDateTime.now());
        notificacion.setUsuario(usuario);
        notificacionRepository.save(notificacion);
    }
}

}