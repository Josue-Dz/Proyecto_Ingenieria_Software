package edu.unah.hn.projecto_ingenieria.Services;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.ColumnaDTO;
import edu.unah.hn.projecto_ingenieria.DTO.HistorialActividadDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TableroRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TableroResponseDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.NotificacionRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TableroRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import edu.unah.hn.projecto_ingenieria.patterns.factory.ColumnaFactory;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TableroService {

    private final ColumnaRepository columnaRepository;

    private final ProyectoRepository proyectoRepository;

    private final UsuarioRepository usuarioRepository;

    private final TableroRepository tableroRepository;

    private final ColumnaService columnaService;

    private final ColumnaFactory columnaFactory;

    private final NotificacionRepository notificacionRepository;

    private final ProyectoUsuarioRepository proyectoUsuarioRepository;

    private final AuthService authService;

    public TableroResponseDTO crearTablero(Long proyectoId, TableroRequestDTO tablero) {

        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        // Aquí creo el tablero
        Tablero tableroNuevo = new Tablero();
        tableroNuevo.setNombreTablero(tablero.getNombre());
        tableroNuevo.setProyecto(proyecto);
        tableroNuevo.setDescripcionTablero(tablero.getDescripcion());
        tableroNuevo.setFechaInicio(tablero.getFechaInicio());
        tableroNuevo.setFechaFin(tablero.getFechaFin());
        Tablero guardado = tableroRepository.save(tableroNuevo);

        List<Columna> columnas = columnaFactory.crearEstructuraInicial(guardado);

        guardado.setColumnas(columnaRepository.saveAll(columnas));

        tableroRepository.save(guardado);

        return mapToDTO(tableroNuevo);
    }

    public TableroResponseDTO obtenerTablero(Long idTablero) {

        // Obtener usuario autenticado
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String correo = auth.getName();

        Usuario usuario = usuarioRepository
                .findByCorreo(correo)
                .orElseThrow();

        Proyecto proyecto = proyectoRepository.findByTablero_IdTablero(idTablero).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado")
        );


        // obtener tablero
        Tablero tablero = tableroRepository.findByIdTablero(idTablero)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tablero no encontrado"));

        Long idProyecto = tablero.getProyecto().getIdProyecto();

        // Obtener columnas del tablero
        List<Columna> columnas = columnaRepository.findByTableroIdTableroOrderByPosicionAsc(tablero.getIdTablero());
        //Agregar el backlog al inicio de la lista de columnas del tablero
        columnas.add(0, proyecto.getBacklog());
                
        List<ColumnaDTO> columnasDTO = columnaService.mapToListDTO(columnas);

        // Crear DTO de tablero
        TableroResponseDTO tableroKanban = new TableroResponseDTO();

        tableroKanban.setIdTablero(idTablero);
        tableroKanban.setNombreTablero(tablero.getDescripcionTablero());
        tableroKanban.setDescripcionTablero(tablero.getDescripcionTablero());
        tableroKanban.setIdProyecto(idProyecto);
        tableroKanban.setColumnas(columnasDTO);
        tableroKanban.setFechaInicio(tablero.getFechaInicio());
        tableroKanban.setFechaFin(tablero.getFechaFin());

        System.out.println("Tablero: " + tableroKanban.getFechaInicio());

        return tableroKanban;
    }

    public List<TableroResponseDTO> listarTablerosPorProyecto(Long idProyecto) {

        // Obtener usuario autenticado
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String correo = auth.getName();

        Usuario usuario = usuarioRepository
                .findByCorreo(correo)
                .orElseThrow();

        // Validar que el usuario pertenece al proyecto
        // boolean pertenece = proyectoUsuarioRepository
        // .existsByUsuarioIdUsuarioAndProyectoIdProyecto(
        // usuario.getIdUsuario(),
        // idProyecto
        // );

        // if (!pertenece) {
        // throw new ResponseStatusException(
        // HttpStatus.FORBIDDEN,
        // "El usuario " + correo + " no pertenece al proyecto con id " + idProyecto
        // );
        // }

        // Obtener tableros del proyecto
        List<Tablero> tableros = tableroRepository.findByProyectoIdProyectoOrderByIdTableroAsc(idProyecto);

        // Mapear a DTO
        List<TableroResponseDTO> tablerosDTO = new ArrayList<>();

        for (Tablero tablero : tableros) {

            TableroResponseDTO dto = new TableroResponseDTO();

            dto.setIdTablero(tablero.getIdTablero());
            dto.setIdProyecto(idProyecto);
            dto.setDescripcionTablero(tablero.getDescripcionTablero());
            dto.setNombreTablero(tablero.getNombreTablero());
            dto.setFechaInicio(tablero.getFechaInicio());
            dto.setFechaFin(tablero.getFechaFin());

            tablerosDTO.add(dto);
        }

        return tablerosDTO;
    }

    public List<HistorialActividadDTO> obtenerHistorialTablero(Long idTablero) {

        Tablero tablero = tableroRepository.findByIdTablero(idTablero)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tablero no encontrado"));

        Usuario solicitante = authService.getUsuarioAutenticado();
        Long idProyecto = tablero.getProyecto().getIdProyecto();

        if (!proyectoUsuarioRepository.existsByUsuarioAndProyecto(solicitante.getIdUsuario(), idProyecto)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes acceso a este tablero");
        }

        List<Notificacion> notificaciones = notificacionRepository.findForHistorialByTablero(idTablero);
        List<Notificacion> unicasPorAccion = deduplicarNotificacionesPorAccion(notificaciones);

        List<HistorialActividadDTO> resultado = new ArrayList<>();
        for (Notificacion n : unicasPorAccion) {
            resultado.add(mapearHistorial(n));
        }
        return resultado;
    }

    private List<Notificacion> deduplicarNotificacionesPorAccion(List<Notificacion> notificaciones) {
        Set<String> clavesVistas = new LinkedHashSet<>();
        List<Notificacion> resultado = new ArrayList<>();
        for (Notificacion n : notificaciones) {
            Tarjeta tarjeta = n.getTarjeta();
            if (tarjeta == null) {
                continue;
            }
            String clave = n.getMensaje() + "|" + tarjeta.getIdTarjeta() + "|" + n.getFechaCreacion();
            if (clavesVistas.add(clave)) {
                resultado.add(n);
            }
        }
        return resultado;
    }

    private HistorialActividadDTO mapearHistorial(Notificacion n) {
        Tarjeta tarjeta = n.getTarjeta();
        String tituloTarjeta = tarjeta != null ? tarjeta.getTitulo() : null;
        return new HistorialActividadDTO(
                resolverUsuarioAccion(n),
                n.getTipo(),
                n.getMensaje(),
                n.getTarjeta() != null ? n.getTarjeta().getIdTarjeta() : null,
                tituloTarjeta,
                n.getFechaCreacion());
    }

    private String resolverUsuarioAccion(Notificacion n) {
        Tarjeta t = n.getTarjeta();
        if (t != null && t.getCreador() != null) {
            Usuario c = t.getCreador();
            return c.getNombre() + " " + c.getApellido();
        }
        if (n.getUsuario() != null) {
            Usuario u = n.getUsuario();
            return u.getNombre() + " " + u.getApellido();
        }
        return "Sistema";
    }

    private TableroResponseDTO mapToDTO(Tablero tablero) {
        return new TableroResponseDTO(tablero.getIdTablero(), tablero.getProyecto().getIdProyecto(),
                tablero.getNombreTablero(), tablero.getDescripcionTablero(),
                columnaService.mapToListDTO(tablero.getColumnas()), tablero.getFechaInicio(), tablero.getFechaFin());
    }

}