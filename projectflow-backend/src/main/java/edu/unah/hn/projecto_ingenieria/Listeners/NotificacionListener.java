package edu.unah.hn.projecto_ingenieria.Listeners;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.DTO.NotificacionDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
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

    private final SimpMessagingTemplate messagingTemplate;

    private final DTOMapper dtoMapper;

    
    @EventListener
    public void handleTarjetaMovida(TarjetaMovidaEvent event) {
        Tarjeta tarjeta = event.getTarjeta();
        String mensaje = "La tarjeta '" + tarjeta.getTitulo() + "' se movió de '"
                + event.getColumnaAntigua().getNombreColumna() + "' a '"
                + event.getColumnaNueva().getNombreColumna() + "'";

        if (tarjeta.getAsignados() != null) {
            for (Usuario usuario : tarjeta.getAsignados()) {
                Notificacion notificacion = construir(usuario, mensaje, "MOVIMIENTO", tarjeta);
                notificacionRepository.save(notificacion);
                enviarAlUsuario(usuario, notificacion);
            }
        }
    }

            @EventListener
    public void handleColumnaCreada(ColumnaCreadaEvent event) {
        String mensaje = "Se creó la columna '" + event.getColumna().getNombreColumna()
                + "' en el proyecto " + event.getProyecto().getNombreProyecto();
        notificarATodosLosMiembros(event.getProyecto(), mensaje, "COLUMNA_CREADA");
    }

    @EventListener
    public void handleColumnaEliminada(ColumnaEliminadaEvent event) {
        String mensaje = "Se eliminó la columna '" + event.getColumna().getNombreColumna()
                + "' en el proyecto " + event.getProyecto().getNombreProyecto();
        notificarATodosLosMiembros(event.getProyecto(), mensaje, "COLUMNA_ELIMINADA");
    }

    @EventListener
    public void handleTarjetaCreada(TarjetaCreadaEvent event) {
        String mensaje = "Se creó la tarjeta '" + event.getTarjeta().getTitulo()
                + "' en el proyecto " + event.getProyecto().getNombreProyecto();
        notificarATodosLosMiembros(event.getProyecto(), mensaje, "TARJETA_CREADA");
    }

    @EventListener
    public void handleTarjetaEliminada(TarjetaEliminadaEvent event) {
        String mensaje = "La tarjeta '" + event.getTarjeta().getTitulo()
                + "' fue eliminada en el proyecto " + event.getProyecto().getNombreProyecto();
        notificarATodosLosMiembros(event.getProyecto(), mensaje, "TARJETA_ELIMINADA");
    }

    @EventListener
    public void handleMiembroAgregado(MiembroAgregadoEvent event) {
        Usuario u = event.getUsuario();
        String mensaje = "El usuario " + u.getNombre() + " " + u.getApellido()
                + " fue agregado al proyecto " + event.getProyecto().getNombreProyecto();
        notificarATodosLosMiembros(event.getProyecto(), mensaje, "MIEMBRO_AGREGADO");
    }

    @EventListener
    public void handleRolCambiado(RolCambiadoEvent event) {
        Usuario u = event.getUsuario();
        String mensaje = "El rol de " + u.getNombre() + " " + u.getApellido()
                + " cambió de " + event.getRolAnterior() + " a " + event.getRolNuevo()
                + " en el proyecto " + event.getProyecto().getNombreProyecto();
        notificarATodosLosMiembros(event.getProyecto(), mensaje, "ROL_CAMBIADO");
    }

    @EventListener
public void handleTarjetaFechaCambio(TarjetaFechaCambioEvent event) {
    Tarjeta tarjeta = event.getTarjeta();

    Proyecto proyecto = obtenerProyecto(tarjeta);
    if (proyecto == null) return;

    String fechaAntigua = event.getFechaAntigua() != null
            ? event.getFechaAntigua().toString() : "sin fecha";
    String fechaNueva = event.getFechaNueva() != null
            ? event.getFechaNueva().toString() : "sin fecha";

    String mensaje = "La fecha límite de '" + tarjeta.getTitulo()
            + "' cambió de " + fechaAntigua + " a " + fechaNueva;

    if (tarjeta.getAsignados() != null && !tarjeta.getAsignados().isEmpty()) {
        for (Usuario usuario : tarjeta.getAsignados()) {
            Notificacion notificacion = construir(usuario, mensaje, "FECHA_CAMBIO", tarjeta);
            notificacionRepository.save(notificacion);
            enviarAlUsuario(usuario, notificacion);
        }
    } else {
        notificarATodosLosMiembros(proyecto, mensaje, "FECHA_CAMBIO");
    }
}

@EventListener
public void handleTarjetaAsignada(TarjetaAsignadaEvent event) {
    Tarjeta tarjeta = event.getTarjeta();

    Proyecto proyecto = obtenerProyecto(tarjeta);
    if (proyecto == null) return;

    for (Usuario usuario : event.getUsuariosAsignados()) {
        Notificacion notificacion = construir(
                usuario,
                "Has sido asignado a la tarjeta: " + tarjeta.getTitulo(),
                "ASIGNACION",
                tarjeta
        );
        notificacionRepository.save(notificacion);
        enviarAlUsuario(usuario, notificacion);
    }
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
        enviarAlUsuario(usuario, notificacion);
    }
    
}

    private Notificacion construir(Usuario usuario, String mensaje, String tipo, Tarjeta tarjeta) {
        Notificacion n = new Notificacion();
        n.setMensaje(mensaje);
        n.setTipo(tipo);
        n.setFechaCreacion(LocalDateTime.now());
        n.setUsuario(usuario);
        n.setTarjeta(tarjeta);
        return n;
    }

    private void enviarAlUsuario(Usuario usuario, Notificacion notificacion) {
        NotificacionDTO dtoNotificacion = dtoMapper.toNotificacionDTO(notificacion);
        messagingTemplate.convertAndSendToUser(
                usuario.getCorreo(),
                "/queue/notificaciones",
                dtoNotificacion
        );
    }

    private Proyecto obtenerProyecto(Tarjeta tarjeta) {
    if (tarjeta.getColumna() == null) return null;
    Tablero tablero = tarjeta.getColumna().getTablero();
    if (tablero != null) return tablero.getProyecto();
    return tarjeta.getColumna().getProyecto(); // backlog
}

}