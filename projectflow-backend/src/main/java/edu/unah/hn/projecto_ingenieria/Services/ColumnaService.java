package edu.unah.hn.projecto_ingenieria.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.ColumnaDTO;
import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaResponseDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TableroRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ColumnaService {

    private final TarjetaService tarjetaService;

    private final TableroRepository tableroRepository;

    private final ColumnaRepository columnaRepository;

    private final DTOMapper mapper;

    public ColumnaDTO crearColumna(Long tableroId, ColumnaDTO dto) {
        Tablero tablero = tableroRepository.findById(tableroId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tablero no encontrado"));

        Columna columna = new Columna();
        columna.setNombreColumna(dto.getNombreColumna());
        columna.setTablero(tablero);

        // Posición al final de las columnas existentes
        int posicion = tablero.getColumnas() != null ? tablero.getColumnas().size() : 0;
        columna.setPosicion(posicion);

        // Lista Vacia
        List<TarjetaResponseDTO> tarjetas = new ArrayList<>();

        columnaRepository.save(columna);
        return mapper.toColumnaDTO(columna, tableroId, tarjetas);
    }

    public List<ColumnaDTO> mapToListDTO(List<Columna> columnas) {
        List<ColumnaDTO> columnasDTO = new ArrayList<>();

        // Por cada columna, obtener tarjetas ordenadas por posición
        for (Columna columna : columnas) {

            List<TarjetaResponseDTO> tarjetasDTO = tarjetaService.mapToDTO(columna);

            // Crear DTO de columna
            ColumnaDTO columnaDTO = new ColumnaDTO();

            columnaDTO.setIdColumna(columna.getIdColumna());
            columnaDTO.setNombreColumna(columna.getNombreColumna());
            columnaDTO.setPosicion(columna.getPosicion());
            columnaDTO.setIdTablero(columna.getTablero().getIdTablero());
            columnaDTO.setTarjetas(tarjetasDTO);

            columnasDTO.add(columnaDTO);
        }

        return columnasDTO;

    }

}
