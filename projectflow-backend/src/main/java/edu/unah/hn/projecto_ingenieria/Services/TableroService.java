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
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
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

    public TableroDTO obtenerTablero(Long idTablero) {

        // Obtener usuario autenticado
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String correo = auth.getName();

        Usuario usuario = usuarioRepository
                .findByCorreo(correo)
                .orElseThrow();

                //obtener tablero

                Tablero tablero = tableroRepository.findByIdTablero(idTablero)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tablero no encontrado"
                ));

        Long idProyecto = tablero.getProyecto().getIdProyecto();
                
        // Validar que el usuario pertenece al proyecto
        boolean pertenece = proyectoUsuarioRepository
                .existsByUsuarioIdUsuarioAndProyectoIdProyecto(
                        usuario.getIdUsuario(),
                        idProyecto
                );

        if (!pertenece) {
            throw new ResponseStatusException(
          HttpStatus.FORBIDDEN,
            "El usuario " + correo + " no pertenece al proyecto con id " + idProyecto
            );
        }

        // Obtener columnas del tablero
        List<Columna> columnas =
                columnaRepository.findByTableroIdTablero(tablero.getIdTablero());

        List<ColumnaDTO> columnasDTO = new ArrayList<>();

        // Por cada columna, obtener tarjetas ordenadas por posición
        for (Columna columna : columnas) {

            List<TarjetaXColumna> relaciones =
                    tarjetaXColumnaRepository
                            .findByIdColumnaOrderByPosicionAsc(
                                    columna.getIdColumna()
                            );

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
                                .toList()
                );

                tarjetasDTO.add(tarjetaDTO);
            }

            // Crear DTO de columna
            ColumnaDTO columnaDTO = new ColumnaDTO();

            columnaDTO.setNombreColumna(columna.getNombreColumna());
            columnaDTO.setPosicion(columna.getPosicion());
            columnaDTO.setIdTablero(columna.getTablero().getIdTablero());
            columnaDTO.setTarjetas(tarjetasDTO);

            columnasDTO.add(columnaDTO);
        }

        // Crear DTO de tablero
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
                "El usuario " + correo + " no pertenece al proyecto con id " + idProyecto
        );
    }

    // Obtener tableros del proyecto
    List<Tablero> tableros =
            tableroRepository.findByProyectoIdProyecto(idProyecto);

    if (tableros.isEmpty()) {
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "No hay tableros para este proyecto"
        );
    }

    // Mapear a DTO
    List<TableroDTO> tablerosDTO = new ArrayList<>();

    for (Tablero tablero : tableros) {

        TableroDTO dto = new TableroDTO();

        dto.setIdTablero(tablero.getIdTablero());
        dto.setIdProyecto(idProyecto);

        tablerosDTO.add(dto);
    }

    return tablerosDTO;
}

    }