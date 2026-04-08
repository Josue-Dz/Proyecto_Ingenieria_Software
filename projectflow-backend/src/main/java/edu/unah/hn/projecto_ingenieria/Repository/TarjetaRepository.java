package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;

@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    @Query("SELECT COUNT(DISTINCT t.idTarjeta) FROM Tarjeta t WHERE t.columna.tablero.idTablero = :idTablero")
    long countDistinctByTableroIdTablero(@Param("idTablero") Long idTablero);

    @Query("""
            SELECT t FROM Tarjeta t
            LEFT JOIN FETCH t.columna c
            LEFT JOIN FETCH c.tablero tb
            LEFT JOIN FETCH tb.proyecto
            LEFT JOIN FETCH t.creador
            LEFT JOIN FETCH t.asignados
            WHERE t.idTarjeta = :id
            """)
    Optional<Tarjeta> findByIdWithRelaciones(@Param("id") Long id);

    
    List<Tarjeta> findByAsignados_IdUsuario(long idUsuario);


}
