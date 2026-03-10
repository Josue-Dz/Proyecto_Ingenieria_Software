package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumna;
import edu.unah.hn.projecto_ingenieria.Entity.TarjetaXColumnaId;

@Repository
public interface TarjetaXColumnaRepository extends JpaRepository<TarjetaXColumna, TarjetaXColumnaId> {
    
    List<TarjetaXColumna> findByIdColumnaOrderByPosicionAsc(Long idColumna);
}
