import { useState } from "react";
import { createProjectRequest } from "../services/projectService";

const initialForm = {
    nombreProyecto: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
};

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const newProject = await createProjectRequest(form);// aqui se llama al servicio para crear el proyecto 
            // y devuelve el proyecto creado con su id
            onProjectCreated(newProject);
            setForm(initialForm);
            onClose();
        } catch (err) {
            setError("No se pudo crear el proyecto. Intenta de nuevo.");
            console.error(err);
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30
             dark:bg-black/70 backdrop-blur-sm px-4"
        >

            <div className="bg-indigo-50 dark:bg-[#0f0f0f] border border-indigo-300/15
             dark:border-white/10 rounded-2xl w-full max-w-md shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-indigo-600/15
                 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded dark:text-[#A3FF12] text-xl">folder_open</span>
                        <h2 className="text-slate-900 dark:text-white font-bold text-lg">Nuevo Proyecto</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-600 dark:text-white/40 hover:text-rose-500
                         dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-rounded text-xl">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

                    {/* Nombre */}
                    <div>
                        <label className="dark:text-white/70 text-xs font-semibold uppercase tracking-wider 
                        block mb-1.5">
                            Nombre del proyecto <span className="dark:text-[#A3FF12]">*</span>
                        </label>
                        <input
                            type="text"
                            name="nombreProyecto"
                            value={form.nombreProyecto}
                            onChange={handleChange}
                            required
                            placeholder="Ej. Sistema de inventario"
                            className="w-full dark:bg-white/5 border dark:border-white/10 rounded-lg px-4 py-2.5
                             dark:text-white text-sm dark:placeholder-white/25 focus:outline-none
                              dark:focus:border-[#A3FF12]/50 dark:focus:bg-white/8 transition-colors"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="dark:text-white/70 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={3}
                            placeholder="¿De qué trata este proyecto?"
                            className="w-full dark:bg-white/5 border dark:border-white/10 rounded-lg px-4 py-2.5
                             dark:text-white text-sm dark:placeholder-white/25 focus:outline-none
                              dark:focus:border-[#A3FF12]/50 dark:focus:bg-white/8 transition-colors resize-none"
                        />
                    </div>

                    {/* Fechas */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="dark:text-white/70 
                            text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                Fecha inicio <span className="dark:text-[#A3FF12]">*</span>
                            </label>
                            <input
                                type="date"
                                name="fechaInicio"
                                value={form.fechaInicio}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]} // No se permite fechas pasadas
                                className="w-full dark:bg-white/5 border dark:border-white/10 rounded-lg px-3 py-2.5
                                 dark:text-white text-sm focus:outline-none
                                  dark:focus:border-[#A3FF12]/50 transition-colors 
                                dark:scheme-dark"
                            />
                        </div>
                        <div>
                            <label className="dark:text-white/70 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                Fecha fin <span className="dark:text-[#A3FF12]">*</span>
                            </label>
                            <input
                                type="date"
                                name="fechaFin"
                                value={form.fechaFin}
                                onChange={handleChange}
                                required
                                min={form.fechaInicio} // La fecha fin no puede ser anterior a la fecha inicio
                                className="w-full dark:bg-white/5 border dark:border-white/10 rounded-lg px-3 py-2.5
                                 dark:text-white text-sm focus:outline-none
                                  dark:focus:border-[#A3FF12]/50 transition-colors 
                                dark:scheme-dark"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="dark:text-red-400 text-xs dark:bg-red-400/10 border
                         dark:border-red-400/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    {/* Botones */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200 border
                             dark:border-white/10 dark:text-white/60 text-sm font-semibold hover:shadow-md
                              dark:hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600
                             hover:bg-indigo-700 border
                             text-white dark:bg-[#A3FF12]/15
                             dark:border-[#A3FF12]/30 dark:text-[#A3FF12] text-sm font-semibold
                             dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-rounded text-base animate-spin">progress_activity</span>
                                    Creando...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-rounded text-base">add</span>
                                    Crear proyecto
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;