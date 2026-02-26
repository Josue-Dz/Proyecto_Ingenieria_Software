package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuario;
import edu.unah.hn.projecto_ingenieria.Entity.ProyectoUsuarioId;

@Repository
public interface ProyectoUsuarioRepository extends JpaRepository<ProyectoUsuario, ProyectoUsuarioId> {

    
    List<ProyectoUsuario> findByUsuario_IdUsuario(Long idUsuario);

   
    List<ProyectoUsuario> findByProyecto_IdProyecto(Long idProyecto);

    // Find a specific membership by project and user
    Optional<ProyectoUsuario> findByProyecto_IdProyectoAndUsuario_IdUsuario(Long idProyecto, Long idUsuario);

    
    @Modifying(clearAutomatically = true)
    
    void deleteByProyecto_IdProyecto(Long idProyecto); 

}