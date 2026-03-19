package edu.unah.hn.projecto_ingenieria.Services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.DTO.UsuarioDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final DTOMapper mapper;

    public UsuarioDTO buscarUsuario(String correo){
        Usuario usuario = usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Este usuario no existe"));
        return mapper.toUsuarioDTO(usuario);
    }

}
