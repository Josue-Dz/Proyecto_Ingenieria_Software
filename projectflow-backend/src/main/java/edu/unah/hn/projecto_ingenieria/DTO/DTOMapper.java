package edu.unah.hn.projecto_ingenieria.DTO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;

/**
 * Utility component responsible for converting entity objects into their
 * corresponding Data Transfer Objects. Extracting this logic keeps services
 * focused on business rules and enables reuse across the application.
 */
@Component
public class DTOMapper {

    public ProyectoResponseDTO toProyectoDTO(Proyecto p) {
        if (p == null) {
            return null;
        }
        return new ProyectoResponseDTO(
                p.getIdProyecto(),
                p.getNombreProyecto(),
                p.getDescripcion(),
                p.getFechaInicio(),
                p.getFechaFin());
    }

    public TableroRequestDTO toTableroDTO(Tablero tablero) {
        if (tablero == null) {
            return null;
        }
        TableroRequestDTO dto = new TableroRequestDTO();
        dto.setIdTablero(tablero.getIdTablero());
        dto.setIdProyecto(tablero.getProyecto().getIdProyecto());
        dto.setNombre(tablero.getProyecto().getNombreProyecto());
        dto.setDescripcion(tablero.getProyecto().getDescripcion());
        return dto;
    }

    public TarjetaResponseDTO toTarjetaDTO(Tarjeta tarjeta) {
        if (tarjeta == null) {
            return null;
        }
        TarjetaResponseDTO dto = new TarjetaResponseDTO();
        dto.setIdTarjeta(tarjeta.getIdTarjeta());
        dto.setTitulo(tarjeta.getTitulo());
        dto.setDescripcion(tarjeta.getDescripcion());
        dto.setFechaCreacion(tarjeta.getFechaCreacion());
        dto.setFechaLimite(tarjeta.getFechaLimite());
        dto.setPrioridad(tarjeta.getPrioridad());
        dto.setEstado(tarjeta.getEstado());
        dto.setAsignados(toListUsuarioDTO(tarjeta));
        return dto;
    }

    private List<UsuarioDTO> toListUsuarioDTO(Tarjeta tarjeta) {
        List<UsuarioDTO> usuariosAsignados = new ArrayList<>();

        if (tarjeta.getAsignados() != null && !tarjeta.getAsignados().isEmpty()) {
            for (Usuario usuario : tarjeta.getAsignados()) {
                UsuarioDTO usuarioDTO = new UsuarioDTO();
                usuarioDTO.setNombreCompleto(usuario.getNombre() + " " + usuario.getApellido());
                usuarioDTO.setCorreo(usuario.getCorreo());
                usuarioDTO.setIniciales(usuario.obtenerInicialesDeNombre(usuario.getNombre(), usuario.getApellido()));

                usuariosAsignados.add(usuarioDTO);
            }
        }

        return usuariosAsignados;
    }

    public TarjetaRequestDTO toTarjetaRequestDTO(Tarjeta tarjeta) {
        if (tarjeta == null) {
            return null;
        }
        TarjetaRequestDTO dto = new TarjetaRequestDTO();
        dto.setTitulo(tarjeta.getTitulo());
        dto.setDescripcion(tarjeta.getDescripcion());
        dto.setFechaLimite(tarjeta.getFechaLimite());
        dto.setPrioridad(tarjeta.getPrioridad());
        return dto;
    }

    public TarjetaResponseDTO toTarjetaResponseDTO(Tarjeta tarjeta) {
        if (tarjeta == null) {
            return null;
        }
        TarjetaResponseDTO dto = new TarjetaResponseDTO();
        dto.setIdTarjeta(tarjeta.getIdTarjeta());
        dto.setTitulo(tarjeta.getTitulo());
        dto.setDescripcion(tarjeta.getDescripcion());
        dto.setFechaLimite(tarjeta.getFechaLimite());
        dto.setPrioridad(tarjeta.getPrioridad());
        dto.setEstado(tarjeta.getEstado());
        dto.setAsignados(toListUsuarioDTO(tarjeta));

        return dto;
    }

    public ColumnaDTO toColumnaDTO(Columna columna, Long idTablero, List<TarjetaResponseDTO> tarjetas) {
        if (columna == null) {
            return null;
        }
        ColumnaDTO dto = new ColumnaDTO();
        dto.setIdColumna(columna.getIdColumna());
        dto.setNombreColumna(columna.getNombreColumna());
        dto.setPosicion(columna.getPosicion());
        dto.setIdTablero(idTablero);
        dto.setTarjetas(tarjetas);
        return dto;
    }
    
    public UsuarioDTO toUsuarioDTO(Usuario usuario){
        UsuarioDTO dto = new UsuarioDTO();

        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setCorreo(usuario.getCorreo());
        dto.setNombreCompleto(usuario.getNombre() + " " + usuario.getApellido());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setIniciales(usuario.obtenerInicialesDeNombre(usuario.getNombre(), usuario.getApellido()));

        return dto; 
    }

    public NotificacionDTO toNotificacionDTO(Notificacion nuevaNotificacion) {

        NotificacionDTO dto = new NotificacionDTO();

        dto.setIdNotificacion(nuevaNotificacion.getIdNotificacion());
        dto.setMensaje(nuevaNotificacion.getMensaje());
        dto.setTipo(nuevaNotificacion.getTipo());
        dto.setFechaCreacion(nuevaNotificacion.getFechaCreacion());
        dto.setLeida(nuevaNotificacion.getLeida());

        if (nuevaNotificacion.getTarjeta() != null) {
            dto.setIdTarjeta(nuevaNotificacion.getTarjeta().getIdTarjeta());
        } else {
            dto.setIdTarjeta(null);
        }

        return dto;
    }
}


