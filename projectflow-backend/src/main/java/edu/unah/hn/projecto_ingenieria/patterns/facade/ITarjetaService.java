package edu.unah.hn.projecto_ingenieria.patterns.facade;

import java.util.List;

import edu.unah.hn.projecto_ingenieria.DTO.TarjetaRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaResponseDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;

public interface ITarjetaService {

    TarjetaResponseDTO crearTarjeta(Long columnaId, TarjetaRequestDTO tarjeta);

    List<TarjetaResponseDTO> mapToDTO(Columna columna);

    void moverTarjeta(Long tarjetaId, Long columnaOrigen, TarjetaRequestDTO tarjetaDto);

    TarjetaResponseDTO actualizarInformacionTarjeta(Long tarjetaId, TarjetaRequestDTO request);

}
