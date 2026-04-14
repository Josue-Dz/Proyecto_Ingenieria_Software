package edu.unah.hn.projecto_ingenieria.Controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.BurndownResponseDTO;
import edu.unah.hn.projecto_ingenieria.DTO.UserReportDTO;
import edu.unah.hn.projecto_ingenieria.Services.ReporteService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@Validated
public class ReporteController {

    private final ReporteService reporteService;

    @GetMapping("/tablero/{idTablero}/burndown")
    public ResponseEntity<BurndownResponseDTO> burndownPorTablero(
            @PathVariable Long idTablero,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        return ResponseEntity.ok(reporteService.obtenerBurndownPorTablero(idTablero, fechaInicio, fechaFin));
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<UserReportDTO>> obtenerAnaliticasUsuario(@RequestParam Long idTablero){
        return ResponseEntity.ok(reporteService.obtenerReporteUsuario(idTablero));

    }

   @GetMapping("/tablero/{idTablero}/exportar")
public ResponseEntity<byte[]> exportarBurndownPorTablero(
        @PathVariable Long idTablero,
        @RequestParam String formato,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

    return ResponseEntity.ok()
            .contentType(reporteService.resolverContentType(formato))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
                    + reporteService.resolverNombreArchivo(idTablero, "sprint", formato) + "\"")
            .body(reporteService.exportarBurndown(idTablero, formato, fechaInicio, fechaFin));
}

    @GetMapping("/usuarios/exportar")
    public ResponseEntity<byte[]> exportarReporteUsuarios(
           @RequestParam Long idTablero,
        @RequestParam String formato) {

    return ResponseEntity.ok()
            .contentType(reporteService.resolverContentType(formato))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
                    + reporteService.resolverNombreArchivo(idTablero, "usuarios", formato) + "\"")
            .body(reporteService.exportarUsuarios(idTablero, formato));
}

}
