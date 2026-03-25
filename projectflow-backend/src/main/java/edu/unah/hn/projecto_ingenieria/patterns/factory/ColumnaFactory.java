package edu.unah.hn.projecto_ingenieria.patterns.factory;

import java.util.List;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;

public interface ColumnaFactory {

    List<Columna> crearEstructuraInicial(Tablero tablero);

}
