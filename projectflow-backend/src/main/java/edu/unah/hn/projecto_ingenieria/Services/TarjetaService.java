package edu.unah.hn.projecto_ingenieria.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.TarjetaRequestDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Columna.NombreColumna;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.Prioridad;
import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumna;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaXColumnaRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TarjetaService {

    private final ColumnaRepository columnaRepository;

    private final TarjetaXColumnaRepository tarjetaXColumnaRepository;

    private final ProyectoRepository proyectoRepository;
    
    private final TarjetaRepository tarjetaRepository;
   public TarjetaRequestDTO crearTarjeta(Long idTablero, TarjetaRequestDTO request, Long idUsuario) {

    // 1. Validar que sea líder
    Proyecto proyecto = proyectoRepository.findByTablero_IdTablero(idTablero)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

    if (!proyecto.getCreador().getIdUsuario().equals(idUsuario)) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el líder puede crear tareas");
    }

    // 2. Buscar columna 'Pendiente'
    Columna columnaPendiente = columnaRepository
        .findByTableroIdTableroAndNombreColumna(idTablero, NombreColumna.PENDIENTE.name())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna 'Pendiente' no encontrada"));

    // 3. Crear tarjeta
    Tarjeta tarjeta = new Tarjeta();
    tarjeta.setTitulo(request.getTitulo());
    tarjeta.setDescripcion(request.getDescripcion());
    tarjeta.setFechaLimite(request.getFechaLimite());
    tarjeta.setFechaCreacion(LocalDateTime.now());
    tarjeta.setPrioridad(Prioridad.valueOf(request.getPrioridad())); // ya es enum


    tarjetaRepository.save(tarjeta);

    // 4. Asignar a columna
    List<TarjetaXColumna> tarjetas = tarjetaXColumnaRepository
        .findByIdColumnaOrderByPosicionAsc(columnaPendiente.getIdColumna());

    int nuevaPosicion = tarjetas.isEmpty() ? 1 : tarjetas.get(tarjetas.size() - 1).getPosicion() + 1;

    TarjetaXColumna relacion = new TarjetaXColumna();
    relacion.setTarjeta(tarjeta);
    relacion.setColumna(columnaPendiente);
    relacion.setPosicion(nuevaPosicion);

    tarjetaXColumnaRepository.save(relacion);

    // 5. Devolver DTO
    TarjetaRequestDTO dto = new TarjetaRequestDTO();
    dto.setTitulo(tarjeta.getTitulo());
    dto.setDescripcion(tarjeta.getDescripcion());
    dto.setFechaLimite(tarjeta.getFechaLimite());
    dto.setPrioridad(tarjeta.getPrioridad().name());

    return dto;
    }


 }

