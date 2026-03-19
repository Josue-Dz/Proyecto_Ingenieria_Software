package edu.unah.hn.projecto_ingenieria.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.ColumnaDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TableroRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TableroResponseDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TableroRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TableroService {

    private final ColumnaRepository columnaRepository;

    private final ProyectoRepository proyectoRepository;

    private final UsuarioRepository usuarioRepository;

    private final TableroRepository tableroRepository;

    private final ColumnaService columnaService;

    public TableroResponseDTO crearTablero(Long proyectoId, TableroRequestDTO tablero) {

        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        // Aquí creo el tablero
        Tablero tableroNuevo = new Tablero();
        tableroNuevo.setNombreTablero(tablero.getNombre());
        tableroNuevo.setProyecto(proyecto);
        tableroNuevo.setDescripcionTablero(tablero.getDescripcion());
        Tablero guardado = tableroRepository.save(tableroNuevo);

        // Tablero se crea con 3 columnas por defecto que posteriormente puede modificar
        // el usuario
        List<String> columnasPorDefecto = List.of("Pendiente", "En Progreso", "Finalizado");
        List<Columna> columnas = new ArrayList<>();
        for (int i = 0; i < columnasPorDefecto.size(); i++) {
            Columna columna = new Columna();
            columna.setNombreColumna(columnasPorDefecto.get(i));
            columna.setPosicion(i);
            columna.setTablero(guardado);

            columnas.add(columna);
        }

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

        // obtener tablero

        Tablero tablero = tableroRepository.findByIdTablero(idTablero)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tablero no encontrado"));

        Long idProyecto = tablero.getProyecto().getIdProyecto();

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

        // Obtener columnas del tablero
        List<Columna> columnas = columnaRepository.findByTableroIdTableroOrderByPosicionAsc(tablero.getIdTablero());

        List<ColumnaDTO> columnasDTO = columnaService.mapToListDTO(columnas);

        // Crear DTO de tablero
        TableroResponseDTO tableroKanban = new TableroResponseDTO();

        tableroKanban.setIdTablero(idTablero);
        tableroKanban.setNombreTablero(tablero.getDescripcionTablero());
        tableroKanban.setDescripcionTablero(tablero.getDescripcionTablero());
        tableroKanban.setIdProyecto(idProyecto);
        tableroKanban.setColumnas(columnasDTO);

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

            tablerosDTO.add(dto);
        }

        return tablerosDTO;
    }

    private TableroResponseDTO mapToDTO(Tablero tablero) {
        return new TableroResponseDTO(tablero.getIdTablero(), tablero.getProyecto().getIdProyecto(),
                tablero.getNombreTablero(), tablero.getDescripcionTablero(),
                columnaService.mapToListDTO(tablero.getColumnas()));
    }

}