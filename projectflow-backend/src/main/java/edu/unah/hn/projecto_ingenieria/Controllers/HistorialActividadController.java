package edu.unah.hn.projecto_ingenieria.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.HistorialActividadDTO;
import edu.unah.hn.projecto_ingenieria.Services.HistorialActividadService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/historial")
@RequiredArgsConstructor
public class HistorialActividadController {

    private final HistorialActividadService historialService;

    @GetMapping("/{idProyecto}")
    public ResponseEntity<List<HistorialActividadDTO>> obtenerHistorial(
            @PathVariable Long idProyecto) {
        return ResponseEntity.ok(historialService.obtenerPorProyecto(idProyecto));
    }
}