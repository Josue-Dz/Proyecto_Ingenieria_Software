package edu.unah.hn.projecto_ingenieria.Controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.ProyectoRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.ProyectoResponseDTO;
import edu.unah.hn.projecto_ingenieria.Services.ProyectoService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Validated
public class ProyectoController {

	private final ProyectoService proyectoService;

	@PostMapping("/create")
	public ResponseEntity<ProyectoResponseDTO> crearProyecto(@RequestBody ProyectoRequestDTO dto) {
		System.out.println("Esto llego al backend" + dto);
		ProyectoResponseDTO created = proyectoService.crearProyecto(dto);
		return ResponseEntity.created(URI.create("/projects/" + created.getIdProyecto())).body(created);
	}

	@GetMapping("/mine")
	public ResponseEntity<List<ProyectoResponseDTO>> misProyectos() {
		return ResponseEntity.ok(proyectoService.obtenerProyectosPorUsuario());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProyectoResponseDTO> obtenerPorId(@PathVariable Long id) {
		return ResponseEntity.ok(proyectoService.obtenerProyectoPorId(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProyectoResponseDTO> actualizar(@PathVariable Long id, @RequestBody ProyectoRequestDTO dto) {
		return ResponseEntity.ok(proyectoService.actualizarProyecto(id, dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable Long id) {
		proyectoService.eliminarProyecto(id);
		return ResponseEntity.noContent().build();
	}

}
