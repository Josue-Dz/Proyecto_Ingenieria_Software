import { useState, useRef, useEffect } from "react";
import { ROLES } from "../constants/roles";

const InviteForm = ({ onInvite, onCancel, anchorRef }) => {
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRol, setInviteRol]     = useState("COLABORADOR");
    const [loading, setLoading]         = useState(false);
    const [feedback, setFeedback]       = useState({ type: null, message: null });
    const formRef = useRef(null);
    

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                formRef.current && !formRef.current.contains(e.target) &&
                anchorRef.current && !anchorRef.current.contains(e.target)
            ) {
                onCancel();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [anchorRef, onCancel]);


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
        <div
                ref={formRef} 
        className="absolute z-50 top-12 right-0 w-56 bg-white dark:bg-[#1a1a1a]
         border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 space-y-3">

            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-[#A3FF12]/15
                 border border-indigo-300 dark:border-[#A3FF12]/25 flex items-center
                 justify-center shrink-0">
                    <span className="material-symbols-rounded text-indigo-600
                     dark:text-[#A3FF12] text-[18px]">person_add</span>
                </div>
                <div>
                    <p className="text-slate-800 dark:text-white text-sm font-semibold">
                        Invitar miembro
                    </p>
                    <p className="text-slate-400 dark:text-white/40 text-xs">
                        Agregar al proyecto
                    </p>
                </div>
            </div>

            <div className="border-t border-slate-100 dark:border-white/8" />

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-slate-600 dark:text-white/40 text-xs font-medium">
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
                    className="w-full bg-white dark:bg-white/5 border border-slate-300
                     dark:border-white/10 rounded-lg px-3 py-1.5 text-slate-700
                     dark:text-white text-xs focus:outline-none focus:ring-2
                     focus:ring-indigo-500 dark:focus:ring-[#A3FF12]/40
                     focus:border-transparent transition-all duration-200
                     placeholder-slate-300 dark:placeholder-white/20"
                />
            </div>

            {/* Rol */}
            <div className="space-y-1.5">
                <label className="text-slate-600 dark:text-white/40 text-xs font-medium">
                    Rol
                </label>
                <select
                    value={inviteRol}
                    onChange={(e) => setInviteRol(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-slate-300
                     dark:border-white/10 rounded-lg px-3 py-1.5 text-slate-700
                     dark:text-white text-xs focus:outline-none focus:ring-2
                     focus:ring-indigo-500 dark:focus:ring-[#A3FF12]/40
                     focus:border-transparent transition-all duration-200"
                >
                    {ROLES.map(rol => (
                        <option key={rol} value={rol}
                            className="bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-white">
                            {rol}
                        </option>
                    ))}
                </select>
            </div>

            {/* Feedback */}
            {feedback.message && (
                <p className={`text-xs rounded-lg px-2 py-1.5 flex items-center gap-1.5 border ${
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

            <div className="border-t border-slate-100 dark:border-white/8" />

            {/* Botón agregar */}
            <button
                onClick={handleSubmit}
                disabled={loading || !inviteEmail}
                className="w-full flex items-center justify-center gap-1.5 py-1.5
                 rounded-lg bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600
                 dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-xs
                 font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25
                 transition-colors disabled:opacity-50"
            >
                <span className="material-symbols-rounded text-sm">
                    {loading ? "progress_activity" : "person_add"}
                </span>
                {loading ? "Invitando..." : "Agregar miembro"}
            </button>

            {/* Botón cancelar */}
            <button
                type="button"
                onClick={onCancel}
                className="w-full flex items-center justify-center gap-1.5 py-1.5
                 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500
                 dark:text-white/50 text-xs font-semibold hover:bg-slate-100
                 dark:hover:bg-white/5 transition-colors"
            >
                Cancelar
            </button>
        </div>
    );
};

export default InviteForm;