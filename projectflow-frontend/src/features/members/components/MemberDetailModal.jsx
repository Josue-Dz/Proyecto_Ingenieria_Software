import { useRef, useEffect } from "react";
import { ROLES, rolBadge } from "../constants/roles";
import { useMemberModal } from "../hooks/useMemberModal";

const MemberDetailModal = ({ member, anchorRef, onClose, onRolChange, onRemove, isAdmin }) => {
    const modalRef = useRef(null);
    const {editingRol,
        setEditingRol,
        rolLoading,
        removeLoading,
        error,
        handleRolSave,
        handleRemove,
    } = useMemberModal(member, onRolChange, onRemove, onClose);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                modalRef.current && 
                !modalRef.current.contains(e.target) &&
                anchorRef.current && 
                !anchorRef.current.contains(e.target)
            ) {
                onClose();
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [anchorRef, onClose]);

    return (
        <div
            ref={modalRef}
            className="absolute z-50 top-12 right-0 w-56 bg-white dark:bg-[#1a1a1a] border
             border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 space-y-3"
        >
            {/* Info del miembro */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-[#A3FF12]/15 border
                 border-indigo-300 dark:border-[#A3FF12]/25 flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 
                    dark:text-[#A3FF12] font-bold text-sm">
                        {member.iniciales}
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="text-slate-800 dark:text-white text-sm font-semibold truncate">
                        {member.nombre} {member.apellido}
                    </p>
                    <p className="text-slate-400 dark:text-white/40 text-xs truncate">
                        {member.correo}
                    </p>
                </div>
            </div>

            {/* Badge de rol actual */}
            <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${rolBadge(member.rol)}`}>
                    {member.rol}
                </span>
            </div>

            {/* Acciones solo para admin */}
            {isAdmin && (
                <>
                    <div className="border-t border-slate-100 dark:border-white/8" />
                    
                    {/* Selector de rol */}            
                <div className="space-y-1.5">
                    <label className="text-slate-600 dark:text-white/40 text-xs font-medium">
                        Cambiar rol
                    </label>
                    <select
                        value={editingRol}
                        onChange={(e) => setEditingRol(e.target.value)}
                        className="w-full bg-white dark:bg-white/5 border border-slate-300
                         dark:border-white/10 rounded-lg px-3 py-1.5 text-slate-700
                          dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500
                           dark:focus:ring-[#A3FF12]/40 focus:border-transparent transition-all duration-200"
                    >
                        {ROLES.map((rol) => (
                            <option 
                                key={rol} 
                                value={rol}
                                className="bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-white
                                 hover:bg-indigo-50 dark:hover:bg-[#A3FF12]/10"
                            >
                                {rol}
                            </option>
                        ))}
                    </select>
                        <button
                            onClick={handleRolSave}
                            disabled={rolLoading}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg
                             bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600
                              dark:border-[#A3FF12]/30 text-white
                               dark:text-[#A3FF12] text-xs font-semibold hover:bg-indigo-700
                                dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50"
                        >
                            <span className="material-symbols-rounded text-sm">
                                {rolLoading ? "progress_activity" : "save"}
                            </span>
                            {rolLoading ? "Guardando..." : "Guardar rol"}
                        </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-white/8" />

                    {/* Botón eliminar */}
                    <button
                        onClick={handleRemove}
                        disabled={removeLoading}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg
                         bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20
                          text-red-500 dark:text-red-400 text-xs font-semibold hover:bg-red-100
                           dark:hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    >
                        <span className="material-symbols-rounded text-sm">
                            {removeLoading ? "progress_activity" : "person_remove"}
                        </span>
                        {removeLoading ? "Eliminando..." : "Eliminar del proyecto"}
                    </button>
                </>
            )}

            {/* Mensaje de error */}
            {error && (
                <p className="text-red-500 dark:text-red-400 text-xs bg-red-50
                 dark:bg-red-400/10 border border-red-200
                  dark:border-red-400/20 rounded-lg px-2 py-1.5">
                    {error}
                </p>
            )}
        </div>
    );
};

export default MemberDetailModal;