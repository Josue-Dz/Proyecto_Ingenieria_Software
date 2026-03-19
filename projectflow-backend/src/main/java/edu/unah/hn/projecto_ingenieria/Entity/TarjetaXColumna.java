package edu.unah.hn.projecto_ingenieria.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_tarjeta_x_columna")
@IdClass(TarjetaXColumnaId.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class TarjetaXColumna {
    
    @Id
    @Column(name = "id_tarjeta")
    private Long idTarjeta;

    @Id
    @Column(name = "id_columna")
    private Long idColumna;

    private Integer posicion;

    @ManyToOne
    @JoinColumn(name = "id_columna", insertable = false, updatable = false)
    private Columna columna;

    @ManyToOne
    @JoinColumn(name = "id_tarjeta", insertable = false, updatable = false)
    private Tarjeta tarjeta;
}
