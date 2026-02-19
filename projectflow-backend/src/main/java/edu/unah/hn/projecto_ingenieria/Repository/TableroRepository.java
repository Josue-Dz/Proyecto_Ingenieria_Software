package edu.unah.hn.projecto_ingenieria.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;

@Repository
public interface TableroRepository extends JpaRepository<Tablero, Long> {
    
}
