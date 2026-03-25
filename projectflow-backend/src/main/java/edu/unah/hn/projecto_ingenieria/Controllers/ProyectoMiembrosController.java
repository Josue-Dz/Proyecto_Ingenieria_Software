package edu.unah.hn.projecto_ingenieria.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.CambiarRolRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.InvitarMiembroRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.MiembroResponseDTO;
import edu.unah.hn.projecto_ingenieria.Services.GestionMiembrosProyectoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/projects/{idProyecto}")
@RequiredArgsConstructor
public class ProyectoMiembrosController {
    
    private final GestionMiembrosProyectoService gestionMiembrosProyectoService;

    @GetMapping("/members")
    public ResponseEntity<List<MiembroResponseDTO>> listarMiembros(@PathVariable Long idProyecto) {
        return ResponseEntity.ok(gestionMiembrosProyectoService.listarMiembrosProyecto(idProyecto));
    }

    @PostMapping("/members/invite")
    public ResponseEntity<MiembroResponseDTO> invitarMiembro(@PathVariable Long idProyecto, @Valid 
        @RequestBody InvitarMiembroRequestDTO 
        invitacionDTO) {
        MiembroResponseDTO nuevoMiembro = gestionMiembrosProyectoService.invitarMiembro(idProyecto, invitacionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoMiembro);
    }

    @PutMapping("/members/{idUsuario}/role")
    public ResponseEntity<MiembroResponseDTO> cambiarRol(@PathVariable Long idProyecto, @PathVariable Long idUsuario, 
       @Valid @RequestBody CambiarRolRequestDTO cambioRolDTO) {
        return ResponseEntity.ok(gestionMiembrosProyectoService.cambiarRolMiembro(idProyecto, idUsuario, cambioRolDTO));
    }

    @DeleteMapping("/members/{idUsuario}")
    public ResponseEntity<Void> eliminarMiembro(@PathVariable Long idProyecto, @PathVariable Long idUsuario) {
        gestionMiembrosProyectoService.eliminarMiembro(idProyecto, idUsuario);
        return ResponseEntity.noContent().build();
    }
    
}