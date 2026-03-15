import { useState, useEffect } from "react";
import { updateTaskRequest, markTaskDoneRequest } from "../services/boardService";
 
const PRIORITY_OPTIONS = ["BAJA", "MEDIA", "ALTA"];
 
const PRIORITY_STYLES = {
    ALTA:    { label: "Alta",    class: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
    MEDIA:   { label: "Media",   class: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
    BAJA:    { label: "Baja",    class: "bg-green-500/15 text-green-400 border-green-500/30" },
};
 
const TaskDetailModal = ({ task, onClose, onTaskUpdated }) => {
    const [titulo, setTitulo]         = useState(task.titulo ?? "");
    const [descripcion, setDescripcion] = useState(task.descripcion ?? "");
    const [prioridad, setPrioridad]   = useState(task.prioridad ?? "MEDIA");
    const [fechaLimite, setFechaLimite] = useState(task.fechaLimite ?? "");
    const [isDone, setIsDone]         = useState(task.estado === "COMPLETADA");
    const [saving, setSaving]         = useState(false);
    const [markingDone, setMarkingDone] = useState(false);
 
    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);
 
    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await updateTaskRequest(task.idTarjeta, {
                titulo,
                descripcion,
                prioridad,
                fechaLimite: fechaLimite || null,
            });
            onTaskUpdated(updated);
            onClose();
        } catch (err) {
            console.error("Error al actualizar tarea:", err);
        } finally {
            setSaving(false);
        }
    };
 
    const handleMarkDone = async () => {
        setMarkingDone(true);
        try {
            const updated = await markTaskDoneRequest(task.idTarjeta);
            setIsDone(true);
            onTaskUpdated(updated);
        } catch (err) {
            console.error("Error al marcar tarea:", err);
        } finally {
            setMarkingDone(false);
        }
    };
 
    const priority = PRIORITY_STYLES[prioridad?.toUpperCase()] ?? PRIORITY_STYLES.MEDIA;
 
    return (
        // Overlay
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
 
            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
 
                <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-white/6">
                    <div className="flex items-center gap-3">
                        {isDone && (
                            <span className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                                Completada
                            </span>
                        )}
                        <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${priority.class}`}>
                            {priority.label}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/30 hover:text-white/70 transition-colors"
                    >
                        <span className="material-symbols-rounded text-[20px]">close</span>
                    </button>
                </div>
 
                <div className="px-6 py-5 flex flex-col gap-5">
 
                    <div className="flex flex-col gap-1.5">
                        <label className="text-white/40 text-xs font-medium uppercase tracking-wider">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className="bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/25 transition-colors"
                        />
                    </div>
 
                    <div className="flex flex-col gap-1.5">
                        <label className="text-white/40 text-xs font-medium uppercase tracking-wider">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            rows={3}
                            placeholder="Sin descripción..."
                            className="bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/25 transition-colors resize-none placeholder-white/20"
                        />
                    </div>
 
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-white/40 text-xs font-medium uppercase tracking-wider">Prioridad</label>
                            <select
                                value={prioridad}
                                onChange={e => setPrioridad(e.target.value)}
                                className="bg-white/4 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/25 transition-colors"
                            >
                                {PRIORITY_OPTIONS.map(p => (
                                    <option key={p} value={p}>
                                        {PRIORITY_STYLES[p].label}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        <div className="flex flex-col gap-1.5">
                            <label className="text-white/40 text-xs font-medium uppercase tracking-wider">Fecha límite</label>
                            <input
                                type="date"
                                value={fechaLimite}
                                onChange={e => setFechaLimite(e.target.value)}
                                className="bg-white/4 border border-white/10 rounded-xl px-3 py-2.5 text-white/70 text-sm focus:outline-none focus:border-white/25 transition-colors"
                            />
                        </div>
                    </div>
 
                    {task.fechaCreacion && (
                        <p className="text-white/25 text-xs">
                            Creada el {new Date(task.fechaCreacion).toLocaleDateString("es-HN", {
                                day: "numeric", month: "long", year: "numeric"
                            })}
                        </p>
                    )}
                </div>
 
                <div className="flex items-center justify-between px-6 pb-6 gap-3">
 
                    <button
                        onClick={handleMarkDone}
                        disabled={isDone || markingDone}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                            ${isDone
                                ? "border-green-500/20 text-green-400/50 cursor-not-allowed"
                                : "border-green-500/30 text-green-400 hover:bg-green-500/10 active:scale-95"
                            }`}
                    >
                        <span className="material-symbols-rounded text-[16px]">
                            {isDone ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        {isDone ? "Completada" : "Marcar como hecha"}
                    </button>
 
                    {/* Guardar */}
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-white/10 text-white/40 text-sm hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 rounded-xl bg-[#a3ff12]/15 border border-[#a3ff12]/30 text-[#a3ff12] text-sm font-medium hover:bg-[#a3ff12]/25 transition-colors disabled:opacity-50"
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default TaskDetailModal;