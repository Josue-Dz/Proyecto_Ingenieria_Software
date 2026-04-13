import { useEffect, useRef, useState } from 'react'

const CreateTaskPopover = ({ onAddTask, columnId }) => {
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [loading, setLoading] = useState(false);
    const popoverRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClick = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;

        setLoading(true);
        await onAddTask(columnId, { titulo });

        setTitulo("");
        setOpen(false);
        setLoading(false);
    };

    return (
        <div className="relative mt-1" ref={popoverRef}>
  
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl 
                text-slate-600 dark:text-white/30 
                text-xs 
                hover:bg-[#e7eaf9] dark:hover:bg-white/5 
                hover:text-slate-800 dark:hover:text-white/60
                transition-colors w-full border border-dashed border-slate-300 dark:border-white/15"
            >
                <span className="material-symbols-rounded text-[14px]">add</span>
                Agregar tarea
            </button>

            {open && (
                <div className=" bottom-full left-0 mb-2 w-72 p-3 rounded-2xl 
                bg-white dark:bg-[#111] 
                border border-slate-200 dark:border-white/10 
                shadow-xl z-50">

                    <p className="text-slate-500 dark:text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
                        Nueva tarea
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Título *"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className="
                            bg-white dark:bg-white/5
                            border border-slate-300 dark:border-white/10
                            rounded-xl px-3 py-2
                            text-slate-800 dark:text-white
                            text-sm
                            placeholder-slate-400 dark:placeholder-white/30
                            focus:outline-none
                            focus:ring-2 focus:ring-indigo-500/30
                            focus:border-indigo-400 dark:focus:border-white/25
                            transition"
                        />

                        <div className="flex gap-2 mt-1">

                            <button
                                type="submit"
                                disabled={loading || !titulo.trim()}
                                className="
                                flex-1 py-2 rounded-xl 
                                text-white 
                                bg-indigo-600 hover:bg-indigo-500
                                dark:bg-[#A3FF12]/15 dark:text-[#A3FF12]
                                dark:border dark:border-[#A3FF12]/30
                                text-xs font-medium 
                                transition 
                                disabled:opacity-50"
                            >
                                {loading ? "Creando..." : "Crear tarea"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="
                                px-3 py-2 rounded-xl 
                                border border-slate-300 dark:border-white/10 
                                text-slate-600 dark:text-white/40 
                                text-xs 
                                hover:bg-slate-100 dark:hover:bg-white/5 
                                transition"
                            >
                                Cancelar
                            </button>

                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateTaskPopover;