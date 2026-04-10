package edu.unah.hn.projecto_ingenieria.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.CrearSubtareaRequest;
import edu.unah.hn.projecto_ingenieria.DTO.SubtareaRequest;
import edu.unah.hn.projecto_ingenieria.DTO.SubtareaResponse;
import edu.unah.hn.projecto_ingenieria.Services.SubtareaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subtasks")
@RequiredArgsConstructor
public class SubtareaController {

    private final SubtareaService subtareaService;

    @PostMapping("/create/{idTarjeta}")
     public ResponseEntity<SubtareaResponse> createSubtask(@PathVariable Long idTarjeta, @RequestBody CrearSubtareaRequest request){
        System.out.println("REQUEST: " + request);
        System.out.println("TARJETAID CREATE: " + idTarjeta);
        SubtareaResponse created = subtareaService.crearSubTarea(idTarjeta, request.getDescripcion());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{idSubtarea}/toggle")
    public ResponseEntity<SubtareaResponse> toggle(@PathVariable Long idSubtarea){
        System.out.println("IDTAREA: " + idSubtarea);
        return ResponseEntity.ok(subtareaService.toggle(idSubtarea));
    } 

    @GetMapping("/{idTarjeta}")
    public ResponseEntity<List<SubtareaResponse>> getSubtasks(@PathVariable Long idTarjeta){
        System.out.println("HOLA");
        return ResponseEntity.ok(subtareaService.obtenerSubTareas(idTarjeta));
    }

}
