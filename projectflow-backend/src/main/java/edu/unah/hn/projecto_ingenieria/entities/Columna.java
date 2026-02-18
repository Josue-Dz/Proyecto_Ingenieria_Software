package edu.unah.hn.projecto_ingenieria.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_columnas")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Columna {
    @Id
    @Column(name = "id_columna")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idColumna;

    @Column(name = "nombre_columna")
    private String nombre;

    private int posicion;

    @ManyToOne
    @Column(name = "id_tablero")
    private Tablero tablero;

    @OneToMany(mappedBy = "columna", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tarjeta> tarjetas;
}