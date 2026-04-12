package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.SubTarea;

@Repository
public interface SubtareaRepository extends JpaRepository<SubTarea, Long> {

    Optional<List<SubTarea>> findByTarjeta_IdTarjeta(Long idTarjeta);
}
