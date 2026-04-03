package edu.unah.hn.projecto_ingenieria.Listeners;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.HistorialEstadoTarjeta;
import edu.unah.hn.projecto_ingenieria.Events.TarjetaEstadoCambioEvent;
import edu.unah.hn.projecto_ingenieria.Repository.HistorialEstadoTarjetaRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TarjetaEstadoChangeListener {

    private final HistorialEstadoTarjetaRepository historialEstadoTarjetaRepository;

    @EventListener
    public void onTarjetaEstadoCambio(TarjetaEstadoCambioEvent event) {
        HistorialEstadoTarjeta registro = new HistorialEstadoTarjeta();
        registro.setTarjeta(event.getTarjeta());
        registro.setTablero(event.getTablero());
        registro.setEstadoAnterior(event.getEstadoAnterior());
        registro.setEstadoNuevo(event.getEstadoNuevo());
        registro.setFechaCambio(event.getFechaCambio());
        historialEstadoTarjetaRepository.save(registro);
    }
}
