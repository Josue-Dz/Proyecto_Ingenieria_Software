package edu.unah.hn.projecto_ingenieria.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaResponseDTO;
import edu.unah.hn.projecto_ingenieria.DTO.UsuarioDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.Prioridad;
import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumna;
import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumnaId;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.ColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaXColumnaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TarjetaService {

    private final ColumnaRepository columnaRepository;

    private final TarjetaXColumnaRepository tarjetaXColumnaRepository;

    private final ProyectoRepository proyectoRepository;

    private final UsuarioRepository usuarioRepository;

    private final TarjetaRepository tarjetaRepository;

    private final AuthService authService;

    private final DTOMapper mapper;

    public TarjetaResponseDTO crearTarjeta(Long columnaId, TarjetaRequestDTO request) {

        Columna columna = columnaRepository.findById(columnaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Columna no encontrada"));

        Long tableroId = columna.getTablero().getIdTablero();

        // 1. Validar que sea líder
        Proyecto proyecto = proyectoRepository.findByTablero_IdTablero(tableroId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Proyecto no encontrado"));

        if (!proyecto.getCreador().getIdUsuario().equals(authService.getUsuarioAutenticado().getIdUsuario())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el líder puede crear tareas");
        }

        // tarjetaXColumnaRepository.desplazarTarjetasHaciaAbajo(columnaId);

        Tarjeta tarjeta = new Tarjeta();
        tarjeta.setTitulo(request.getTitulo());
        tarjeta.setFechaCreacion(LocalDateTime.now());
        tarjeta.setColumna(columna);
        tarjeta.setCreador(columna.getTablero().getProyecto().getCreador());
        tarjeta = tarjetaRepository.save(tarjeta);

        TarjetaXColumna tarjetaXColumna = new TarjetaXColumna();
        tarjetaXColumna.setIdColumna(columnaId);
        tarjetaXColumna.setIdTarjeta(tarjeta.getIdTarjeta());
        tarjetaXColumna.setPosicion(0);

        tarjetaXColumnaRepository.save(tarjetaXColumna);

        return mapper.toTarjetaResponseDTO(tarjeta);
    }

    public List<TarjetaResponseDTO> mapToDTO(Columna columna) {
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
            
                            // Mapear asignados a DTO
                if (tarjeta.getAsignados() != null) {
                    List<UsuarioDTO> asignadosDTO = tarjeta.getAsignados().stream()
                        .map(u -> new UsuarioDTO(
                            u.getIdUsuario(),
                            u.getNombre(),
                            u.getApellido(),
                            u.getNombre() + " " + u.getApellido(),
                            u.getCorreo(),
                            u.obtenerInicialesDeNombre(u.getNombre(), u.getApellido())
                        ))
                        .collect(Collectors.toList());
                    tarjetaDTO.setAsignados(asignadosDTO);
                } else {
                    tarjetaDTO.setAsignados(new ArrayList<>());
                }

            tarjetasDTO.add(tarjetaDTO);
        }

        return tarjetasDTO;
    }

    public TarjetaResponseDTO actualizarTarjeta() {

        return null;
    }

    public void moverTarjeta(Long tarjetaId, Long columnaOrigen, TarjetaRequestDTO tarjetaDto) {

        TarjetaXColumnaId origenId = new TarjetaXColumnaId(tarjetaId, columnaOrigen);
        tarjetaXColumnaRepository.deleteById(origenId);

        List<TarjetaXColumna> tarjetasOrigen = tarjetaXColumnaRepository
                .findByIdColumnaOrderByPosicionAsc(columnaOrigen);
        for (int i = 0; i < tarjetasOrigen.size(); i++) {
            System.out.println("Tarjeta origen id:" + tarjetasOrigen.get(i).getTarjeta().getTitulo());
            tarjetasOrigen.get(i).setPosicion(i);
        }

        tarjetaXColumnaRepository.saveAll(tarjetasOrigen);

        List<TarjetaXColumna> tarjetasDestino = tarjetaXColumnaRepository
                .findByIdColumnaOrderByPosicionAsc(tarjetaDto.getColumnaDestinoId());
        for (TarjetaXColumna tarjetaXColumna : tarjetasDestino) {
            if (tarjetaXColumna.getPosicion() >= tarjetaDto.getNuevaPosicion()) {
                tarjetaXColumna.setPosicion(tarjetaXColumna.getPosicion() + 1);
            }
        }

        tarjetaXColumnaRepository.saveAll(tarjetasDestino);

        TarjetaXColumna nueva = new TarjetaXColumna();
        nueva.setIdTarjeta(tarjetaId);
        nueva.setIdColumna(tarjetaDto.getColumnaDestinoId());
        nueva.setPosicion(tarjetaDto.getNuevaPosicion());
        tarjetaXColumnaRepository.save(nueva);
    }

    public TarjetaResponseDTO actualizarInformacionTarjeta(Long tarjetaId, TarjetaRequestDTO request) {

        // Buscar la tarjeta
        Tarjeta tarjeta = tarjetaRepository.findById(tarjetaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarjeta no encontrada"));

        List<Usuario> usuariosAsignados = new ArrayList<>();

        // Buscar los usuarios a asignar a la tarjeta por su correo
        if (request.getUsuariosAsignados() != null && !request.getUsuariosAsignados().isEmpty()) {
            for (String correoUsuario : request.getUsuariosAsignados()) {
                Usuario usuario = usuarioRepository.findByCorreo(correoUsuario).orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario a asignar no existe."));

                usuariosAsignados.add(usuario);
            }
        }

        if (!tarjeta.getCreador().getIdUsuario().equals(authService.getUsuarioAutenticado().getIdUsuario())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Solo el líder puede crear tareas");
        }

        // Setear los nuevos valores
        tarjeta.setTitulo(request.getTitulo());
        tarjeta.setDescripcion(request.getDescripcion());
        tarjeta.setFechaLimite(request.getFechaLimite());
        tarjeta.setPrioridad(request.getPrioridad());
        tarjeta.setEstado(request.getEstado());
        tarjeta.setAsignados(usuariosAsignados);

        // Guardar
        tarjeta = tarjetaRepository.save(tarjeta);

        return mapper.toTarjetaDTO(tarjeta);
    }

}
