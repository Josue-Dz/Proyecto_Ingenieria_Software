import { useState, useEffect } from "react";
import { updateTaskRequest } from "../../boards/services/boardService";
import { getMembersRequest } from "../../members/services/MemberService";
import { createSubtaskRequest, getSubtasksRequest, toggleSubtaskRequest } from "../services/subtareaService";

const PRIORITY_OPTIONS = ["BAJA", "MEDIA", "ALTA"];

const PRIORITY_STYLES = {
    ALTA: { label: "Alta", class: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
    MEDIA: { label: "Media", class: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
    BAJA: { label: "Baja", class: "bg-green-500/15 text-green-400 border-green-500/30" },
};

const ESTADO_OPTIONS = ["PENDIENTE", "EN_PROGRESO", "FINALIZADA"];
const ESTADO_STYLES = {
    PENDIENTE: { label: "Pendiente", class: "bg-slate-500/15 text-slate-400 border-slate-500/30" },
    EN_PROGRESO: { label: "En progreso", class: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    FINALIZADA: { label: "Finalizada", class: "bg-green-500/15 text-green-400 border-green-500/30" },
};

const TaskDetailModal = ({ task, proyectoId, userRol, onClose, onTaskUpdated }) => {
    const [titulo, setTitulo] = useState(task.titulo ?? "");
    const [descripcion, setDescripcion] = useState(task.descripcion ?? "");
    const [prioridad, setPrioridad] = useState(task.prioridad ?? "MEDIA");
    const [fechaLimite, setFechaLimite] = useState(task.fechaLimite ?? "");
    const [estado, setEstado] = useState(task.estado ?? "PENDIENTE");
    const [asignados, setAsignados] = useState(task.asignados ?? []);
    const [saving, setSaving] = useState(false);
    const [miembros, setMiembros] = useState([]);
    const [showMiembros, setShowMiembros] = useState(false);

    const [subtareas, setSubtareas] = useState([]);
    const [nuevaSubtarea, setNuevaSubtarea] = useState("");

    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Cargar miembros del proyecto
    useEffect(() => {
        if (!proyectoId) return;
        getMembersRequest(proyectoId)
            .then(data => {
                // Excluir lectores de la lista de asignables
                const asignables = data.filter(m => m.rol !== "LECTOR");
                setMiembros(asignables);
            })
            .catch(console.error);
    }, [proyectoId]);


    useEffect(() => {
        const loadSubtasks = async () => {
            if (!task?.idTarjeta) return;

            try {
                const data = await getSubtasksRequest(task.idTarjeta);
                setSubtareas(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadSubtasks();
    }, [task?.idTarjeta]);



    const isAsignado = (correo) => asignados.some(a => a.correo === correo);

    const handleToggleMiembro = (miembro) => {
        if (isAsignado(miembro.correo)) {
            setAsignados(prev => prev.filter(a => a.correo !== miembro.correo));
        } else {
            setAsignados(prev => [...prev, {
                correo: miembro.correo,
                nombreCompleto: `${miembro.nombre} ${miembro.apellido}`,
                iniciales: miembro.iniciales,
            }]);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await updateTaskRequest(task.idTarjeta, {
                titulo,
                descripcion,
                prioridad,
                fechaLimite: fechaLimite || null,
                estado,
                usuariosAsignados: asignados.map(a => a.correo),
            });

            const completadas = subtareas.filter(st => st.completada).length;
            const total = subtareas.length;
            onTaskUpdated({
                ...updated,
                totalSubtareas: total,
                subtareasCompletadas: completadas
            });
            onClose();
        } catch (err) {
            console.error("Error al actualizar tarea:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleAddSubtask = async () => {
        if (!nuevaSubtarea.trim()) return;

        try {
            const nueva = await createSubtaskRequest(
                task.idTarjeta,
                nuevaSubtarea
            );

            setSubtareas(prev => [...prev, nueva]);

            setNuevaSubtarea("");

        } catch (error) {
            console.error(error);
        }
    };

    const toggleSubtask = async (id) => {
        try {
            const updated = await toggleSubtaskRequest(id);

            setSubtareas(prev =>
                prev.map(st =>
                    st.idSubtarea === id ? updated : st
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    const progreso = subtareas.length === 0
        ? 0
        : Math.round(
            (subtareas.filter(st => st.completada).length / subtareas.length) * 100
        );

    const priority = PRIORITY_STYLES[prioridad?.toUpperCase()] ?? PRIORITY_STYLES.MEDIA;
    const estadoStyle = ESTADO_STYLES[estado?.toUpperCase()] ?? ESTADO_STYLES.PENDIENTE;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-white/6">
                    <div className="flex items-center gap-2">
                        <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${priority.class}`}>
                            {priority.label}
                        </span>
                        <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${estadoStyle.class}`}>
                            {estadoStyle.label}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/70 transition-colors">
                        <span className="material-symbols-rounded text-[20px]">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="flex gap-0 max-h-[75vh] overflow-y-auto">

                    {/* Columna izquierda */}
                    <div className="flex-1 px-6 py-5 flex flex-col gap-5">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Título</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                className="bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-white/25 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                                rows={4}
                                placeholder="Sin descripción..."
                                className="bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-white/25 transition-colors resize-none placeholder-slate-300 dark:placeholder-white/20"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Prioridad</label>
                                <select
                                    value={prioridad}
                                    onChange={e => setPrioridad(e.target.value)}
                                    className="bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-white/25 transition-colors"
                                >
                                    {PRIORITY_OPTIONS.map(p => (
                                        <option key={p} value={p} className="bg-white dark:bg-[#0f0f0f]">{PRIORITY_STYLES[p].label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Estado</label>
                                <select
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                    className="bg-slate-50 dark:bg-white/4 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-white/25 transition-colors"
                                >
                                    {ESTADO_OPTIONS.map(s => (
                                        <option key={s} value={s} className="bg-white dark:bg-[#0f0f0f]">{ESTADO_STYLES[s].label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/*Barra de porcentaje */}
                        {subtareas.length > 0 && <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[11px] text-slate-400">
                                <span>Progreso</span>
                                <span>{progreso}%</span>
                            </div>

                            <div className="w-full bg-gray-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${progreso === 100
                                        ? "bg-green-500"
                                        : progreso > 50
                                            ? "bg-indigo-500"
                                            : "bg-yellow-500"
                                        }`}
                                    style={{ width: `${progreso}%` }}
                                />
                            </div>
                        </div>}

                        {/*Checklist */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-slate-400 uppercase">Checklist</label>

                            {subtareas.length === 0 && (
                                <p className="text-xs text-slate-400">
                                    No hay subtareas aún
                                </p>
                            )}

                            {subtareas.map(st => (
                                <div key={st.idSubtarea} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={st.completada}
                                        onChange={() => toggleSubtask(st.idSubtarea)}
                                    />
                                    <span className={`text-sm ${st.completada ? "line-through opacity-50" : ""}`}>
                                        {st.descripcion}
                                    </span>
                                </div>
                            ))}

                            <div className="flex gap-2 mt-2">
                                <input
                                    value={nuevaSubtarea}
                                    onChange={e => setNuevaSubtarea(e.target.value)}
                                    placeholder="Nueva subtarea..."
                                    className="flex-1 text-sm px-2 py-1 rounded border"
                                />
                                <button onClick={handleAddSubtask}>
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Fecha límite</label>
                            <input
                                type="date"
                                value={fechaLimite}
                                onChange={e => setFechaLimite(e.target.value)}
                                className="bg-slate-50 dark:bg-white/4 border border-slate-200
                                 dark:border-white/10 rounded-xl px-3 py-2.5 text-slate-600
                                  dark:text-white/70 text-sm focus:outline-none focus:border-indigo-400
                                   dark:focus:border-white/25 transition-colors scheme-light dark:scheme-dark"
                            />
                        </div>

                        {task.fechaCreacion && (
                            <p className="text-slate-300 dark:text-white/25 text-xs">
                                Creada el {new Date(task.fechaCreacion).toLocaleDateString("es-HN", {
                                    day: "numeric", month: "long", year: "numeric"
                                })}
                            </p>
                        )}
                    </div>

                    {/* Columna derecha — miembros */}
                    <div className="w-56 border-l border-slate-100 dark:border-white/6 px-4 py-5 flex flex-col gap-4 shrink-0">
                        <div className="flex flex-col gap-3">
                            <p className="text-slate-400 dark:text-white/40 text-xs font-medium uppercase tracking-wider">Miembros</p>

                            {/* Asignados actuales */}
                            <div className="flex flex-col gap-2">
                                {asignados.length === 0 && (
                                    <p className="text-slate-300 dark:text-white/20 text-xs">Sin asignados</p>
                                )}
                                {asignados.map(user => (
                                    <div key={user.correo} className="flex items-center gap-2 group">
                                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-500/30 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center shrink-0">
                                            <span className="text-[0.6rem] font-semibold text-indigo-500 dark:text-indigo-300">
                                                {user.iniciales}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-700 dark:text-white/80 text-xs font-medium truncate">{user.nombreCompleto}</p>
                                            <p className="text-slate-400 dark:text-white/30 text-[0.6rem] truncate">{user.correo}</p>
                                        </div>
                                        <button
                                            onClick={() => handleToggleMiembro(user)}
                                            className="opacity-0 group-hover:opacity-100 text-slate-300 dark:text-white/30 hover:text-red-400 transition-all"
                                        >
                                            <span className="material-symbols-rounded text-[14px]">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Lista de miembros del proyecto */}
                            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-white/6">
                                {userRol === "ADMIN" && (
                                    <button
                                        onClick={() => setShowMiembros(!showMiembros)}
                                        className="flex items-center gap-1.5 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/60 text-[0.65rem] transition-colors"
                                    >
                                        <span className="material-symbols-rounded text-[14px]">
                                            {showMiembros ? "expand_less" : "person_add"}
                                        </span>
                                        {showMiembros ? "Cerrar" : "Asignar miembro"}
                                    </button>
                                )}

                                {showMiembros && (
                                    <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                                        {miembros.length === 0 && (
                                            <p className="text-slate-300 dark:text-white/20 text-xs">No hay miembros.</p>
                                        )}
                                        {miembros.map(miembro => {
                                            const asignado = isAsignado(miembro.correo);
                                            return (
                                                <button
                                                    key={miembro.idUsuario}
                                                    onClick={() => handleToggleMiembro(miembro)}
                                                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-left ${asignado
                                                        ? "bg-[#a3ff12]/10 border border-[#a3ff12]/20"
                                                        : "hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                                                        }`}
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/30 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center shrink-0">
                                                        <span className="text-[0.55rem] font-semibold text-indigo-500 dark:text-indigo-300">
                                                            {miembro.iniciales}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-slate-600 dark:text-white/70 text-xs truncate">
                                                            {miembro.nombre} {miembro.apellido}
                                                        </p>
                                                    </div>
                                                    {asignado && (
                                                        <span className="material-symbols-rounded text-[#a3ff12] text-[14px]">check</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 dark:border-white/6 gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 text-sm hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-[#a3ff12]/15 border border-indigo-600 dark:border-[#a3ff12]/30 text-white dark:text-[#a3ff12] text-sm font-medium dark:hover:bg-[#a3ff12]/25 transition-colors disabled:opacity-50"
                    >
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;