import { useState, useEffect, useRef } from "react";
import { useHistorial } from "../hooks/useHistorial";

const TIPO_COLOR = {
    TARJETA_CREADA:       "#22c55e",
    TARJETA_ELIMINADA:    "#ef4444",
    TARJETA_MOVIDA:       "#3b82f6",
    RESPONSABLE_ASIGNADO: "#a855f7",
    COLUMNA_CREADA:       "#14b8a6",
    COLUMNA_ELIMINADA:    "#ef4444",
    MIEMBRO_AGREGADO:     "#a855f7",
    ROL_CAMBIADO:         "#f59e0b",
    FECHA_CAMBIO:         "#f97316",
    ESTADO_CAMBIADO:      "#06b6d4",
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

const ActivityPanel = ({ idProyecto }) => {
    const [open, setOpen] = useState(false);
    const { historial, loading } = useHistorial(idProyecto, open);

    const panelRef = useRef(null);
    const buttonRef = useRef(null);

    // Cerrar al hacer click fuera 
    useEffect(() => {
        const handleClickFuera = (e) => {
            if (
                panelRef.current && !panelRef.current.contains(e.target) &&
                buttonRef.current && !buttonRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickFuera);
        return () => document.removeEventListener("mousedown", handleClickFuera);
    }, []);

    return (
        <div className="relative" ref={buttonRef}>

            {/* Botón */}
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-center md:w-12 rounded-md hover:bg-gray-500/10
                 p-1 transition-colors"
                title="Actividad"
            >
                <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12] shrink-0">
                    history
                </span>
            </button>

            {/* Panel flotante */}
            {open && (
                <div
                    ref={panelRef}
                    className="absolute right-0 top-11 w-72 bg-white dark:bg-[#1a1a1a]
                     border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl
                     overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b
                     border-slate-100 dark:border-white/8">
                        <h3 className="text-slate-800 dark:text-white font-semibold text-sm
                         flex items-center gap-2">
                            <span className="material-symbols-rounded text-slate-400
                             dark:text-white/40 text-[16px]">history</span>
                            Actividad
                        </h3>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-slate-400 dark:text-white/30 hover:text-slate-600
                             dark:hover:text-white/60 transition-colors"
                        >
                            <span className="material-symbols-rounded text-[16px]">close</span>
                        </button>
                    </div>

                    {/* Lista */}
                    <div className="max-h-96 overflow-y-auto">

                        {loading && (
                            <div className="flex flex-col gap-3 p-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-slate-200
                                         dark:bg-white/10 shrink-0 mt-1.5" />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="w-1/3 h-2.5 rounded
                                             bg-slate-200 dark:bg-white/10" />
                                            <div className="w-full h-2 rounded
                                             bg-slate-200 dark:bg-white/10" />
                                            <div className="w-1/4 h-2 rounded
                                             bg-slate-200 dark:bg-white/10" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!loading && historial.length === 0 && (
                            <div className="flex flex-col items-center justify-center
                             py-10 gap-2">
                                <span className="material-symbols-rounded text-slate-300
                                 dark:text-white/20 text-4xl">manage_search</span>
                                <p className="text-slate-400 dark:text-white/30 text-xs">
                                    Sin actividad registrada
                                </p>
                            </div>
                        )}

                        {!loading && historial.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 px-4 py-3 border-b
                                 border-slate-50 dark:border-white/5 last:border-0
                                 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                            >
                                {/* Punto de color */}
                                <div
                                    className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                                    style={{ backgroundColor: TIPO_COLOR[item.tipo] ?? "#94a3b8" }}
                                />

                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-semibold text-indigo-500
                                     dark:text-[#A3FF12] truncate">
                                        {item.usuarioAccion}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-white/60
                                     leading-relaxed mt-0.5">
                                        {item.mensaje}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1">
                                        {timeAgo(item.fechaCreacion)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityPanel;