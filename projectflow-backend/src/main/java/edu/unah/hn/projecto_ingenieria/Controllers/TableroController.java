package edu.unah.hn.projecto_ingenieria.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.TableroDTO;
import edu.unah.hn.projecto_ingenieria.Services.TableroService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tablero")
@RequiredArgsConstructor
@Validated
public class TableroController {
    
    private final TableroService tableroService;

    @GetMapping("/{idTablero}")
    public ResponseEntity<TableroDTO> obtenerTablero(@PathVariable Long idTablero) {
        return ResponseEntity.ok(tableroService.obtenerTablero(idTablero));
    } 

    @GetMapping("/proyecto/{idProyecto}")
    public ResponseEntity<List<TableroDTO>> listarTablerosPorProyecto(@PathVariable Long idProyecto) {
        return ResponseEntity.ok(tableroService.listarTablerosPorProyecto(idProyecto));
    }


}
