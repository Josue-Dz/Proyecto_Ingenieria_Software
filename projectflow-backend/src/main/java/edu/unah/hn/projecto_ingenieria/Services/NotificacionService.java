package edu.unah.hn.projecto_ingenieria.Services;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.unah.hn.projecto_ingenieria.DTO.DTOMapper;
import edu.unah.hn.projecto_ingenieria.DTO.NotificacionDTO;
import edu.unah.hn.projecto_ingenieria.Entity.Notificacion;
import edu.unah.hn.projecto_ingenieria.Entity.Usuario;
import edu.unah.hn.projecto_ingenieria.Repository.NotificacionRepository;
import edu.unah.hn.projecto_ingenieria.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;

    private final UsuarioRepository usuarioRepository;

    private final DTOMapper mapper;



            public List<NotificacionDTO> getMisNotificaciones() {
            Usuario usuario = getUsuarioAutenticado();
            List<Notificacion> notificaciones = notificacionRepository.findByUsuario_IdUsuario(usuario.getIdUsuario());

            List<NotificacionDTO> resultado = new ArrayList<>();
            for (Notificacion nuevaNotificacion : notificaciones) {
                resultado.add(mapper.toNotificacionDTO(nuevaNotificacion)); // aquí llamas a tu método de conversión
            }
            return resultado;
        }

        public void marcarComoLeida(Long idNotificacion) {
            Notificacion notificacion = notificacionRepository.findById(idNotificacion)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notificación no encontrada"));
            notificacion.setLeida(true);
            notificacionRepository.save(notificacion);
        }

        public Long contarNoLeidas() {
            Usuario usuario = getUsuarioAutenticado();
            return notificacionRepository.countNoLeidasByUsuario(usuario.getIdUsuario());
        }

        @Transactional
        public void marcarTodasComoLeidas() {
            Usuario usuario = getUsuarioAutenticado();
            List<Notificacion> noLeidas = notificacionRepository.findByUsuario_IdUsuario(usuario.getIdUsuario());

            for (Notificacion n : noLeidas) {
                if (!n.getLeida()) {
                    n.setLeida(true);
                }
            }
            notificacionRepository.saveAll(noLeidas);
        }

        private Usuario getUsuarioAutenticado() {
            Usuario principal = (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return usuarioRepository.findByCorreo(principal.getCorreo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario no encontrado"));
        }

}
