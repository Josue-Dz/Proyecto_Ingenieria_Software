
package edu.unah.hn.projecto_ingenieria.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.context.SecurityContextHolder;

import edu.unah.hn.projecto_ingenieria.DTO.ProyectoRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.ProyectoResponseDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProyectoService {
    private final ProyectoRepository proyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProyectoUsuarioRepository proyectoUsuarioRepository;

    @Transactional
    public ProyectoResponseDTO crearProyecto(ProyectoRequestDTO dto) {
        Usuario creador = getUsuarioAutenticado();

        if (dto.getFechaInicio() != null && dto.getFechaFin() != null && dto.getFechaInicio().isAfter(dto.getFechaFin())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de inicio debe ser anterior a la fecha de fin");
        }

        Proyecto proyecto = new Proyecto();
        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());
        proyecto.setCreador(creador);

        Proyecto savedProyecto = proyectoRepository.save(proyecto);

        ProyectoUsuario nuevoUsuarioProyecto = new ProyectoUsuario();
        nuevoUsuarioProyecto.setUsuario(creador);
        nuevoUsuarioProyecto.setProyecto(savedProyecto);
        nuevoUsuarioProyecto.setRol(ProyectoUsuario.role.ADMIN);
        proyectoUsuarioRepository.save(nuevoUsuarioProyecto);

        return mapToDTO(savedProyecto);
    }

    // --- Busca un proyecto por ID sólo si el usuario tiene acceso ---
    @Transactional(Transactional.TxType.REQUIRED)
    public ProyectoResponseDTO obtenerProyectoPorId(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        Usuario usuario = getUsuarioAutenticado();

        boolean esCreador = proyecto.getCreador() != null && proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario());
        boolean miembro = proyectoUsuarioRepository.findByProyecto_IdProyectoAndUsuario_IdUsuario(id, usuario.getIdUsuario()).isPresent();

        if (!esCreador && !miembro) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes acceso a este proyecto");
        }

        return mapToDTO(proyecto);
    }

    // --- Actualiza la informacion del proyecto ---
    @Transactional
    public ProyectoResponseDTO actualizarProyecto(Long id, ProyectoRequestDTO dto) {
        Usuario usuario = getUsuarioAutenticado();
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        boolean esCreador = proyecto.getCreador() != null && proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario());
        boolean esAdmin = proyectoUsuarioRepository
                .findByProyecto_IdProyectoAndUsuario_IdUsuario(id, usuario.getIdUsuario())
                .map(pu -> pu.getRol() == ProyectoUsuario.role.ADMIN)
                .orElse(false);

        if (!esCreador && !esAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permiso para actualizar este proyecto");
        }

        if (dto.getFechaInicio() != null && dto.getFechaFin() != null && dto.getFechaInicio().isAfter(dto.getFechaFin())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La fecha de inicio debe ser anterior a la fecha de fin");
        }

        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());

        return mapToDTO(proyectoRepository.save(proyecto));
    }

    // --- Borrar un proyecto usando el id del proyecto---
    @Transactional
    public void eliminarProyecto(Long id) {
        Usuario usuario = getUsuarioAutenticado();
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        boolean esCreador = proyecto.getCreador() != null && proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario());
        boolean esAdmin = proyectoUsuarioRepository
                .findByProyecto_IdProyectoAndUsuario_IdUsuario(id, usuario.getIdUsuario())
                .map(pu -> pu.getRol() == ProyectoUsuario.role.ADMIN)
                .orElse(false);

        if (!esCreador && !esAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el creador o un admin del proyecto puede eliminarlo");
        }

        proyectoUsuarioRepository.deleteByProyecto_IdProyecto(id);
        proyectoRepository.delete(proyecto);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public List<ProyectoResponseDTO> obtenerProyectosPorUsuario() {
        Usuario usuario = getUsuarioAutenticado();
        List<ProyectoUsuario> proyectosUsuario = proyectoUsuarioRepository.findByUsuario_IdUsuario(usuario.getIdUsuario());

        return proyectosUsuario.stream()
            .map(pu -> mapToDTO(pu.getProyecto()))
            .collect(Collectors.toList());
    }

    // --- Autenticacion de usuario usando el token ---
    private Usuario getUsuarioAutenticado() {
        Usuario usuarioPrincipal = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return usuarioRepository.findByCorreo(usuarioPrincipal.getCorreo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));
    }

    // --- Mapeo de entidad a DTO ---
    private ProyectoResponseDTO mapToDTO(Proyecto p) {
        return new ProyectoResponseDTO(
            p.getIdProyecto(), p.getNombreProyecto(), p.getDescripcion(), 
            p.getFechaInicio(), p.getFechaFin()
        );
    }
}
