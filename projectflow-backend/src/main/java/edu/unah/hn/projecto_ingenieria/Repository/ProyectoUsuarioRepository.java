package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuarioId;

@Repository
public interface ProyectoUsuarioRepository extends JpaRepository<ProyectoUsuario, ProyectoUsuarioId> {

    @Query("SELECT p FROM ProyectoUsuario p WHERE p.usuario.idUsuario = :idUsuario")
    List<ProyectoUsuario> findByUsuario_IdUsuario(Long idUsuario);


    @Query("SELECT p FROM ProyectoUsuario p WHERE p.proyecto.idProyecto = :idProyecto")
    List<ProyectoUsuario> findByProyecto_IdProyecto(Long idProyecto);

   
    Optional<ProyectoUsuario> findByProyecto_IdProyectoAndUsuario_IdUsuario(Long idProyecto, Long idUsuario);

    @Modifying(clearAutomatically = true)
    @Query("delete from ProyectoUsuario p where p.proyecto.idProyecto = :idProyecto")
    void deleteByProyecto_IdProyecto(Long idProyecto); // return type void or int if you need count

}