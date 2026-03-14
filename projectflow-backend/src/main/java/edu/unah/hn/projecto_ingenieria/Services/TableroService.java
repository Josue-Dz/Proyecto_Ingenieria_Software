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
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaResponseDTO;
import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
<<<<<<< HEAD
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
=======

>>>>>>> main
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
//import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumna;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;
<<<<<<< HEAD
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
=======

>>>>>>> main
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TableroRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaXColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TableroService {

    private final ColumnaRepository columnaRepository;

    private final TarjetaXColumnaRepository tarjetaXColumnaRepository;

    private final ProyectoRepository proyectoRepository;

    private final UsuarioRepository usuarioRepository;

    private final TableroRepository tableroRepository;

<<<<<<< HEAD
    private final ColumnaService columnaService;

    public TableroResponseDTO crearTablero(Long proyectoId, TableroRequestDTO tablero) {

        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        // Aquí creo el tablero
        Tablero tableroNuevo = new Tablero();
        tableroNuevo.setNombre(tablero.getNombre());
        tableroNuevo.setProyecto(proyecto);
        tableroNuevo.setDescripcion(tablero.getDescripcion());
        
        //tableroNuevo.setFechaInicio(tablero.getFechaInicio());
        //tableroNuevo.setFechaFin(tablero.getFechaFin());

        // Tablero se crea con 3 columnas por defecto que posteriormente puede modificar
        // el usuario
        List<String> columnasPorDefecto = List.of("Pendiente", "En Progreso", "Finalizado");
        List<Columna> columnas = new ArrayList<>();
        for (int i = 0; i < columnasPorDefecto.size(); i++) {
            Columna columna = new Columna();
            columna.setNombreColumna(columnasPorDefecto.get(i));
            columna.setPosicion(i);
            columna.setTablero(tableroNuevo);
            columnas.add(columna);
        }

        tableroNuevo.setColumnas(columnas);
        tableroRepository.save(tableroNuevo);

        return mapToDTO(tableroNuevo);
    }

    public TableroResponseDTO obtenerTablero(Long idTablero) {
=======
    private final DTOMapper mapper;

    public TableroDTO obtenerTablero(Long idTablero) {
>>>>>>> main

    Authentication auth = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String correo = auth.getName();

    Usuario usuario = usuarioRepository
            .findByCorreo(correo)
            .orElseThrow();

<<<<<<< HEAD
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
        List<Columna> columnas = columnaRepository.findByTableroIdTablero(tablero.getIdTablero());

        List<ColumnaDTO> columnasDTO = new ArrayList<>();

        // Por cada columna, obtener tarjetas ordenadas por posición
        for (Columna columna : columnas) {

            List<TarjetaXColumna> relaciones = tarjetaXColumnaRepository
                    .findByIdColumnaOrderByPosicionAsc(
                            columna.getIdColumna());

            // Mapear tarjetas a DTOs
            List<TarjetaResponseDTO> tarjetasDTO = new ArrayList<>();

            for (TarjetaXColumna txc : relaciones) {

                Tarjeta tarjeta = txc.getTarjeta();

                TarjetaResponseDTO tarjetaDTO = new TarjetaResponseDTO();

                tarjetaDTO.setIdTarjeta(tarjeta.getIdTarjeta());
                tarjetaDTO.setTitulo(tarjeta.getTitulo());
                tarjetaDTO.setDescripcion(tarjeta.getDescripcion());
                tarjetaDTO.setFechaCreacion(tarjeta.getFechaCreacion());
                tarjetaDTO.setFechaLimite(tarjeta.getFechaLimite());
                tarjetaDTO.setPrioridad(tarjeta.getPrioridad());

                tarjetaDTO.setEstado(tarjeta.getEstado());
                tarjetaDTO.setAsignados(
                        tarjeta.getAsignados()
                                .stream()
                                .map(u -> u.getNombre() + " " + u.getApellido())
                                .toList());

                tarjetasDTO.add(tarjetaDTO);
            }

            // Crear DTO de columna
            ColumnaDTO columnaDTO = new ColumnaDTO();

            columnaDTO.setIdColumna(columna.getIdColumna());
            columnaDTO.setNombreColumna(columna.getNombreColumna());
            columnaDTO.setPosicion(columna.getPosicion());
            columnaDTO.setIdTablero(columna.getTablero().getIdTablero());
            columnaDTO.setTarjetas(tarjetasDTO);

            columnasDTO.add(columnaDTO);
        }

        // Crear DTO de tablero
        TableroResponseDTO tableroKanban = new TableroResponseDTO();

        tableroKanban.setIdTablero(idTablero);
        tableroKanban.setIdProyecto(idProyecto);
        tableroKanban.setColumnas(columnasDTO);

        return tableroKanban;
    }

    public List<TableroResponseDTO> listarTablerosPorProyecto(Long idProyecto) {
=======
    // obtener tablero
    Tablero tablero = tableroRepository
            .findByIdTablero(idTablero)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Tablero no encontrado"
            ));

    Long idProyecto = tablero.getProyecto().getIdProyecto();

    // validar pertenencia al proyecto
    boolean pertenece = proyectoUsuarioRepository
            .existsByUsuarioIdUsuarioAndProyectoIdProyecto(
                    usuario.getIdUsuario(),
                    idProyecto
            );

    if (!pertenece) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "El usuario " + correo +
                " no pertenece al proyecto con id " + idProyecto
        );
    }

    // columnas ordenadas
    List<Columna> columnas =
            columnaRepository
            .findByTableroIdTableroOrderByPosicionAsc(idTablero);

    List<ColumnaDTO> columnasDTO = new ArrayList<>();

    for (Columna columna : columnas) {

        List<TarjetaXColumna> relaciones =
                tarjetaXColumnaRepository
                        .findByIdColumnaOrderByPosicionAsc(
                                columna.getIdColumna()
                        );

        List<TarjetaResponseDTO> tarjetasDTO = new ArrayList<>();

        for (TarjetaXColumna txc : relaciones) {
            tarjetasDTO.add(mapper.toTarjetaDTO(txc.getTarjeta()));
        }
        ColumnaDTO columnaDTO = mapper.toColumnaDTO(columna, idTablero, tarjetasDTO);
        columnasDTO.add(columnaDTO);
    }

    TableroDTO tableroKanban = new TableroDTO();

    tableroKanban.setIdTablero(idTablero);
    tableroKanban.setIdProyecto(idProyecto);
    tableroKanban.setColumnas(columnasDTO);

    return tableroKanban;
}

