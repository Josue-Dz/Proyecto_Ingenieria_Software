package edu.unah.hn.projecto_ingenieria.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.ColumnaDTO;
import edu.unah.hn.projecto_ingenieria.Services.ColumnaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/columns")
@RequiredArgsConstructor
public class ColumnaController {

    private final ColumnaService columnaService;

    @PostMapping("/{tableroId}")
    public ResponseEntity<ColumnaDTO> crearColumna(@PathVariable Long tableroId, @RequestBody ColumnaDTO dto){
        System.out.println("Estoy en crear columna con nombre: " + dto.getNombreColumna());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(columnaService.crearColumna(tableroId, dto));
    }

    @PutMapping("/{idColumna}")
    public ResponseEntity<ColumnaDTO> cambiarNombreColumna(@PathVariable Long idColumna, @RequestBody ColumnaDTO dto){
        return ResponseEntity.ok(columnaService.cambiarNombreCol(idColumna, dto));
    }

}
