package edu.unah.hn.projecto_ingenieria.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "tbl_proyecto_x_usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProyectoUsuarioId.class)
public class ProyectoUsuario {

         public enum role {
        ADMIN, COLABORADOR, LECTOR
}

    @Id
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_proyecto")
    private Proyecto proyecto;

    @Enumerated(EnumType.STRING)
    private role rol;



}
