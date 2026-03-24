package edu.unah.hn.projecto_ingenieria.patterns.factory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import edu.unah.hn.projecto_ingenieria.Entity.Columna;
import edu.unah.hn.projecto_ingenieria.Entity.Tablero;

@Component
public class KanbanColumnaFactory implements ColumnaFactory{

    @Override
    public List<Columna> crearEstructuraInicial(Tablero tablero) {
       List<String> nombres = List.of("Pendiente", "En Progreso", "Finalizado");
       List<Columna> columnas = new ArrayList<>();

       for(int i=0; i < nombres.size(); i++){
            Columna columna = new Columna();
            columna.setNombreColumna(nombres.get(i));
            columna.setPosicion(i);
            columna.setTablero(tablero);
            columnas.add(columna);
       }

       return columnas;
    }



}
