package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {

    List<Notificacion> findByUsuario_IdUsuario(@Param("idUsuario") Long idUsuario);

    Long countByUsuario_IdUsuarioAndLeidaFalse(@Param("idUsuario") Long idUsuario);

    @Query("""
            SELECT n FROM Notificacion n
            JOIN FETCH n.usuario
            JOIN FETCH n.tarjeta t
            JOIN FETCH t.columna c
            LEFT JOIN FETCH t.creador
            WHERE c.tablero.idTablero = :idTablero
            ORDER BY n.fechaCreacion DESC
            """)
    List<Notificacion> findForHistorialByTablero(@Param("idTablero") Long idTablero);
}