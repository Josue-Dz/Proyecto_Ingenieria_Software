package edu.unah.hn.projecto_ingenieria.Entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_usuarios")
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "id_usuario")
    private Long idUsuario;

    private String nombre;

    @Column(unique = true)
    private String correo;

    private String password;

    @JoinColumn(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    private String estado;

    // Relación con proyectos
    @OneToMany(mappedBy = "creador")
    private List<Proyecto> proyectos;
}
