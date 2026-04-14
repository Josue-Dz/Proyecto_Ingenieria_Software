package edu.unah.hn.projecto_ingenieria.Listeners;

import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
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
import edu.unah.hn.projecto_ingenieria.Services.HistorialActividadService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HistorialActividadListener {

    private final HistorialActividadService historialService;

    @EventListener
    public void handleTarjetaCreada(TarjetaCreadaEvent event) {
        Tarjeta t = event.getTarjeta();
        historialService.registrar(
            t.getCreador(), event.getProyecto(), null, t,
            "TARJETA_CREADA",
            t.getCreador().getNombre() + " creó la tarjeta '" + t.getTitulo() + "'"
        );
    }

    @EventListener
    public void handleTarjetaEliminada(TarjetaEliminadaEvent event) {
        Tarjeta t = event.getTarjeta();
        historialService.registrar(
            t.getCreador(), event.getProyecto(), null, t,
            "TARJETA_ELIMINADA",
            t.getCreador().getNombre() + " eliminó la tarjeta '" + t.getTitulo() + "'"
        );
    }

    @EventListener
    public void handleTarjetaMovida(TarjetaMovidaEvent event) {
        Tarjeta t = event.getTarjeta();
        String columnaOrigen = event.getColumnaAntigua().getNombreColumna();
        String columnaDestino = event.getColumnaNueva().getNombreColumna();
        Tablero tablero = event.getColumnaNueva().getTablero();
        Proyecto proyecto = event.getColumnaNueva().getProyecto();
         
        historialService.registrar(
            t.getCreador(), tablero != null ? tablero.getProyecto() : proyecto, tablero, t,
            "TARJETA_MOVIDA",
            t.getCreador().getNombre() + " movió '" + t.getTitulo()
                + "' de '" + columnaOrigen + "' a '" + columnaDestino + "'"
        );
    }

  @EventListener
public void handleColumnaCreada(ColumnaCreadaEvent event) {
    historialService.registrar(
        event.getUsuarioAccion(), event.getProyecto(), null, null,
        "COLUMNA_CREADA",
        event.getUsuarioAccion().getNombre() + " creó la columna '"
            + event.getColumna().getNombreColumna() + "'"
    );
}

    @EventListener
    public void handleColumnaEliminada(ColumnaEliminadaEvent event) {
        historialService.registrar(
            null, event.getProyecto(), null, null,
            "COLUMNA_ELIMINADA",
            "Se eliminó la columna '" + event.getColumna().getNombreColumna() + "'"
        );
    }

    @EventListener
    public void handleMiembroAgregado(MiembroAgregadoEvent event) {
        Usuario usuario = event.getUsuario();
        historialService.registrar(
            usuario, event.getProyecto(), null, null,
            "MIEMBRO_AGREGADO",
            usuario.getNombre() + " " + usuario.getApellido() + " fue agregado al proyecto"
        );
    }

    @EventListener
    public void handleRolCambiado(RolCambiadoEvent event) {
        Usuario usuario = event.getUsuario();
        historialService.registrar(
            usuario, event.getProyecto(), null, null,
            "ROL_CAMBIADO",
             "El rol de " + usuario.getNombre() + " cambió de "
                + event.getRolAnterior() + " a " + event.getRolNuevo()
        );
    }

    @EventListener
public void handleFechaCambio(TarjetaFechaCambioEvent event) {
    Tarjeta tarjeta = event.getTarjeta();

    Proyecto proyecto = obtenerProyecto(tarjeta);
    if (proyecto == null) return;

    Tablero tablero = obtenerTablero(tarjeta);
    Usuario usuarioAccion = tarjeta.getCreador();

    String fechaAntigua = event.getFechaAntigua() != null
            ? event.getFechaAntigua().toString() : "sin fecha";
    String fechaNueva = event.getFechaNueva() != null
            ? event.getFechaNueva().toString() : "sin fecha";

    historialService.registrar(
            usuarioAccion, proyecto, tablero, tarjeta,
            "FECHA_CAMBIO",
            usuarioAccion.getNombre() + " cambió la fecha límite de '"
                    + tarjeta.getTitulo() + "' de " + fechaAntigua + " a " + fechaNueva
    );
}

@EventListener
public void handleTarjetaAsignada(TarjetaAsignadaEvent event) {
    Tarjeta tarjeta = event.getTarjeta();

    Proyecto proyecto = obtenerProyecto(tarjeta);
    if (proyecto == null) return;

    Tablero tablero = obtenerTablero(tarjeta);
    Usuario usuarioAccion = tarjeta.getCreador();

    String asignados = event.getUsuariosAsignados().stream()
            .map(u -> u.getNombre() + " " + u.getApellido())
            .collect(Collectors.joining(", "));

    historialService.registrar(
            usuarioAccion, proyecto, tablero, tarjeta,
            "RESPONSABLE_ASIGNADO",
            usuarioAccion.getNombre() + " asignó '" + tarjeta.getTitulo() + "' a: " + asignados
    );
}

        private Proyecto obtenerProyecto(Tarjeta tarjeta) {
            if (tarjeta.getColumna() == null) return null;
            Tablero tablero = tarjeta.getColumna().getTablero();
            if (tablero != null) return tablero.getProyecto();
            return tarjeta.getColumna().getProyecto(); // backlog
        }

        private Tablero obtenerTablero(Tarjeta tarjeta) {
            if (tarjeta.getColumna() == null) return null;
            return tarjeta.getColumna().getTablero(); // null si es backlog
        }
}