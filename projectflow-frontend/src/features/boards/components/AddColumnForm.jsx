
import { useEffect, useRef, useState } from "react";

const AddColumnForm = ({ canCreate, addColumn }) => {

    const [open, setOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [addingColumn, setAddingColumn] = useState(false);

    const popoverRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    const handleAddColumn = async (e) => {
        e.preventDefault();
        if (!newColumnName.trim() || !canCreate) return;

        setAddingColumn(true);
        await addColumn(newColumnName.trim());

        setNewColumnName("");
        setAddingColumn(false);
        setOpen(false);
    };

    if (!canCreate) return null;

    return (
        <div className="relative py-1" ref={popoverRef}>
            
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-800 dark:border-white/15 dark:text-white/30 text-sm
                dark:hover:border-white/25 dark:hover:text-white/50 dark:hover:bg-white/8 
                hover:bg-[#daddec] shadow transition-colors"
            >
                <span className="material-symbols-rounded text-[18px]">add</span>
                Nueva Columna
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-72 p-3 rounded-2xl 
                bg-white dark:bg-[#111] 
                border border-indigo-400/15 dark:border-white/10 
                shadow-xl z-50 
                animate-in fade-in zoom-in-95">

                    <form onSubmit={handleAddColumn} className="flex flex-col gap-2">

                        <input
                            autoFocus
                            type="text"
                            placeholder="Nombre de la columna"
                            value={newColumnName}
                            onChange={e => setNewColumnName(e.target.value)}
                            className="dark:bg-white/5 border border-indigo-400/30 dark:border-white/15 rounded-xl px-3 py-2 
                            dark:text-white text-sm 
                            placeholder-[#c5d8ff] dark:placeholder-white/20 
                            focus:outline-none dark:focus:border-[#A3FF12]/40 transition-colors"
                        />

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={addingColumn || !newColumnName.trim()}
                                className="flex-1 py-1.5 rounded-xl text-white bg-indigo-600 
                                dark:bg-[#A3FF12]/15 border dark:border-[#A3FF12]/30 
                                text-xs font-medium 
                                dark:hover:bg-[#A3FF12]/25 transition-colors 
                                disabled:opacity-50"
                            >
                                {addingColumn ? "Creando..." : "Crear"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    setNewColumnName("");
                                }}
                                className="flex-1 py-1.5 rounded-lg border border-gray-500 
                                dark:border-white/10 dark:text-white/40 text-xs 
                                dark:hover:bg-white/5 transition-colors"
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

export default AddColumnForm;