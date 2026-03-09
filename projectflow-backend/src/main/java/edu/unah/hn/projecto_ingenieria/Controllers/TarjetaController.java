package edu.unah.hn.projecto_ingenieria.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.TarjetaRequestDTO;
import edu.unah.hn.projecto_ingenieria.Services.TarjetaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tarjetas")
@RequiredArgsConstructor
public class TarjetaController {
    
    private final TarjetaService tarjetaService;

    @PostMapping("/{idTablero}/tarjeta")
    public ResponseEntity<TarjetaRequestDTO> crearTarjeta( @PathVariable Long idTablero, 
        @RequestBody TarjetaRequestDTO tarjetaRequest, @RequestParam Long idUsuario) {

        return ResponseEntity.ok(tarjetaService.crearTarjeta(idTablero, tarjetaRequest, idUsuario));
    }
}
