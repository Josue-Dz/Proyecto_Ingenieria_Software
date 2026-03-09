package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;


@Repository
public interface ColumnaRepository extends JpaRepository<Columna, Long> {

    List<Columna> findByTableroIdTablero(Long idTablero);
    
    Optional<Columna> findByTableroIdTableroAndNombreColumna(Long idTablero, String nombreColumna);
    
}
