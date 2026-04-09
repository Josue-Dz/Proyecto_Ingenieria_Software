package edu.unah.hn.projecto_ingenieria.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;


@Repository
public interface ColumnaRepository extends JpaRepository<Columna, Long> {

    List<Columna> findByTableroIdTableroOrderByPosicionAsc(Long idTablero);
    
    Optional<Columna> findByTableroIdTableroAndNombreColumna(Long idTablero, String nombreColumna);

    // Verificar si ya existe una columna con ese nombre en el tablero
    boolean existsByTablero_IdTableroAndNombreColumna(Long idTablero, String nombreColumna);

    // Obtener la posición máxima de las columnas de un tablero
    
    Integer findMaxPosicionByTableroIdTablero(Long idTablero);

    // (Opcional) Listar columnas ordenadas por posición
    List<Columna> findByTablero_IdTableroOrderByPosicionAsc(Long idTablero);

    List<Columna> findByTablero_IdTablero(Long idTablero);

    List<Columna> findByProyecto_IdProyecto(Long idProyecto);
    
}