>>>>>>> main

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

<<<<<<< HEAD
        // Obtener tableros del proyecto
        List<Tablero> tableros = tableroRepository.findByProyectoIdProyecto(idProyecto);

        // Mapear a DTO
        List<TableroResponseDTO> tablerosDTO = new ArrayList<>();

        for (Tablero tablero : tableros) {

            TableroResponseDTO dto = new TableroResponseDTO();

            dto.setIdTablero(tablero.getIdTablero());
            dto.setIdProyecto(idProyecto);
            dto.setDescripcion(tablero.getDescripcion());
            dto.setNombre(tablero.getNombre());

            tablerosDTO.add(dto);
        }

        return tablerosDTO;
    }

    private TableroResponseDTO mapToDTO(Tablero tablero) {
        return new TableroResponseDTO(tablero.getIdTablero(), tablero.getProyecto().getIdProyecto(),
                tablero.getNombre(), tablero.getDescripcion(), columnaService.mapToListDTO(tablero.getColumnas()));
    }

}
=======
    if (!pertenece) {
        throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "El usuario " + correo +
                " no pertenece al proyecto con id " + idProyecto
        );
    }

    // Obtener tableros ordenados
    List<Tablero> tableros =
            tableroRepository
            .findByProyectoIdProyectoOrderByIdTableroAsc(idProyecto);

    // Mapear a DTO
    List<TableroDTO> tablerosDTO = new ArrayList<>();

    for (Tablero tablero : tableros) {
        tablerosDTO.add(mapper.toTableroDTO(tablero));
    }

    return tablerosDTO;
}
}
>>>>>>> main
