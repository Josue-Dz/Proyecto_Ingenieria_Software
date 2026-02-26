package edu.unah.hn.projecto_ingenieria.Entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    private String nombre;

    @Column(name = "apellido", nullable = false)
    private String apellido;

    @Column(unique = true)
    private String correo;

    private String password;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    private String estado;

    // Relación con proyectos
    @OneToMany(mappedBy = "creador")
    private List<Proyecto> proyectos;

    // Relación con proyectos (muchos a muchos a través de ProyectoUsuario)
    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
    private List<ProyectoUsuario> proyectosUsuario;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (proyectosUsuario == null)
            return Collections.emptyList(); // ← evita Null PointerException
        return proyectosUsuario.stream()
                .map(pu -> new SimpleGrantedAuthority("ROLE_" + pu.getRol().name()))
                .collect(Collectors.toSet());
    }

    @Override
    public String getUsername() {
        return correo;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "A".equalsIgnoreCase(estado);
    }

    public String obtenerInicialesDeNombre(String nombre, String apellido){
        char inicialNombre = nombre.toUpperCase().charAt(0);
        char inicialApellido = apellido.toUpperCase().charAt(0);
        return "" + inicialNombre + inicialApellido;
    }
}
