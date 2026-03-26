package edu.unah.hn.projecto_ingenieria.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {

    List<Notificacion> findByUsuario_IdUsuario(@Param("idUsuario") Long idUsuario);

    Long countNoLeidasByUsuario(@Param("idUsuario") Long idUsuario);
}