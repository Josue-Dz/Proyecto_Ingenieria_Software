package edu.unah.hn.projecto_ingenieria.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_backlog")
@Getter 
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_backlog")
    private Long idBacklog;

    @OneToOne
    @JoinColumn(name = "id_proyecto")
    private Proyecto proyecto;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_backlog")
    private List<Tarjeta> tarjetas;

}
