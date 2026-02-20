package edu.unah.hn.projecto_ingenieria.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "tbl_columnas")
@Getter 
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Columna {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_columna")
    private Long idColumna;

    @Column(name = "nombre_columna")
    private String nombreColumna;
    
    private Integer posicion;

    @ManyToOne
    @JoinColumn(name = "id_tablero")
    private Tablero tablero;

    @OneToMany(mappedBy = "columna", cascade = CascadeType.ALL)
    private List<Tarjeta> tarjetas;
}
