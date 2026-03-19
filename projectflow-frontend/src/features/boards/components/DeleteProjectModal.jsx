import { useState } from "react";
import { deleteProjectRequest } from "../services/projectService";

const DeleteProjectModal = ({ isOpen, onClose, project, onProjectDeleted }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !project) return null;

    const handleDelete = async () => {
        setError(null);
        setLoading(true);
        try {
            await deleteProjectRequest(project.idProyecto);
            onProjectDeleted(project.idProyecto);
            onClose();
        } catch (err) {
            const status = err?.response?.status;
            if (status === 403) {
                setError("No tienes permisos para eliminar este proyecto.");
            } else {
                setError("No se pudo eliminar. Intenta de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center
             bg-black/30 dark:bg-black/60 backdrop-blur-sm px-4"
        >
            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200
             dark:border-white/10 rounded-2xl w-full max-w-xs shadow-2xl p-5 space-y-4">

                {/* Ícono + título */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-400/15 flex items-center justify-center">
                        <span className="material-symbols-rounded text-red-500 dark:text-red-400 text-base">delete</span>
                    </div>
                    <h2 className="text-slate-800 dark:text-white font-semibold text-sm">Eliminar proyecto</h2>
                </div>

                {/* Mensaje */}
                <p className="text-slate-500 dark:text-white/60 text-xs leading-relaxed">
                    ¿Eliminar <span className="text-slate-800 dark:text-white font-medium">"{project.nombreProyecto}"</span>? Esta acción no se puede deshacer.
                </p>

                {error && (
                    <p className="text-red-500 dark:text-red-400 text-xs bg-red-50 dark:bg-red-400/10 border
                     border-red-200 dark:border-red-400/20 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                {/* Botones */}
                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-white/10
                         text-slate-500 dark:text-white/50 text-xs font-semibold hover:bg-slate-100
                          dark:hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50
                         dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-red-500
                          dark:text-red-400 text-xs font-semibold hover:bg-red-100
                           dark:hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                        ) : (
                            <span className="material-symbols-rounded text-sm">delete</span>
                        )}
                        {loading ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DeleteProjectModal;