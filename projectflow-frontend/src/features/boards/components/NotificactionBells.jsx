import { useState, useEffect, useRef } from "react";
import {getMisNotificacionesRequest, marcarComoLeidaRequest, marcarTodasComoLeidasRequest, conectarNotificaciones, desconectarNotificaciones} from "../services/notificationService";

const TIPO_ICON = {
    ASIGNACION:      { icon: "assignment_ind", color: "text-indigo-500 dark:text-[#A3FF12]" },
    MOVIMIENTO:      { icon: "swap_horiz",     color: "text-blue-400" },
    FECHA_CAMBIO:    { icon: "event",          color: "text-orange-400" },
    COLUMNA_CREADA:  { icon: "view_column",    color: "text-teal-400" },
    COLUMNA_ELIMINADA:{ icon: "remove_done",   color: "text-red-400" },
    TARJETA_CREADA:  { icon: "add_card",       color: "text-green-400" },
    TARJETA_ELIMINADA:{ icon: "delete",        color: "text-red-400" },
    MIEMBRO_AGREGADO:{ icon: "person_add",     color: "text-purple-400" },
    ROL_CAMBIADO:    { icon: "manage_accounts",color: "text-yellow-400" },
};

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Ahora";
    if (mins < 60) return `Hace ${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Hace ${hrs} h`;
    const days = Math.floor(hrs / 24);
    return `Hace ${days} d`;
}

const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const panelRef = useRef(null);
    const bellRef = useRef(null);

    const noLeidas = notificaciones.filter((n) => !n.leida).length;

    // Carga historial + conecta WebSocket
    useEffect(() => {
        getMisNotificacionesRequest()
            .then(setNotificaciones)
            .catch(console.error)
            .finally(() => setLoading(false));

        conectarNotificaciones((nueva) => {
            setNotificaciones((prev) => [nueva, ...prev]);
        });

        return () => desconectarNotificaciones();
    }, []);

    // Cierra el panel al hacer click fuera
    useEffect(() => {
        const handleClickFuera = (e) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target) &&
                bellRef.current &&
                !bellRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickFuera);
        return () => document.removeEventListener("mousedown", handleClickFuera);
    }, []);

    const handleClickNotificacion = async (notif) => {
        if (!notif.leida) {
            await marcarComoLeidaRequest(notif.idNotificacion);
            setNotificaciones((prev) =>
                prev.map((n) =>
                    n.idNotificacion === notif.idNotificacion ? { ...n, leida: true } : n
                )
            );
        }
    };

    const handleMarcarTodas = async () => {
        await marcarTodasComoLeidasRequest();
        setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
    };

    return (
        <div className="relative" ref={bellRef}>
            {/* Botón campana */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-white/10 transition-colors"
                title="Notificaciones"
            >
                <span className="material-symbols-rounded text-slate-600 dark:text-white text-[22px]">
                    notifications
                </span>
                {noLeidas > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500
                                     text-white text-[9px] font-bold flex items-center justify-center">
                        {noLeidas > 9 ? "9+" : noLeidas}
                    </span>
                )}
            </button>

            {/* Panel */}
            {open && (
                <div
                    ref={panelRef}
                    className="absolute right-0 top-11 w-80 bg-white dark:bg-[#1a1a1a] border
                               border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl
                               overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b
                                    border-slate-100 dark:border-white/8">
                        <h3 className="text-slate-800 dark:text-white font-semibold text-sm">
                            Notificaciones
                            {noLeidas > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-red-500/15
                                                 text-red-500 text-[10px] font-bold">
                                    {noLeidas}
                                </span>
                            )}
                        </h3>
                        {noLeidas > 0 && (
                            <button
                                onClick={handleMarcarTodas}
                                className="text-indigo-500 dark:text-[#A3FF12] text-xs
                                           hover:underline transition-colors"
                            >
                                Marcar todas
                            </button>
                        )}
                    </div>

                    {/* Lista */}
                    <div className="max-h-96 overflow-y-auto">
                        {/* Skeleton de carga */}
                        {loading && (
                            <div className="flex flex-col gap-3 p-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 animate-pulse">
                                        <div className="w-8 h-8 rounded-full bg-slate-200
                                                        dark:bg-white/10 shrink-0" />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="w-full h-3 rounded bg-slate-200
                                                            dark:bg-white/10" />
                                            <div className="w-1/2 h-2.5 rounded bg-slate-200
                                                            dark:bg-white/10" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Estado vacío */}
                        {!loading && notificaciones.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-10 gap-2">
                                <span className="material-symbols-rounded text-slate-300
                                                 dark:text-white/20 text-4xl">
                                    notifications_off
                                </span>
                                <p className="text-slate-400 dark:text-white/30 text-xs">
                                    Sin notificaciones
                                </p>
                            </div>
                        )}

                        {/* Items */}
                        {!loading &&
                            notificaciones.map((notif) => {
                                const tipoStyle =
                                    TIPO_ICON[notif.tipo] ?? TIPO_ICON.ASIGNACION;
                                return (
                                    <button
                                        key={notif.idNotificacion}
                                        onClick={() => handleClickNotificacion(notif)}
                                        className={`w-full flex items-start gap-3 px-4 py-3 text-left
                                                    transition-colors hover:bg-slate-50
                                                    dark:hover:bg-white/5 ${
                                                        !notif.leida
                                                            ? "bg-indigo-50/50 dark:bg-white/3"
                                                            : ""
                                                    }`}
                                    >
                                        {/* Ícono tipo */}
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center
                                                        justify-center shrink-0 ${
                                                            !notif.leida
                                                                ? "bg-indigo-100 dark:bg-[#A3FF12]/15"
                                                                : "bg-slate-100 dark:bg-white/8"
                                                        }`}
                                        >
                                            <span
                                                className={`material-symbols-rounded text-[16px] ${
                                                    !notif.leida
                                                        ? tipoStyle.color
                                                        : "text-slate-400 dark:text-white/30"
                                                }`}
                                            >
                                                {tipoStyle.icon}
                                            </span>
                                        </div>

                                        {/* Texto */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-xs leading-relaxed ${
                                                    !notif.leida
                                                        ? "text-slate-800 dark:text-white font-medium"
                                                        : "text-slate-500 dark:text-white/50"
                                                }`}
                                            >
                                                {notif.mensaje}
                                            </p>
                                            <p className="text-[10px] text-slate-400
                                                          dark:text-white/25 mt-0.5">
                                                {timeAgo(notif.fechaCreacion)}
                                            </p>
                                        </div>

                                        {/* Punto no leída */}
                                        {!notif.leida && (
                                            <div className="w-2 h-2 rounded-full bg-indigo-500
                                                            dark:bg-[#A3FF12] shrink-0 mt-1" />
                                        )}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;