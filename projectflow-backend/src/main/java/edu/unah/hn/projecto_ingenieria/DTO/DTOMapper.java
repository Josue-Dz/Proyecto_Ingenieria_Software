package edu.unah.hn.projecto_ingenieria.DTO;

import java.util.List;
import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;

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
            p.getFechaFin()
        );
    }

    public TableroDTO toTableroDTO(Tablero tablero) {
        if (tablero == null) {
            return null;
        }
        TableroDTO dto = new TableroDTO();
        dto.setIdTablero(tablero.getIdTablero());
        dto.setIdProyecto(tablero.getProyecto().getIdProyecto());
        dto.setNombreProyecto(tablero.getProyecto().getNombreProyecto());
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
        dto.setAsignados(
                tarjeta.getAsignados() == null ? List.of() :
                        tarjeta.getAsignados()
                                .stream()
                                .map(u -> u.getNombre() + " " + u.getApellido())
                                .toList()
        );
        return dto;
    }
    public TarjetaRequestDTO toTarjetaRequestDTO(Tarjeta tarjeta) {
        if (tarjeta == null) {
            return null;
        }
        TarjetaRequestDTO dto = new TarjetaRequestDTO();
        dto.setTitulo(tarjeta.getTitulo());
        dto.setDescripcion(tarjeta.getDescripcion());
        dto.setFechaLimite(tarjeta.getFechaLimite());
        dto.setPrioridad(tarjeta.getPrioridad().name());
        return dto;
    }

    public ColumnaDTO toColumnaDTO(Columna columna, Long idTablero, List<TarjetaResponseDTO> tarjetas) {
        if (columna == null) {
            return null;
        }
        ColumnaDTO dto = new ColumnaDTO();
        dto.setNombreColumna(columna.getNombreColumna());
        dto.setPosicion(columna.getPosicion());
        dto.setIdTablero(idTablero);
        dto.setTarjetas(tarjetas);
        return dto;
    }
    // future mappers can be added here in the same centralized location
}
