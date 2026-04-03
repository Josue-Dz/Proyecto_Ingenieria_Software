package edu.unah.hn.projecto_ingenieria.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;

@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    @Query("SELECT COUNT(DISTINCT t.idTarjeta) FROM Tarjeta t WHERE t.columna.tablero.idTablero = :idTablero")
    long countDistinctByTableroIdTablero(@Param("idTablero") Long idTablero);
}
