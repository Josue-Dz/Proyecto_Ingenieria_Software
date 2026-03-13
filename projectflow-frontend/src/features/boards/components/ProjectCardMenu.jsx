import { useState, useRef, useEffect } from "react";

const ProjectCardMenu = ({ onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // Cierra el menú al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className="p-1 rounded-md text-white/30 hover:text-white/70 hover:bg-white/10 transition-colors"
                title="Opciones"
            >
                <span className="material-symbols-rounded text-lg">more_horiz</span>
            </button>


            {open && (
                <div className="absolute right-0 top-7 z-20 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    <button
                        onClick={() => { setOpen(false); onEdit(); }}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                    >
                        
                        <span className="material-symbols-rounded text-base">edit</span>
                        Editar
                    </button>
                    <div className="border-t border-white/8" />
                    <button
                        onClick={() => { setOpen(false); onDelete(); }}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      
                        <span className="material-symbols-rounded text-base">delete</span>
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectCardMenu;