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

    // Find all project memberships for a specific user
    @Query("SELECT p FROM ProyectoUsuario p WHERE p.usuario.idUsuario = :idUsuario")
    List<ProyectoUsuario> findByUsuario_IdUsuario(Long idUsuario);

    // Find all users/roles within a specific project
    @Query("SELECT p FROM ProyectoUsuario p WHERE p.proyecto.idProyecto = :idProyecto")
    List<ProyectoUsuario> findByProyecto_IdProyecto(Long idProyecto);

    // Find a specific membership by project and user
    Optional<ProyectoUsuario> findByProyecto_IdProyectoAndUsuario_IdUsuario(Long idProyecto, Long idUsuario);

    // delete all memberships associated with a project
    // clearAutomatically makes sure stale entities are removed from the persistence context
    @Modifying(clearAutomatically = true)
    @Query("delete from ProyectoUsuario p where p.proyecto.idProyecto = :idProyecto")
    void deleteByProyecto_IdProyecto(Long idProyecto); // return type void or int if you need count

}