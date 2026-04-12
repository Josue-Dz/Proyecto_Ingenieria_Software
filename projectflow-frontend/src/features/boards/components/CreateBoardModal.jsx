import { useState, useEffect } from "react";
import { createBoardRequest } from "../services/boardService";

const CreateBoardModal = ({ projectId, isOpen, onClose, onBoardCreated }) => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [fechaInicio, setInicio] = useState("");
    const [fechaFin, setFin] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            setNombre(""); setDesc(""); setInicio(""); setFin(""); setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;

        if (!fechaInicio || !fechaFin) {
            setError("Debes seleccionar fecha de inicio y fecha de fin.");
            return;
        }

        if (fechaFin < fechaInicio) {
            setError("La fecha fin no puede ser menor que la fecha inicio.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const newBoard = await createBoardRequest(projectId, {
                nombre,
                descripcion: descripcion || null,
                fechaInicio: fechaInicio || null,
                fechaFin: fechaFin || null,
            });
            onBoardCreated(newBoard);
            onClose();
        } catch (err) {
            setError("No se pudo crear el tablero. Intenta de nuevo.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#0f0f0f] border border-gray-200
                     dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/6">
                    <h2 className="text-gray-800 dark:text-white font-semibold text-base">Nuevo tablero</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 dark:text-white/30 dark:hover:text-white/70"
                    >
                        <span className="material-symbols-rounded text-[20px]">close</span>
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-500 dark:text-white/40 text-xs font-medium uppercase tracking-wider">
                            Nombre *
                        </label>
                        <input
                            autoFocus
                            type="text"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            placeholder="Ej: Sprint 1"
                            className="bg-white border border-gray-300 rounded-xl px-4 py-2.5
                                text-gray-800 text-sm placeholder-gray-400
                                shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all
                                dark:bg-white/5 dark:border-white/10 dark:text-white
                                dark:placeholder-white/20 dark:focus:border-white/25 dark:focus:ring-white/10"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-500 dark:text-white/40 text-xs font-medium uppercase tracking-wider">
                            Descripción
                        </label>
                        <textarea
                            value={descripcion}
                            onChange={e => setDesc(e.target.value)}
                            rows={2}
                            placeholder="Descripción opcional..."
                            className="bg-white border border-gray-300 rounded-xl px-4 py-2.5
                                text-gray-800 text-sm placeholder-gray-400
                                shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
                                transition-all dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/20 dark:focus:border-white/25 dark:focus:ring-white/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-500 dark:text-white/40 text-xs font-medium uppercase tracking-wider">
                                Fecha inicio
                            </label>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={e => setInicio(e.target.value)}
                                className="bg-white border border-gray-300 rounded-xl px-4 py-2.5
                                    text-gray-800 text-sm placeholder-gray-400
                                    shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/20 dark:focus:border-white/25 dark:focus:ring-white/10"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-500 dark:text-white/40 text-xs font-medium uppercase tracking-wider">
                                Fecha fin
                            </label>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={e => setFin(e.target.value)}
                                className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/20 dark:focus:border-white/25 dark:focus:ring-white/10"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400/70 text-xs">{error}</p>}

                    <div className="flex gap-2 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-gray-300
                                bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors dark:border-white/10 dark:text-white/40 dark:hover:bg-white/5"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !nombre.trim()}
                            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700
                                text-white text-sm font-medium transition-colors dark:bg-[#a3ff12]/15 dark:border dark:border-[#a3ff12]/30 dark:text-[#a3ff12] dark:hover:bg-[#a3ff12]/25 disabled:opacity-40"
                        >
                            {loading ? "Creando..." : "Crear tablero"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBoardModal;