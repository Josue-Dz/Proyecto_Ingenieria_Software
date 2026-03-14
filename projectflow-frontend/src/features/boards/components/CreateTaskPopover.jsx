import React, { useEffect, useRef, useState } from 'react'

const CreateTaskPopover = ({ onAddTask, columnId }) => {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDesc] = useState("");
    const [prioridad, setPrioridad] = useState("MEDIA");
    const [fechaLimite, setFecha] = useState("");
    const [loading, setLoading] = useState(false);
    const popoverRef = useRef(null);


    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedow", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        setLoading(true);
        await onAddTask(columnId, {
            titulo,
            descripcion: descripcion || null,
            prioridad,
            fechaLimite: fechaLimite || null,
        });
        setTitulo("");
        setDesc("");
        setPrioridad("MEDIA");
        setFecha("");

        setOpen(false);
        setLoading(false);
    }


    return (
        <div className="relative mt-1" ref={popoverRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-white/25 text-xs hover:text-white/50 hover:bg-white/5 transition-colors w-full"
            >
                <span className="material-symbols-rounded text-[14px]">add</span>
                Agregar tarea
            </button>

            {open && (
                <div className="absoule bottom-full left-0 mb-2 w-72 bg-[#111] border border-white/10">
                    <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#111] border-r border-white/10" />
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
                        Nueva tarea
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                        
                        <input
                            autoFocus
                            type="text"
                            placeholder="Titulo *"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
                        />

                        <textarea
                            placeholder="Descripción (opcional)"
                            value={descripcion}
                            onChange={e => setDesc(e.target.value)}
                            row={2}
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors resize-none"
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <select
                                value={prioridad}
                                onChange={e => setPrioridad(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-xs focus:outline-none focus:border-white/25 transition-colors"
                            >
                                <option value="BAJA">Baja</option>
                                <option value="MEDIA">Media</option>
                                <option value="ALTA">Alta</option>
                                
                            </select>

                            <input
                                type="date"
                                value={fechaLimite}
                                onChange={e => setFecha(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white/70 text-xs focus:outline-none focus:border-white/25 transition-colors"
                            />

                        </div>
                        <div className="flex gap-2 mt-1">
                            <button
                                type="submit"
                                disabled={loading || !titulo.trim()}
                                className="flex-1 py-2 rounded-xl bg-[#A3FF12]/15 border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-medium hover:bg-[#a3FF12]/25 transition-colors disabled:opacity-40"
                            >
                                {loading ? "Creando..." : "Crear tarea"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-3 py-2 rounded-xl border border-white/10 text-white/30 text-xs hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                        
                    </form>
                </div>
            )}

        </div>
    )
}

export default CreateTaskPopover