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
@Table(name = "tbl_tableros")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tablero {
    @Id
    @Column(name = "id_tablero")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTablero;

    @ManyToOne
    @Column(name = "id_proyecto")
    private Proyecto proyecto;

    @OneToMany(mappedBy = "tablero", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Columna> columnas;
}