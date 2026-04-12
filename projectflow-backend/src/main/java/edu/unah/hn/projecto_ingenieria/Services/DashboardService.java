package edu.unah.hn.projecto_ingenieria.Services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import edu.unah.hn.projecto_ingenieria.DTO.DashboardDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.EstadoTarjeta;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AuthService authService;

    private final TarjetaRepository tarjetaRepository;

    public DashboardDTO obtenerDashboard() {
        Usuario usuario = authService.getUsuarioAutenticado();
        List<Tarjeta> tarjetas = tarjetaRepository.findByAsignados_IdUsuario(usuario.getIdUsuario());

        int pendientes = 0;
        int enProgreso = 0;
        int finalizadas = 0;
        int vencidas = 0;
        int finalizadasATiempo = 0;

        LocalDate now = LocalDate.now();

        for (Tarjeta tarjeta : tarjetas) {

            switch (tarjeta.getEstado()) {
                case PENDIENTE -> pendientes++;
                case EN_PROGRESO -> enProgreso++;
                case FINALIZADA -> {
                    finalizadas++;

                    if (tarjeta.getFechaFinalizada() != null &&
                            !tarjeta.getFechaFinalizada().isAfter(tarjeta.getFechaLimite())) {
                        finalizadasATiempo++;
                    }
                }
            }

            if (tarjeta.getEstado() != EstadoTarjeta.FINALIZADA &&
                    tarjeta.getFechaLimite() != null &&
                    tarjeta.getFechaLimite().isBefore(now)) {
                vencidas++;
            }
        }

        double eficiencia = finalizadas == 0
                ? 0
                : (finalizadasATiempo * 100.0) / finalizadas;

        long proyectosActivos = tarjetas.stream()
                .map(t -> t.getColumna())
                .filter(Objects::nonNull)
                .map(c -> c.getTablero())
                .filter(Objects::nonNull)
                .map(t -> t.getProyecto())
                .filter(Objects::nonNull)
                .distinct()
                .count();

        Map<DayOfWeek, List<Tarjeta>> agrupado = tarjetas.stream()
                .filter(t -> t.getFechaFinalizada() != null)
                .collect(Collectors.groupingBy(t -> t.getFechaFinalizada().getDayOfWeek()));

        List<Map<String, Object>> progresoSemanal = Arrays.stream(DayOfWeek.values())
                .map(day -> {

                    List<Tarjeta> list = agrupado.getOrDefault(day, List.of());

                    long comp = list.stream()
                            .filter(t -> t.getEstado() == EstadoTarjeta.FINALIZADA)
                            .count();

                    long pend = list.size() - comp;

                    Map<String, Object> item = new HashMap<>();
                    item.put("dia", day.getDisplayName(TextStyle.SHORT, new Locale("es")));
                    item.put("completadas", comp);
                    item.put("pendientes", pend);

                    return item;
                })
                .toList();

        List<Map<String, Object>> tareasPorProyecto = tarjetas.stream()
                .filter(t -> t.getColumna() != null)
                .filter(t -> t.getColumna().getTablero() != null)
                .filter(t -> t.getColumna().getTablero().getProyecto() != null)
                .collect(Collectors.groupingBy(
                        t -> t.getColumna().getTablero().getProyecto().getNombreProyecto()))
                .entrySet()
                .stream()
                .map(entry -> {

                    List<Tarjeta> list = entry.getValue();

                    long comp = list.stream()
                            .filter(t -> t.getEstado() == EstadoTarjeta.FINALIZADA)
                            .count();

                    long prog = list.stream()
                            .filter(t -> t.getEstado() == EstadoTarjeta.EN_PROGRESO)
                            .count();

                    long pend = list.stream()
                            .filter(t -> t.getEstado() == EstadoTarjeta.PENDIENTE)
                            .count();

                    Map<String, Object> item = new HashMap<>();
                    item.put("name", entry.getKey());
                    item.put("finalizadas", comp);
                    item.put("enProgreso", prog);
                    item.put("pendientes", pend);

                    return item;
                })
                .toList();

        return new DashboardDTO(
                proyectosActivos,
                pendientes,
                enProgreso,
                finalizadas,
                vencidas,
                Math.round(eficiencia),
                progresoSemanal,
                tareasPorProyecto);
    }

}
