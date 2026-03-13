package edu.unah.hn.projecto_ingenieria.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.ColumnaDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TableroDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaResponseDTO;
import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;

import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
//import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumna;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;

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
   
    private final ProyectoUsuarioRepository proyectoUsuarioRepository;

    private final UsuarioRepository usuarioRepository;

    private final TableroRepository tableroRepository;

    private final DTOMapper mapper;

    public TableroDTO obtenerTablero(Long idTablero) {

    Authentication auth = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String correo = auth.getName();

    Usuario usuario = usuarioRepository
            .findByCorreo(correo)
            .orElseThrow();

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


    public List<TableroDTO> listarTablerosPorProyecto(Long idProyecto) {

    // Obtener usuario autenticado
    Authentication auth = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String correo = auth.getName();

    Usuario usuario = usuarioRepository
            .findByCorreo(correo)
            .orElseThrow();

    // Validar que el usuario pertenece al proyecto
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
