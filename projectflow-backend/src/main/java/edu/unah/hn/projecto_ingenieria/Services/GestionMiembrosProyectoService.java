package edu.unah.hn.projecto_ingenieria.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.CambiarRolRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.InvitarMiembroRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.MiembroResponseDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario.role;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GestionMiembrosProyectoService {


    private final ProyectoRepository proyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProyectoUsuarioRepository proyectoUsuarioRepository;

    @Transactional(readOnly = true)
public List<MiembroResponseDTO> listarMiembrosProyecto(Long idProyecto) {
    Usuario usuario = getUsuarioAutenticado();

    // Verificar acceso
    boolean tieneAcceso = proyectoUsuarioRepository
        .findByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, usuario.getIdUsuario())
        .isPresent();

    if (!tieneAcceso)
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes acceso a este proyecto");

    // Listar miembros
    return proyectoUsuarioRepository.findByProyecto_IdProyecto(idProyecto)
        .stream()
        .map(proyectoUsuario -> new MiembroResponseDTO(
            proyectoUsuario.getUsuario().getIdUsuario(),
            proyectoUsuario.getUsuario().getNombre(),
            proyectoUsuario.getUsuario().getApellido(),
            proyectoUsuario.getUsuario().getCorreo(),
            proyectoUsuario.getUsuario().obtenerInicialesDeNombre(
                proyectoUsuario.getUsuario().getNombre(),
                proyectoUsuario.getUsuario().getApellido()
            ),
            proyectoUsuario.getRol().name()
        ))
        .collect(Collectors.toList());
}


//Invitar miembro

@Transactional
public MiembroResponseDTO invitarMiembro(Long idProyecto, InvitarMiembroRequestDTO invitacionDTO) {
    Usuario usuario = getUsuarioAutenticado();

    Proyecto proyecto = proyectoRepository.findById(idProyecto)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

    validarEsAdminOCreador(usuario, proyecto, idProyecto);

    Usuario nuevoMiembro = usuarioRepository.findByCorreo(invitacionDTO.getCorreo())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe un usuario con ese correo"));

    boolean yaEsMiembro = proyectoUsuarioRepository
     .existsByUsuarioAndProyecto(nuevoMiembro.getIdUsuario(), idProyecto);

    if (yaEsMiembro)
      throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya es miembro de este proyecto");

    role rolAsignado;
    try {
        rolAsignado = ProyectoUsuario.role.valueOf(invitacionDTO.getRol().toUpperCase());
    } catch (IllegalArgumentException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rol inválido. Usa: ADMIN, COLABORADOR o LECTOR");
    }

    ProyectoUsuario proyectoUsuario = new ProyectoUsuario();
    proyectoUsuario.setUsuario(nuevoMiembro);
    proyectoUsuario.setProyecto(proyecto);
    proyectoUsuario.setRol(rolAsignado);
    proyectoUsuarioRepository.save(proyectoUsuario);

    return new MiembroResponseDTO(
        nuevoMiembro.getIdUsuario(),
        nuevoMiembro.getNombre(),
        nuevoMiembro.getApellido(),
        nuevoMiembro.getCorreo(),
        nuevoMiembro.obtenerInicialesDeNombre(nuevoMiembro.getNombre(), nuevoMiembro.getApellido()),
        rolAsignado.name()
    );
}


 @Transactional
public MiembroResponseDTO cambiarRolMiembro(Long idProyecto, Long idUsuario, CambiarRolRequestDTO cambioRolDTO) {
    Usuario solicitante = getUsuarioAutenticado();

    Proyecto proyecto = proyectoRepository.findById(idProyecto)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

    validarEsAdminOCreador(solicitante, proyecto, idProyecto);

    if (solicitante.getIdUsuario().equals(idUsuario)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No puedes cambiar tu propio rol");
    }

    ProyectoUsuario proyectoUsuario = proyectoUsuarioRepository
        .findByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, idUsuario)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no es miembro de este proyecto"));

    role nuevoRol;
    try {
        nuevoRol = ProyectoUsuario.role.valueOf(cambioRolDTO.getRol().toUpperCase());
    } catch (IllegalArgumentException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rol inválido. Usa: ADMIN, COLABORADOR o LECTOR");
    }

    proyectoUsuario.setRol(nuevoRol);
    proyectoUsuarioRepository.save(proyectoUsuario);

    Usuario miembro = proyectoUsuario.getUsuario();
    return new MiembroResponseDTO(
        miembro.getIdUsuario(),
        miembro.getNombre(),
        miembro.getApellido(),
        miembro.getCorreo(),
        miembro.obtenerInicialesDeNombre(miembro.getNombre(), miembro.getApellido()),
        nuevoRol.name()
    );
}

//eliminar miembro
@Transactional
public void eliminarMiembro(Long idProyecto, Long idUsuario) {
    Usuario solicitante = getUsuarioAutenticado();

    Proyecto proyecto = proyectoRepository.findById(idProyecto)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

    validarEsAdminOCreador(solicitante, proyecto, idProyecto);

    if(solicitante.getIdUsuario().equals(idUsuario)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No puedes eliminarte a ti mismo del proyecto");
    }

    ProyectoUsuario proyectoUsuario = proyectoUsuarioRepository
        .findByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, idUsuario)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no es miembro de este proyecto"));

    proyectoUsuarioRepository.delete(proyectoUsuario);
}


//metodos de validacion y utilitarios
private void validarEsAdminOCreador(Usuario usuario, Proyecto proyecto, Long idProyecto) {
        boolean esCreador = proyecto.getCreador() != null &&
            proyecto.getCreador().getIdUsuario().equals(usuario.getIdUsuario());

        boolean esAdmin = proyectoUsuarioRepository
            .findByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, usuario.getIdUsuario())
            .map(proyectoUsuario -> proyectoUsuario.getRol() == ProyectoUsuario.role.ADMIN)
            .orElse(false);

        if (!esCreador && !esAdmin)
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo un admin o el creador puede gestionar miembros");
    }


private Usuario getUsuarioAutenticado() {
        Usuario usuarioPrincipal = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return usuarioRepository.findByCorreo(usuarioPrincipal.getCorreo())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));
 
        }
        
    }

