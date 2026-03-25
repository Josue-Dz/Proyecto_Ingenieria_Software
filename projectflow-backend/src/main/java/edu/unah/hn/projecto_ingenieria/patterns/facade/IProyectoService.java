package edu.unah.hn.projecto_ingenieria.patterns.facade;

import java.util.List;

import edu.unah.hn.projecto_ingenieria.DTO.ProyectoRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.ProyectoResponseDTO;

/**
 * Fachada para la gestión de proyectos
 */
public interface IProyectoService {

    ProyectoResponseDTO crearProyecto(ProyectoRequestDTO proyecto);

    ProyectoResponseDTO obtenerProyectoPorId(Long id);

    ProyectoResponseDTO actualizarProyecto(Long id, ProyectoRequestDTO proyecto);

    void eliminarProyecto(Long id);

    List<ProyectoResponseDTO> obtenerProyectosPorUsuario();
}
