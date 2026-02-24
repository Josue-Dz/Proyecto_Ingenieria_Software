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

        // 1. Create and save the project
        Proyecto proyecto = new Proyecto();
        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());
        proyecto.setCreador(creador); // Auto-assign creator
        
        Proyecto savedProyecto = proyectoRepository.save(proyecto);

        // 2. Link the user to the project as an ADMIN (Owner)
        ProyectoUsuario pu = new ProyectoUsuario();
        pu.setUsuario(creador);
        pu.setProyecto(savedProyecto);
        pu.setRol(ProyectoUsuario.role.ADMIN);
        proyectoUsuarioRepository.save(pu);

        return mapToDTO(savedProyecto);
    }

    // --- READ (Get One) ---
    public ProyectoResponseDTO obtenerProyectoPorId(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        return mapToDTO(proyecto); // Simplified for example
    }

    // --- UPDATE ---
    @Transactional
    public ProyectoResponseDTO actualizarProyecto(Long id, ProyectoRequestDTO dto) {
        Usuario usuario = getUsuarioAutenticado();
        Proyecto proyecto = proyectoRepository.findById(id).orElseThrow();

        // Optional: Verify if the user is the creator before allowing update
        if (!proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("No tienes permiso para actualizar este proyecto");
        }

        proyecto.setNombreProyecto(dto.getNombreProyecto());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setFechaInicio(dto.getFechaInicio());
        proyecto.setFechaFin(dto.getFechaFin());
        
        return mapToDTO(proyectoRepository.save(proyecto));
    }

    // --- DELETE ---
    @Transactional
    public void eliminarProyecto(Long id) {
        Usuario usuario = getUsuarioAutenticado();
        Proyecto proyecto = proyectoRepository.findById(id).orElseThrow();

        // Verify if the user is the creator before deleting
        if (!proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("Solo el creador puede eliminar este proyecto");
        }

        // Delete all bridging records in tbl_proyecto_x_usuarios first to avoid foreign key errors
        proyectoUsuarioRepository.deleteByProyecto_IdProyecto(id); // Ensure this method exists in your repository!
        
        // Delete the project
        proyectoRepository.delete(proyecto);
    }

    // --- Helpers ---
    private Usuario getUsuarioAutenticado() {
        String correo = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    private ProyectoResponseDTO mapToDTO(Proyecto p) {
        return new ProyectoResponseDTO(
            p.getIdProyecto(), p.getNombreProyecto(), p.getDescripcion(), 
            p.getFechaInicio(), p.getFechaFin()
        );
    }
}
