package edu.unah.hn.projecto_ingenieria.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.SubtareaRequest;
import edu.unah.hn.projecto_ingenieria.DTO.SubtareaResponse;
import edu.unah.hn.projecto_ingenieria.Entity.SubTarea;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Repository.SubtareaRepository;
import edu.unah.hn.projecto_ingenieria.Repository.TarjetaRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubtareaService {

    private final SubtareaRepository subtareaRepository;

    private final TarjetaRepository tarjetaRepository;

    private final TarjetaService tarjetaService;

    public SubtareaResponse crearSubTarea(Long idTarjeta, String descripcion) {

        Tarjeta tarjeta = tarjetaRepository.findById(idTarjeta).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarjeta no encontrada"));

        SubTarea subtarea = new SubTarea();
        subtarea.setDescripcion(descripcion);
        subtarea.setCompletada(false);
        subtarea.setTarjeta(tarjeta);

        SubTarea guardada = subtareaRepository.save(subtarea);

        return toSubTareaResponse(guardada);
    }

    public List<SubtareaResponse> obtenerSubTareas(Long idTarjeta) {
        List<SubTarea> subtareas = subtareaRepository.findByTarjeta_IdTarjeta(idTarjeta).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtareas no encontradas"));
        
        return toListSubtareaResponse(subtareas);
    }

    public SubtareaResponse toggle(Long idSubtarea) {

        SubTarea subtarea = subtareaRepository.findById(idSubtarea).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtarea no encontradas"));
                
        subtarea.setCompletada(!subtarea.isCompletada());

        SubTarea actualizada = subtareaRepository.save(subtarea);

        recalcularProgreso(subtarea.getTarjeta());

        return toSubTareaResponse(actualizada);
    }

    public void eliminarSubTarea(Long idSubtarea) {
        SubTarea subTarea = subtareaRepository.findById(idSubtarea).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtarea no encontrada."));

        Tarjeta tarjeta = subTarea.getTarjeta();

        recalcularProgreso(tarjeta);

        subtareaRepository.delete(subTarea);

    }

    private SubtareaResponse toSubTareaResponse(SubTarea subTarea) {
        SubtareaResponse subTareaRespone = new SubtareaResponse();

        subTareaRespone.setIdSubtarea(subTarea.getIdSubtarea());
        subTareaRespone.setDescripcion(subTarea.getDescripcion());
        subTareaRespone.setCompletada(subTarea.isCompletada());

        return subTareaRespone;
    }

    private List<SubtareaResponse> toListSubtareaResponse(List<SubTarea> subtareas){

        List<SubtareaResponse> subtareasResponse = new ArrayList<>();
        for(SubTarea subtarea : subtareas){
            subtareasResponse.add(toSubTareaResponse(subtarea));
        }

        return subtareasResponse;
    }

    public void recalcularProgreso(Tarjeta tarjeta) {
        int total = tarjeta.getSubtareas().size();

        if (total == 0) {
            tarjeta.setProgreso(0);
        } else {
            long completadas = tarjeta.getSubtareas().stream()
                    .filter(SubTarea::isCompletada)
                    .count();

            int progreso = (int) ((completadas * 100.0) / total);
            tarjeta.setProgreso(progreso);
        }

        tarjetaRepository.save(tarjeta);
    }

}
