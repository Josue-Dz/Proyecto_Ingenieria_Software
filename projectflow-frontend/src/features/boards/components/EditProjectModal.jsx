import { useState, useEffect } from "react";
import { updateProjectRequest } from "../services/projectService";

const EditProjectModal = ({ isOpen, onClose, project, onProjectUpdated }) => {
    const [form, setForm] = useState({ nombreProyecto: "", descripcion: "", fechaInicio: "", fechaFin: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Aqui se prellena el form con los datos actuales del proyecto
    useEffect(() => {
        if (project) {
            setForm({
                nombreProyecto: project.nombreProyecto || "",
                descripcion: project.descripcion || "",
                fechaInicio: project.fechaInicio ? project.fechaInicio.split("T")[0] : "",
                fechaFin: project.fechaFin ? project.fechaFin.split("T")[0] : "",
            });
            setError(null);
            setSuccess(false);
        }
    }, [project]);

    if (!isOpen || !project) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validación por parte del frontend
        if (form.fechaInicio && form.fechaFin && form.fechaInicio > form.fechaFin) {
            setError("La fecha de inicio debe ser anterior a la fecha de fin.");
            return;
        }

        setLoading(true);
        try {
            const updated = await updateProjectRequest(project.idProyecto, form);
            onProjectUpdated(updated);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1500);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 403) {
                setError("No tienes permisos para editar este proyecto.");
            } else if (status === 400) {
                setError("Revisa las fechas ingresadas.");
            } else {
                setError("No se pudo actualizar. Intenta de nuevo.");
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/8">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#A3FF12]/15 flex items-center justify-center">
                            <span className="material-symbols-rounded text-[#A3FF12] text-sm">edit</span>
                        </div>
                        <h2 className="text-white font-semibold text-sm">Editar proyecto</h2>
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
                        <span className="material-symbols-rounded text-lg">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">

                    {/* Nombre */}
                    <div>
                        <label className="text-white/50 text-xs font-medium block mb-1">
                            Nombre <span className="text-[#A3FF12]">*</span>
                        </label>
                        <input
                            type="text"
                            name="nombreProyecto"
                            value={form.nombreProyecto}
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2
                             text-white text-sm placeholder-white/20 focus:outline-none
                              focus:border-[#A3FF12]/40 transition-colors"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="text-white/50 text-xs font-medium block mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2
                             text-white text-sm placeholder-white/20 focus:outline-none
                              focus:border-[#A3FF12]/40 transition-colors resize-none"
                        />
                    </div>

                    {/* Fechas */}
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-white/50 text-xs font-medium block mb-1">
                                Inicio <span className="text-[#A3FF12]">*</span>
                            </label>
                            <input
                                type="date"
                                name="fechaInicio"
                                value={form.fechaInicio}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split('T')[0]} // No se permite fechas pasadas
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2
                                 text-white text-xs focus:outline-none
                                 focus:border-[#A3FF12]/40 transition-colors scheme-dark"
                            />
                        </div>
                        <div>
                            <label className="text-white/50 text-xs font-medium block mb-1">
                                Fin <span className="text-[#A3FF12]">*</span>
                            </label>
                            <input
                                type="date"
                                name="fechaFin"
                                value={form.fechaFin}
                                onChange={handleChange}
                                required
                                min={form.fechaInicio}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-2
                                 text-white text-xs focus:outline-none
                                  focus:border-[#A3FF12]/40 transition-colors scheme-dark"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-xs bg-red-400/10 border
                         border-red-400/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    {/* Éxito */}
                    {success && (
                        <p className="text-[#A3FF12] text-xs bg-[#A3FF12]/10 border border-[#A3FF12]/20 rounded-lg px-3 py-2 flex items-center gap-1.5">
                            <span className="material-symbols-rounded text-sm">check_circle</span>
                            Proyecto actualizado correctamente.
                        </p>
                    )}

                    {/* Botones */}
                    <div className="flex gap-2 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 rounded-lg border border-white/10
                             text-white/50 text-xs font-semibold hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#A3FF12]/15 border border-[#A3FF12]/30 text-[#A3FF12] text-xs font-semibold hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                            ) : (
                                <span className="material-symbols-rounded text-sm">save</span>
                            )}
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;