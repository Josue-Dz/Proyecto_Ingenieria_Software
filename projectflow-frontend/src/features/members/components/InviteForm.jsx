import { useState } from "react";
import { ROLES } from "../constants/roles";

const InviteForm = ({ onInvite, onCancel }) => {
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRol, setInviteRol] = useState("COLABORADOR");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: null, message: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ type: null, message: null });
        setLoading(true);
        try {
            await onInvite({ correo: inviteEmail.trim(), rol: inviteRol });
            setInviteEmail("");
            setInviteRol("COLABORADOR");
            setFeedback({ type: "success", message: "Miembro agregado correctamente." });
            setTimeout(() => setFeedback({ type: null, message: null }), 3000);
        } catch (err) {
            const status = err?.response?.status;
            setFeedback({
                type: "error",
                message:
                    status === 404 ? "No existe un usuario con ese correo." :
                    status === 409 ? "El usuario ya es miembro del proyecto." :
                    status === 403 ? "No tienes permisos para invitar miembros." :
                    "No se pudo invitar al usuario.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full mt-2 bg-white dark:bg-white/3 border border-slate-200 dark:border-white/8 rounded-xl p-4 space-y-3"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="text-slate-500 dark:text-white/40 text-xs font-medium block mb-1">
                        Correo electrónico
                        <span className="text-indigo-500 dark:text-[#A3FF12]"> *</span>
                    </label>
                    <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="usuario@unah.hn"
                        required
                        autoFocus
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-800 dark:text-white text-sm
                         placeholder-slate-300 dark:placeholder-white/20 focus:outline-none focus:border-indigo-400
                          dark:focus:border-[#A3FF12]/40 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-slate-600 dark:text-white/40 text-xs font-medium">Rol</label>
                    <select
                        value={inviteRol}
                        onChange={(e) => setInviteRol(e.target.value)}
                        className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg px-3 py-1.5 text-slate-700 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3FF12]/40 focus:border-transparent transition-all duration-200"
                    >
                        {ROLES.map(rol => (
                            <option 
                                key={rol} 
                                value={rol}
                                className="bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-white"
                            >
                                {rol}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {feedback.message && (
                <p className={`text-xs rounded-lg px-3 py-2 flex items-center gap-1.5 border ${
                    feedback.type === "success"
                        ? "text-green-600 dark:text-[#A3FF12] bg-green-50 dark:bg-[#A3FF12]/10 border-green-200 dark:border-[#A3FF12]/20"
                        : "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border-red-200 dark:border-red-400/20"
                }`}>
                    <span className="material-symbols-rounded text-sm">
                        {feedback.type === "success" ? "check_circle" : "error"}
                    </span>
                    {feedback.message}
                </p>
            )}

            <div className="flex gap-2 justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600 dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50"
                >
                    <span className="material-symbols-rounded text-sm">
                        {loading ? "progress_activity" : "person_add"}
                    </span>
                    {loading ? "Invitando..." : "Agregar"}
                </button>
            </div>
        </form>
    );
};

export default InviteForm;