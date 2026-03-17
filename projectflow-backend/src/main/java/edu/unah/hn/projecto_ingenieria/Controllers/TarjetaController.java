package edu.unah.hn.projecto_ingenieria.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.TarjetaRequestDTO;
import edu.unah.hn.projecto_ingenieria.DTO.TarjetaResponseDTO;
import edu.unah.hn.projecto_ingenieria.Services.TarjetaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TarjetaController {

    private final TarjetaService tarjetaService;

    @PostMapping("/{columnaId}")
    public ResponseEntity<TarjetaResponseDTO> crearTarjeta(@PathVariable Long columnaId,
            @RequestBody TarjetaRequestDTO tarjetaRequest) {

        System.out.println("Estoy en el endpoint crear tarjeta: " + columnaId + tarjetaRequest.getTitulo());
        return ResponseEntity.ok(tarjetaService.crearTarjeta(columnaId, tarjetaRequest));
    }

    @PutMapping("/{tarjetaId}/mover")
    public ResponseEntity<Void> moverTarjeta(@PathVariable Long tarjetaId,
            @RequestParam Long columnaOrigenId,
            @RequestBody TarjetaRequestDTO tarjetaDto) {
        System.out.println(
                "Estoy en el metodo mover tarjeta y esto tiene tarjeta DTO: " + tarjetaDto.getColumnaDestinoId());
        tarjetaService.moverTarjeta(tarjetaId, columnaOrigenId, tarjetaDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{tarjetaId}")
    public ResponseEntity<TarjetaResponseDTO> actualizarInfoTarjeta(@PathVariable Long tarjetaId,
            @RequestBody TarjetaRequestDTO request) {
                System.out.println("Estoy en el endpoint actualizar tarjeta: " + tarjetaId + request.toString());
        return ResponseEntity.ok(tarjetaService.actualizarInformacionTarjeta(tarjetaId, request));
    }
}
