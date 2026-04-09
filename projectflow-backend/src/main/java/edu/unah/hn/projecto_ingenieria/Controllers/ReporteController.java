package edu.unah.hn.projecto_ingenieria.Controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.BurndownResponseDTO;
import edu.unah.hn.projecto_ingenieria.DTO.UserReportDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;
import edu.unah.hn.projecto_ingenieria.Repository.TableroRepository;
import edu.unah.hn.projecto_ingenieria.Services.ExportacionReporteService;
import edu.unah.hn.projecto_ingenieria.Services.ReporteService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@Validated
public class ReporteController {

    private final ReporteService reporteService;
    private final ExportacionReporteService exportacionReporteService;

    private final TableroRepository tableroRepository;

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

    BurndownResponseDTO data = reporteService.obtenerBurndownPorTablero(idTablero, fechaInicio, fechaFin);

    // Para obtener el nombre del tablero
    Tablero tablero = tableroRepository.findByIdTablero(idTablero)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tablero no encontrado"));
    String nombreProyecto = tablero.getProyecto().getNombreProyecto();

    String formatoNormalizado = formato.toLowerCase(Locale.ROOT);
    byte[] archivo;
    MediaType contentType;
    String extension;

    switch (formatoNormalizado) {
        case "excel":
            archivo = exportacionReporteService.generarExcel(data, nombreProyecto);
            contentType = MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            extension = "xlsx";
            break;
        case "pdf":
            archivo = exportacionReporteService.generarPDF(data, nombreProyecto);
            contentType = MediaType.APPLICATION_PDF;
            extension = "pdf";
            break;
        default:
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Formato no soportado. Use 'pdf' o 'excel'");
    }

    String nombreArchivo = "reporte_sprint_" + nombreProyecto.replace(" ", "_") + "." + extension;

    return ResponseEntity.ok()
            .contentType(contentType)
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nombreArchivo + "\"")
            .body(archivo);
}

    @GetMapping("/usuarios/exportar")
    public ResponseEntity<byte[]> exportarReporteUsuarios(
            @RequestParam Long idTablero,
            @RequestParam String formato) {

    List<UserReportDTO> usuarios = reporteService.obtenerReporteUsuario(idTablero);

    Tablero tablero = tableroRepository.findByIdTablero(idTablero)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tablero no encontrado"));
    String nombreProyecto = tablero.getProyecto().getNombreProyecto();

    String formatoNormalizado = formato.toLowerCase(Locale.ROOT);
    byte[] archivo;
    MediaType contentType;
    String extension;

    switch (formatoNormalizado) {
        case "excel":
            archivo = exportacionReporteService.generarExcelUsuarios(usuarios, nombreProyecto);
            contentType = MediaType.parseMediaType(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            extension = "xlsx";
            break;
        case "pdf":
            archivo = exportacionReporteService.generarPDFUsuarios(usuarios, nombreProyecto);
            contentType = MediaType.APPLICATION_PDF;
            extension = "pdf";
            break;
        default:
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Formato no soportado. Use 'pdf' o 'excel'");
    }

    String nombreArchivo = "reporte_usuarios_" + nombreProyecto.replace(" ", "_") + "." + extension;

    return ResponseEntity.ok()
            .contentType(contentType)
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nombreArchivo + "\"")
            .body(archivo);
}

}
