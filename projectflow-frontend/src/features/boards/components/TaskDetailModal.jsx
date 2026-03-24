import { useState, useEffect } from "react";
import { updateTaskRequest } from "../services/boardService";
import { searchUserRequest } from "../services/boardService";

const PRIORITY_OPTIONS = ["BAJA", "MEDIA", "ALTA"];

const PRIORITY_STYLES = {
    ALTA:  { label: "Alta",  class: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
    MEDIA: { label: "Media", class: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
    BAJA:  { label: "Baja",  class: "bg-green-500/15 text-green-400 border-green-500/30" },
};

const ESTADO_OPTIONS = ["PENDIENTE", "EN_PROGRESO", "FINALIZADA"];
const ESTADO_STYLES = {
    PENDIENTE:   { label: "Pendiente",   class: "bg-slate-500/15 text-slate-400 border-slate-500/30" },
    EN_PROGRESO: { label: "En progreso", class: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    FINALIZADA:  { label: "Finalizada",  class: "bg-green-500/15 text-green-400 border-green-500/30" },
};

const TaskDetailModal = ({ task, onClose, onTaskUpdated }) => {
    const [titulo, setTitulo]             = useState(task.titulo ?? "");
    const [descripcion, setDescripcion]   = useState(task.descripcion ?? "");
    const [prioridad, setPrioridad]       = useState(task.prioridad ?? "MEDIA");
    const [fechaLimite, setFechaLimite]   = useState(task.fechaLimite ?? "");
    const [estado, setEstado]             = useState(task.estado ?? "PENDIENTE");
    const [asignados, setAsignados]       = useState(task.asignados ?? []);
    const [saving, setSaving]             = useState(false);

    const [searchCorreo, setSearchCorreo] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [searching, setSearching]       = useState(false);
    const [searchError, setSearchError]   = useState(null);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleSearch = async () => {
        if (!searchCorreo.trim()) return;
        setSearching(true);
        setSearchError(null);
        setSearchResult(null);
        try {
            const user = await searchUserRequest(searchCorreo.trim());
            // Verificar que no esté ya asignado
            const yaAsignado = asignados.some(a => a.correo === user.correo);
            if (yaAsignado) {
                setSearchError("Este usuario ya está asignado.");
            } else {
                setSearchResult(user);
            }
        } catch {
            setSearchError("No se encontró ningún usuario con ese correo.");
        } finally {
            setSearching(false);
        }
    };

    const handleAddUser = () => {
        if (!searchResult) return;
        setAsignados(prev => [...prev, searchResult]);
        setSearchResult(null);
        setSearchCorreo("");
    };

    const handleRemoveUser = (correo) => {
        setAsignados(prev => prev.filter(a => a.correo !== correo));
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
            onTaskUpdated(updated);
            onClose();
        } catch (err) {
            console.error("Error al actualizar tarea:", err);
        } finally {
            setSaving(false);
        }
    };

    const priority = PRIORITY_STYLES[prioridad?.toUpperCase()] ?? PRIORITY_STYLES.MEDIA;
    const estadoStyle = ESTADO_STYLES[estado?.toUpperCase()] ?? ESTADO_STYLES.PENDIENTE;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

            <div className="relative z-10 w-full max-w-3xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/6">
                    <div className="flex items-center gap-2">
                        <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${priority.class}`}>
                            {priority.label}
                        </span>
                        <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${estadoStyle.class}`}>
                            {estadoStyle.label}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
                        <span className="material-symbols-rounded text-[20px]">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="flex gap-0 max-h-[75vh] overflow-y-auto">

                    {/* Columna izquierda */}
                    <div className="flex-1 px-6 py-5 flex flex-col gap-5">

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
                                rows={4}
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
                                        <option key={p} value={p}>{PRIORITY_STYLES[p].label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-white/40 text-xs font-medium uppercase tracking-wider">Estado</label>
                                <select
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                    className="bg-white/4 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/25 transition-colors"
                                >
                                    {ESTADO_OPTIONS.map(s => (
                                        <option key={s} value={s}>{ESTADO_STYLES[s].label}</option>
                                    ))}
                                </select>
                            </div>
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

                        {task.fechaCreacion && (
                            <p className="text-white/25 text-xs">
                                Creada el {new Date(task.fechaCreacion).toLocaleDateString("es-HN", {
                                    day: "numeric", month: "long", year: "numeric"
                                })}
                            </p>
                        )}
                    </div>

                    {/* Columna derecha*/}
                    <div className="w-56 border-l border-white/6 px-4 py-5 flex flex-col gap-4 shrink-0">

                        <div className="flex flex-col gap-3">
                            <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Miembros</p>

                            {/* Asignados actuales */}
                            <div className="flex flex-col gap-2">
                                {asignados.length === 0 && (
                                    <p className="text-white/20 text-xs">Sin asignados</p>
                                )}
                                {asignados.map(user => (
                                    <div key={user.correo} className="flex items-center gap-2 group">
                                        <div className="w-7 h-7 rounded-full bg-indigo-500/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                                            <span className="text-[0.6rem] font-semibold text-indigo-300">
                                                {user.iniciales}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white/80 text-xs font-medium truncate">{user.nombreCompleto}</p>
                                            <p className="text-white/30 text-[0.6rem] truncate">{user.correo}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveUser(user.correo)}
                                            className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all"
                                        >
                                            <span className="material-symbols-rounded text-[14px]">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Buscador */}
                            <div className="flex flex-col gap-2 pt-1 border-t border-white/6">
                                <p className="text-white/30 text-[0.65rem]">Buscar por correo</p>
                                <div className="flex gap-1.5">
                                    <input
                                        type="email"
                                        value={searchCorreo}
                                        onChange={e => { setSearchCorreo(e.target.value); setSearchError(null); setSearchResult(null); }}
                                        onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
                                        placeholder="correo@..."
                                        className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        disabled={searching || !searchCorreo.trim()}
                                        className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors disabled:opacity-40"
                                    >
                                        <span className="material-symbols-rounded text-[14px]">
                                            {searching ? "hourglass_empty" : "search"}
                                        </span>
                                    </button>
                                </div>

                                {searchError && (
                                    <p className="text-red-400/70 text-[0.65rem]">{searchError}</p>
                                )}

                                {searchResult && (
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
                                        <div className="w-7 h-7 rounded-full bg-indigo-500/30 border border-indigo-500/40 flex items-center justify-center shrink-0">
                                            <span className="text-[0.6rem] font-semibold text-indigo-300">
                                                {searchResult.iniciales}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white/80 text-xs font-medium truncate">{searchResult.nombreCompleto}</p>
                                            <p className="text-white/30 text-[0.6rem] truncate">{searchResult.correo}</p>
                                        </div>
                                        <button
                                            onClick={handleAddUser}
                                            className="text-[#a3ff12]/70 hover:text-[#a3ff12] transition-colors"
                                        >
                                            <span className="material-symbols-rounded text-[16px]">add</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-4 border-t border-white/6 gap-2">
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
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;