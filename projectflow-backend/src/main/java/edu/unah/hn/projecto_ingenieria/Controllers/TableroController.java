package edu.unah.hn.projecto_ingenieria.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.TableroRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TableroResponseDTO;
import edu.unah.hn.projecto_ingenieria.Services.TableroService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@Validated
public class TableroController {
    
    private final TableroService tableroService;

    @PostMapping("/{projectId}/create")
    public ResponseEntity<TableroResponseDTO> crearTablero(@PathVariable Long projectId ,@RequestBody TableroRequestDTO tableroRequest) {
        System.out.println("Llegue al endpoint para crear tablero");
        return ResponseEntity.ok(tableroService.crearTablero(projectId, tableroRequest));
    }
    
    @GetMapping("/{boardId}")
    public ResponseEntity<TableroResponseDTO> obtenerTablero(@PathVariable Long boardId) {
        return ResponseEntity.ok(tableroService.obtenerTablero(boardId));
    }


    @GetMapping("/projects/{projectId}")
    public ResponseEntity<List<TableroResponseDTO>> listarTablerosPorProyecto(@PathVariable Long projectId) {
        return ResponseEntity.ok(tableroService.listarTablerosPorProyecto(projectId));
    }


}
