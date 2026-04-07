package edu.unah.hn.projecto_ingenieria.Services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.DTO.HistorialActividadDTO;
import edu.unah.hn.projecto_ingenieria.Entity.HistorialActividad;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.HistorialActividadRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HistorialActividadService {

    private final HistorialActividadRepository historialRepo;
    private final ProyectoUsuarioRepository proyectoUsuarioRepo;
    private final UsuarioRepository usuarioRepository;
    private final DTOMapper mapper;

    //Llamado desde el Listener 

    public void registrar(Usuario usuario, Proyecto proyecto, Tablero tablero,
                          Tarjeta tarjeta, String tipo, String mensaje) {
        HistorialActividad historial = new HistorialActividad();
        historial.setUsuario(usuario);
        historial.setProyecto(proyecto);
        historial.setTablero(tablero);
        historial.setTarjeta(tarjeta);
        historial.setTipo(tipo);
        historial.setMensaje(mensaje);
        historialRepo.save(historial);
    }

    //Consulta por proyecto (para la pestaña Actividad)

    public List<HistorialActividadDTO> obtenerPorProyecto(Long idProyecto) {
        validarAcceso(idProyecto);
        return historialRepo.findByProyectoOrderByFechaDesc(idProyecto)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    //Validar que el usuario tiene rol permitido

    private void validarAcceso(Long idProyecto) {
        Usuario usuario = getUsuarioAutenticado();
        boolean tieneAcceso = proyectoUsuarioRepo
                .findByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, usuario.getIdUsuario())
                .map(pu -> List.of("ADMIN", "COLABORADOR", "LECTOR")
                        .contains(pu.getRol().name()))
                .orElse(false);

        if (!tieneAcceso) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "No tienes permisos para ver el historial de este proyecto");
        }
}

  private Usuario getUsuarioAutenticado() {
            Usuario principal = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return usuarioRepository.findByCorreo(principal.getCorreo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));
        }

}