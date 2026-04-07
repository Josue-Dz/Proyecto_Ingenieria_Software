package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.HistorialActividad;

@Repository
public interface HistorialActividadRepository extends JpaRepository<HistorialActividad, Long> {

    @Query("""
        SELECT h FROM HistorialActividad h
        JOIN FETCH h.usuario
        LEFT JOIN FETCH h.tarjeta
        WHERE h.proyecto.idProyecto = :idProyecto
        ORDER BY h.fechaCreacion DESC
        """)
    List<HistorialActividad> findByProyectoOrderByFechaDesc(@Param("idProyecto") Long idProyecto);

    @Query("""
        SELECT h FROM HistorialActividad h
        JOIN FETCH h.usuario
        LEFT JOIN FETCH h.tarjeta
        WHERE h.tablero.idTablero = :idTablero
        ORDER BY h.fechaCreacion DESC
        """)
    List<HistorialActividad> findByTableroOrderByFechaDesc(@Param("idTablero") Long idTablero);
}