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
        document.addEventListener("mousedow", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        setLoading(true);
        await onAddTask(columnId, {
            titulo
        });

        setTitulo("");

        setOpen(false);
        setLoading(false);
    }


    return (
        <div className="relative mt-1" ref={popoverRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-slate-500 dark:text-white/25 text-xs dark:hover:text-white/50 dark:hover:bg-white/5 hover:bg-[#edf4ff] transition-colors w-full"
            >
                <span className="material-symbols-rounded text-[14px]">add</span>
                Agregar tarea
            </button>

            {open && (
                <div className="absoule bottom-full rounded-xl left-0 mb-2 max-w-70 p-1 bg-white dark:bg-[#111] border border-white/95 shadow-md dark:border-white/10">
                    {/* <div className="absolute left-4 w-3 h-3 dark:bg-[#111] border-r border-white/10" /> */}
                    <p className="text-gray-500 dark:text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
                        Nueva tarea
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

                        <input
                            autoFocus
                            type="text"
                            placeholder="Titulo *"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className="dark:bg-white/5 border dark:border-white/10 rounded-xl px-3 py-2 dark:text-white text-xs placeholder-[#c5d8ff] dark:placeholder-white/20 focus:outline-none dark:focus:border-white/25 transition-colors"
                        />

                        <div className="flex gap-2 mt-1">
                            <button
                                type="submit"
                                disabled={loading || !titulo.trim()}
                                className="flex-1 py-2 rounded-xl text-white bg-[#414dea] dark:bg-[#A3FF12]/15 border dark:border-[#A3FF12]/30 dark:text-[#A3FF12] text-xs font-medium dark:hover:bg-[#a3FF12]/25 transition-colors disabled:bg-[#5f76f5]/50 disabled:dark:bg-[#A3FF12]/15 disabled:dark:opacity-40"
                            >
                                {loading ? "Creando..." : "Crear tarea"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-3 py-2 rounded-xl border dark:border-white/10 dark:text-white/30 text-xs hover:bg-white/5 transition-colors"
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