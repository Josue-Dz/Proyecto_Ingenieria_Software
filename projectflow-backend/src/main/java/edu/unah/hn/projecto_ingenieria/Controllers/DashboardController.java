package edu.unah.hn.projecto_ingenieria.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.unah.hn.projecto_ingenieria.DTO.DashboardDTO;
import edu.unah.hn.projecto_ingenieria.Services.DashboardService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/get")
    public ResponseEntity<DashboardDTO> obtenerDashboard(){
        return ResponseEntity.ok(dashboardService.obtenerDashboard());
    }
}
