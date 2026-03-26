package edu.unah.hn.projecto_ingenieria.Controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.NotificacionDTO;
import edu.unah.hn.projecto_ingenieria.Services.NotificacionService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificacionController {
    
    private final NotificacionService notificacionService;

        @GetMapping
    public ResponseEntity<List<NotificacionDTO>> getMisNotificaciones() {
        return ResponseEntity.ok(notificacionService.getMisNotificaciones());
    }

    @GetMapping("/no/read")
    public ResponseEntity<Long> contarNoLeidas() {
        return ResponseEntity.ok(notificacionService.contarNoLeidas());
    }

    @PutMapping("/{id}/read")
    public void marcarComoLeida(@PathVariable Long id) {
        notificacionService.marcarComoLeida(id);
    }

    @PutMapping("/read/all")
    public ResponseEntity<Void> marcarTodasComoLeidas() {
        notificacionService.marcarTodasComoLeidas();
        return ResponseEntity.ok().build();
    }
}
