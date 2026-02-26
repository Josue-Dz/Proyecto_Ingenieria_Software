package edu.unah.hn.projecto_ingenieria.Services;

import org.springframework.beans.factory.annotation.Autowired;
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

public class ProyectoService {
    
    @Autowired
    private ProyectoRepository proyectoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProyectoUsuarioRepository proyectoUsuarioRepository;

    @Transactional
    public ProyectoResponseDTO crearProyecto(ProyectoRequestDTO dto) {
        Usuario creador = getUsuarioAutenticado();

        // 1. Creacion de proyecto y asignacion del creador
        Proyecto proyecto = new Proyecto();
        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());
        proyecto.setCreador(creador); // Usamos el usuario autenticado como creador del proyecto
        
        Proyecto savedProyecto = proyectoRepository.save(proyecto);

        // 2. Usuario creador se asigna automaticamente como ADMIN del proyecto
        ProyectoUsuario nuevoUsuarioProyecto = new ProyectoUsuario();
        nuevoUsuarioProyecto.setUsuario(creador);
        nuevoUsuarioProyecto.setProyecto(savedProyecto);
        nuevoUsuarioProyecto.setRol(ProyectoUsuario.role.ADMIN);
        proyectoUsuarioRepository.save(nuevoUsuarioProyecto);

        return mapToDTO(savedProyecto);
    }

    // --- Busca un proyecto por ID ---
    public ProyectoResponseDTO obtenerProyectoPorId(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        return mapToDTO(proyecto); // Simplified for example
    }

    // --- Actualiza la informacion del proyecto ---
    @Transactional
    public ProyectoResponseDTO actualizarProyecto(Long id, ProyectoRequestDTO dto) {
        Usuario usuario = getUsuarioAutenticado();
        Proyecto proyecto = proyectoRepository.findById(id).orElseThrow();

        // Verficacion: Solo el creador del proyecto puede actualizarlo
        if (!proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("No tienes permiso para actualizar este proyecto");
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
        Proyecto proyecto = proyectoRepository.findById(id).orElseThrow();

        // Verificacion de usurio: Solo el creador del proyecto puede eliminarlo
        if (!proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Solo el creador puede eliminar este proyecto");
        }

        // Borramos tambien las relaciones en la tabla intermedia para evitar problemas de integridad referencial
        proyectoUsuarioRepository.deleteByProyecto_IdProyecto(id);
        
        // Finalmente borramos el proyecto
        proyectoRepository.delete(proyecto);
    }

    // --- Autenticacion de usuario usando el token ---
    private Usuario getUsuarioAutenticado() {
        String correo = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    // --- Mapeo de entidad a DTO ---
    private ProyectoResponseDTO mapToDTO(Proyecto p) {
        return new ProyectoResponseDTO(
            p.getIdProyecto(), p.getNombreProyecto(), p.getDescripcion(), 
            p.getFechaInicio(), p.getFechaFin()
        );
    }
}
