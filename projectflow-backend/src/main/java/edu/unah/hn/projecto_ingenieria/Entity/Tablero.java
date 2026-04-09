package edu.unah.hn.projecto_ingenieria.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "tbl_tableros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tablero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tablero")
    private Long idTablero;

    @Column(name = "nombre_tablero")
    private String nombreTablero;

    @Column(name = "descripcion_tablero")
    private String descripcionTablero;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proyecto")
    @JsonBackReference
    private Proyecto proyecto;

    @Column(name="fecha_Inicio")
    private LocalDate fechaInicio;

    @Column(name="fecha_fin")
    private LocalDate fechaFin;

    @OneToMany(mappedBy = "tablero", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Columna> columnas;
}
