package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.Proyecto;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    
    Optional<Proyecto> findByTablero_IdTablero(Long idTablero);
}
