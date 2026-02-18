package edu.unah.hn.projecto_ingenieria.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_usuarios")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Usuario {
    @Id
    @Column(name = "id_usuario")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;

    private String nombre;

    @Column(name = "correo")
    private String email;

    private String password;

    @Column(name = "fecha_registro")
    private Date fechaRegistro;

    private char estado;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProyectoUsuario> proyectoUsuarios;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TarjetaUsuario> tarjetaUsuarios;

    @OneToMany(mappedBy = "usuarioCreador", cascade = CascadeType.ALL)
    private List<Proyecto> proyectosCreados;

    @OneToMany(mappedBy = "usuarioCreador", cascade = CascadeType.ALL)
    private List<Tarjeta> tarjetasCreadas;
}
