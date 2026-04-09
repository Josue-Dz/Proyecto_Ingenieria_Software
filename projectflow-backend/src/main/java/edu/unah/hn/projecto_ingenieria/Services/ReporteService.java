package edu.unah.hn.projecto_ingenieria.Services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.BurndownDataPointDTO;
import edu.unah.hn.projecto_ingenieria.DTO.BurndownResponseDTO;
import edu.unah.hn.projecto_ingenieria.DTO.UserReportDTO;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.EstadoTarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.HistorialEstadoTarjetaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.ProyectoUsuarioRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TableroRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReporteService {

    private final TableroRepository tableroRepository;
    private final ProyectoUsuarioRepository proyectoUsuarioRepository;
    private final TarjetaRepository tarjetaRepository;
    private final HistorialEstadoTarjetaRepository historialEstadoTarjetaRepository;
    private final AuthService authService;

    public BurndownResponseDTO obtenerBurndownPorTablero(Long idTablero, LocalDate fechaInicio, LocalDate fechaFin) {
        if (fechaInicio == null || fechaFin == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "fechaInicio y fechaFin son obligatorias");
        }
        if (fechaInicio.isAfter(fechaFin)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "fechaInicio no puede ser posterior a fechaFin");
        }

        Tablero tablero = tableroRepository.findByIdTablero(idTablero)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tablero no encontrado"));

        Usuario solicitante = authService.getUsuarioAutenticado();
        Long idProyecto = tablero.getProyecto().getIdProyecto();
        
                proyectoUsuarioRepository
                .findByProyecto_IdProyectoAndUsuario_IdUsuario(idProyecto, solicitante.getIdUsuario())
                .filter(pu -> pu.getRol().name().equals("ADMIN"))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Solo el líder puede ver este reporte"));

        int totalTareas = (int) tarjetaRepository.countDistinctByTableroIdTablero(idTablero);

        List<BurndownDataPointDTO> puntos = new ArrayList<>();
        LocalDate cursor = fechaInicio;
        while (!cursor.isAfter(fechaFin)) {
            LocalDateTime inicioDia = cursor.atStartOfDay();
            LocalDateTime finDiaExclusivo = cursor.plusDays(1).atStartOfDay();

            long completadasEnDia = historialEstadoTarjetaRepository.countDistinctTarjetasFinalizadasEntre(
                    idTablero,
                    EstadoTarjeta.FINALIZADA,
                    inicioDia,
                    finDiaExclusivo);

            long acumuladasHastaCierre = historialEstadoTarjetaRepository.countDistinctTarjetasFinalizadasAntesDe(
                    idTablero,
                    EstadoTarjeta.FINALIZADA,
                    finDiaExclusivo);

            int restantes = (int) Math.max(0, totalTareas - acumuladasHastaCierre);

            puntos.add(new BurndownDataPointDTO(
                    cursor,
                    totalTareas,
                    (int) completadasEnDia,
                    restantes));

            cursor = cursor.plusDays(1);
        }

        LocalDateTime finSprintExclusivo = fechaFin.plusDays(1).atStartOfDay();
        long acumuladoFinal = historialEstadoTarjetaRepository.countDistinctTarjetasFinalizadasAntesDe(
                idTablero,
                EstadoTarjeta.FINALIZADA,
                finSprintExclusivo);

        double porcentaje = totalTareas == 0
                ? 0.0
                : Math.min(100.0, (acumuladoFinal * 100.0) / totalTareas);

        return new BurndownResponseDTO(idTablero, fechaInicio, fechaFin, puntos, porcentaje);
    }

    public List<UserReportDTO> obtenerReporteUsuario(Long idTablero){

        Tablero tablero = tableroRepository.findByIdTablero(idTablero).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tablero no encontrado")
        );

        List<ProyectoUsuario> usuarios = proyectoUsuarioRepository.findByProyecto_IdProyecto(tablero.getProyecto().getIdProyecto());

        return usuarios.stream().map(usuario -> {
            List<Tarjeta> tarjetas = tarjetaRepository.findByAsignados_IdUsuario(usuario.getUsuario().getIdUsuario());
            
            int pendientes = (int)tarjetas.stream().filter(t -> t.getEstado().toString().equals("PENDIENTE") && t.getColumna().getTablero().getIdTablero() == idTablero).count();

            int enProgreso = (int)tarjetas.stream().filter(t -> t.getEstado().toString().equals("EN_PROGRESO") && t.getColumna().getTablero().getIdTablero() == idTablero).count();

            int finalizadas = (int)tarjetas.stream().filter(t -> t.getEstado().toString().equals("FINALIZADA") && t.getColumna().getTablero().getIdTablero() == idTablero).count();

            int totalAsignadas = pendientes + enProgreso + finalizadas;

            List<Long> tiempos = tarjetas.stream()
                .filter(t -> t.getEstado().toString().equals("FINALIZADA"))
                .filter(t -> t.getFechaCreacion() != null && t.getFechaLimite() != null)
                .map(t -> ChronoUnit.DAYS.between(t.getFechaCreacion(), t.getFechaLimite().atStartOfDay()))
                .collect(Collectors.toList());

            double eficiencia = tiempos.isEmpty() ? 0 : tiempos.stream().mapToLong(Long::longValue).average().orElse(0);

            return new UserReportDTO(
                usuario.getUsuario().getNombre() + " " + usuario.getUsuario().getApellido(),
                usuario.getUsuario().obtenerInicialesDeNombre(usuario.getUsuario().getNombre(), usuario.getUsuario().getApellido()),
                pendientes,
                enProgreso,
                finalizadas,
                totalAsignadas,
                eficiencia
            );
        }).collect(Collectors.toList());


        //Usuario solicitante = authService.getUsuarioAutenticado();
    }

}
