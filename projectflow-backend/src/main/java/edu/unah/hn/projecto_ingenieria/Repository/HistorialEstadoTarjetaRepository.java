package edu.unah.hn.projecto_ingenieria.Repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.HistorialEstadoTarjeta;
import edu.unah.hn.projecto_ingenieria.Entity.Tarjeta.EstadoTarjeta;

@Repository
public interface HistorialEstadoTarjetaRepository extends JpaRepository<HistorialEstadoTarjeta, Long> {

        boolean existsByTarjeta_IdTarjetaAndTablero_IdTableroAndEstadoNuevo(
                        Long idTarjeta,
                        Long idTablero,
                        EstadoTarjeta estadoNuevo);

    @Query("""
            SELECT COUNT(DISTINCT h.tarjeta.idTarjeta)
            FROM HistorialEstadoTarjeta h
            WHERE h.tablero.idTablero = :idTablero
              AND h.estadoNuevo = :estadoFinalizada
              AND h.fechaCambio >= :inicio
              AND h.fechaCambio < :fin
            """)
    long countDistinctTarjetasFinalizadasEntre(
            @Param("idTablero") Long idTablero,
            @Param("estadoFinalizada") EstadoTarjeta estadoFinalizada,
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin);

    @Query("""
            SELECT COUNT(DISTINCT h.tarjeta.idTarjeta)
            FROM HistorialEstadoTarjeta h
            WHERE h.tablero.idTablero = :idTablero
              AND h.estadoNuevo = :estadoFinalizada
              AND h.fechaCambio < :finExclusivo
            """)
    long countDistinctTarjetasFinalizadasAntesDe(
            @Param("idTablero") Long idTablero,
            @Param("estadoFinalizada") EstadoTarjeta estadoFinalizada,
            @Param("finExclusivo") LocalDateTime finExclusivo);
}
