import { useState, useEffect, useRef } from "react";
import {
    getMembersRequest,
    inviteMemberRequest,
    changeRolRequest,
    removeMemberRequest,
} from "../services/MemberService";
import { useAuth } from '../../auth/hooks/useAuth';

const ROLES = ["ADMIN", "COLABORADOR", "LECTOR"];

const rolBadge = (rol) => {
    const styles = {
        ADMIN: "bg-indigo-100 dark:bg-[#A3FF12]/15 text-indigo-600 dark:text-[#A3FF12] border border-indigo-200 dark:border-[#A3FF12]/20",
        COLABORADOR: "bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-400/20",
        LECTOR: "bg-slate-100 dark:bg-white/8 text-slate-500 dark:text-white/50 border border-slate-200 dark:border-white/10",
    };
    return styles[rol] || styles.LECTOR;
};

// Modal de detalle de miembro
const MemberDetailModal = ({ member, anchorRef, onClose, onRolChange, onRemove, isAdmin }) => {
    const [editingRol, setEditingRol] = useState(member.rol);
    const [rolLoading, setRolLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [error, setError] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                modalRef.current && !modalRef.current.contains(e.target) &&
                anchorRef.current && !anchorRef.current.contains(e.target)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [anchorRef, onClose]);

    const handleRolSave = async () => {
        if (editingRol === member.rol) { onClose(); return; }
        setError(null);
        setRolLoading(true);
        try {
            await onRolChange(member.idUsuario, editingRol);
            onClose();
        } catch (err) {
            const status = err?.response?.status;
            setError(
                status === 403 ? "Sin permisos para cambiar roles." :
                status === 400 ? "No puedes cambiar tu propio rol." :
                "No se pudo cambiar el rol."
            );
        } finally {
            setRolLoading(false);
        }
    };

    const handleRemove = async () => {
        setError(null);
        setRemoveLoading(true);
        try {
            await onRemove(member.idUsuario);
            onClose();
        } catch (err) {
            const status = err?.response?.status;
            setError(
                status === 403 ? "Sin permisos para eliminar miembros." :
                status === 400 ? "No puedes removerte a ti mismo." :
                "No se pudo eliminar el miembro."
            );
        } finally {
            setRemoveLoading(false);
        }
    };

    return (
        <div
            ref={modalRef}
            className="absolute z-50 top-12 right-0 w-56 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 space-y-3"
        >
            {/* Info */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-[#A3FF12]/15 border border-indigo-300 dark:border-[#A3FF12]/25 flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 dark:text-[#A3FF12] font-bold text-sm">{member.iniciales}</span>
                </div>
                <div className="min-w-0">
                    <p className="text-slate-800 dark:text-white text-sm font-semibold truncate">
                        {member.nombre} {member.apellido}
                    </p>
                    <p className="text-slate-400 dark:text-white/40 text-xs truncate">{member.correo}</p>
                </div>
            </div>

            {/* Badge rol — siempre visible */}
            <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${rolBadge(member.rol)}`}>
                    {member.rol}
                </span>
            </div>
 
            {/* Acciones solo para ADMIN */}
            {isAdmin && (
                <>
                    <div className="border-t border-slate-100 dark:border-white/8" 
                    
                    />


            {/* Cambiar rol */}
            <div className="space-y-1.5">
                <label className="text-slate-400 dark:text-white/40 text-xs font-medium">Rol</label>
                <select
                    value={editingRol}
                    onChange={(e) => setEditingRol(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-slate-800 dark:text-white text-xs focus:outline-none focus:border-indigo-400 dark:focus:border-[#A3FF12]/40 transition-colors"
                >
                    {ROLES.map((r) => (
                        <option key={r} value={r} className="bg-white dark:bg-[#1a1a1a] text-slate-800 dark:text-white">
                            {r}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleRolSave}
                    disabled={rolLoading}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600 dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50"
                >
                    {rolLoading
                        ? <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                        : <span className="material-symbols-rounded text-sm">save</span>
                    }
                    {rolLoading ? "Guardando..." : "Guardar rol"}
                </button>
            </div>

            <div className="border-t border-slate-100 dark:border-white/8" />

            {/* Eliminar */}
            <button
                onClick={handleRemove}
                disabled={removeLoading}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-500 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
                {removeLoading
                    ? <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                    : <span className="material-symbols-rounded text-sm">person_remove</span>
                }
                {removeLoading ? "Eliminando..." : "Eliminar del proyecto"}
            </button>
                </>

            )}

            {error && (
                <p className="text-red-500 dark:text-red-400 text-xs bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-2 py-1.5">
                    {error}
                </p>
            )}
            
        </div>

    );

};

// ── Burbuja individual ────────────────────────────────────────────────────────
const MemberBubble = ({ member, onRolChange, onRemove, isAdmin }) => {
    const [showModal, setShowModal] = useState(false);
    const bubbleRef = useRef(null);

    return (
        <div className="relative" ref={bubbleRef}>
            <button
                onClick={() => setShowModal(!showModal)}
                title={`${member.nombre} ${member.apellido} — ${member.correo}`}
                className="group relative w-9 h-9 rounded-full bg-indigo-100 dark:bg-[#A3FF12]/15 border-2 border-white dark:border-[#0f0f0f] hover:border-indigo-400 dark:hover:border-[#A3FF12]/60 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:z-30"
            >
                <span className="text-indigo-600 dark:text-[#A3FF12] font-bold text-xs">
                    {member.iniciales}
                </span>

                {/* Tooltip */}
                <div className="absolute bottom-11 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                    <div className="bg-slate-800 dark:bg-[#0f0f0f] border border-slate-600 dark:border-white/15 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-xl">
                        <p className="font-medium">{member.nombre} {member.apellido}</p>
                        <p className="text-slate-400 dark:text-white/40 text-[10px]">{member.correo}</p>
                    </div>
                    <div className="w-2 h-2 bg-slate-800 dark:bg-[#0f0f0f] border-r border-b border-slate-600 dark:border-white/15 rotate-45 -mt-1" />
                </div>
            </button>

            {/* Badge de rol */}
            <span className={`absolute -bottom-1 -right-1 text-[8px] font-bold px-1 rounded-full border ${rolBadge(member.rol)}`}>
                {member.rol[0]}
            </span>

            {showModal && (
                <MemberDetailModal
                    member={member}
                    anchorRef={bubbleRef}
                    onClose={() => setShowModal(false)}
                    onRolChange={onRolChange}
                    onRemove={onRemove}
                    isAdmin={isAdmin}
                />
            )}
        </div>
    );
};

// ── Componente principal ──────────────────────────────────────────────────────
const MembersSection = ({ idProyecto }) => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRol, setInviteRol] = useState("COLABORADOR");
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteFeedback, setInviteFeedback] = useState({ type: null, message: null });

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getMembersRequest(idProyecto);
                setMembers(data);
            } catch (err) {
                setError(`No se pudieron cargar los miembros. ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idProyecto]);


    // Detectar si el usuario actual es ADMIN comparando IDs como números
    const isAdmin = members.some(
        (m) => Number(m.idUsuario) === Number(user?.idUsuario) && m.rol === "ADMIN"
    );

    console.log("user?.idUsuario:", user?.idUsuario, "members ids:", members.map(m => m.idUsuario), "isAdmin:", isAdmin);
    
    const handleInvite = async (e) => {
        e.preventDefault();
        setInviteFeedback({ type: null, message: null });
        setInviteLoading(true);
        try {
            const newMember = await inviteMemberRequest(idProyecto, {
                correo: inviteEmail.trim(),
                rol: inviteRol,
            });
            setMembers((prev) => [...prev, newMember]);
            setInviteEmail("");
            setInviteRol("COLABORADOR");
            setShowInviteForm(false);
            setInviteFeedback({ type: "success", message: "Miembro agregado correctamente." });
            setTimeout(() => setInviteFeedback({ type: null, message: null }), 3000);
        } catch (err) {
            const status = err?.response?.status;
            setInviteFeedback({
                type: "error",
                message:
                    status === 404 ? "No existe un usuario con ese correo." :
                    status === 409 ? "El usuario ya es miembro del proyecto." :
                    status === 403 ? "No tienes permisos para invitar miembros." :
                    "No se pudo invitar al usuario.",
            });
        } finally {
            setInviteLoading(false);
        }
    };

    const handleRolChange = async (idUsuario, rol) => {
        const updated = await changeRolRequest(idProyecto, idUsuario, { rol });
        setMembers((prev) => prev.map((m) => m.idUsuario === idUsuario ? updated : m));
        return updated;
    };

    const handleRemove = async (idUsuario) => {
        await removeMemberRequest(idProyecto, idUsuario);
        setMembers((prev) => prev.filter((m) => m.idUsuario !== idUsuario));
    };

    return (
        <div className="flex items-center gap-3 flex-wrap">

            {/* Burbujas */}
            {loading ? (
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 border-2 border-white dark:border-[#0f0f0f] animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="flex -space-x-2 flex-wrap gap-y-2">
                    {members.map((member) => (
                        <MemberBubble
                            key={member.idUsuario}
                            member={member}
                            onRolChange={handleRolChange}
                            onRemove={handleRemove}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}

           {/* Botón invitar — solo ADMIN */}
            {isAdmin && (
                <button
                    onClick={() => { setShowInviteForm(!showInviteForm); setInviteFeedback({ type: null, message: null }); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600 dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25 transition-colors"
                >
                    <span className="material-symbols-rounded text-sm">person_add</span>
                    Invitar
                </button>
            )}
 

            {/* Formulario de invitación */}
            {showInviteForm && isAdmin && (
                <form
                    onSubmit={handleInvite}
                    className="w-full mt-2 bg-white dark:bg-white/3 border border-slate-200 dark:border-white/8 rounded-xl p-4 space-y-3"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-slate-500 dark:text-white/40 text-xs font-medium block mb-1">
                                Correo electrónico <span className="text-indigo-500 dark:text-[#A3FF12]">*</span>
                            </label>
                            <input
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="usuario@unah.hn"
                                required
                                autoFocus
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-800 dark:text-white text-sm placeholder-slate-300 dark:placeholder-white/20 focus:outline-none focus:border-indigo-400 dark:focus:border-[#A3FF12]/40 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-slate-500 dark:text-white/40 text-xs font-medium block mb-1">Rol</label>
                            <select
                                value={inviteRol}
                                onChange={(e) => setInviteRol(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-indigo-400 dark:focus:border-[#A3FF12]/40 transition-colors"
                            >
                                {ROLES.map((r) => (
                                    <option key={r} value={r} className="bg-white dark:bg-[#1a1a1a] text-slate-800 dark:text-white">
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {inviteFeedback.message && (
                        <p className={`text-xs rounded-lg px-3 py-2 flex items-center gap-1.5 border ${
                            inviteFeedback.type === "success"
                                ? "text-green-600 dark:text-[#A3FF12] bg-green-50 dark:bg-[#A3FF12]/10 border-green-200 dark:border-[#A3FF12]/20"
                                : "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border-red-200 dark:border-red-400/20"
                        }`}>
                            <span className="material-symbols-rounded text-sm">
                                {inviteFeedback.type === "success" ? "check_circle" : "error"}
                            </span>
                            {inviteFeedback.message}
                        </p>
                    )}

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() => { setShowInviteForm(false); setInviteEmail(""); }}
                            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={inviteLoading}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600 dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-xs font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50"
                        >
                            {inviteLoading
                                ? <span className="material-symbols-rounded text-sm animate-spin">progress_activity</span>
                                : <span className="material-symbols-rounded text-sm">person_add</span>
                            }
                            {inviteLoading ? "Invitando..." : "Agregar"}
                        </button>
                    </div>
                </form>
            )}

            {!showInviteForm && inviteFeedback.type === "success" && (
                <p className="w-full text-xs rounded-lg px-3 py-2 flex items-center gap-1.5 border text-green-600 dark:text-[#A3FF12] bg-green-50 dark:bg-[#A3FF12]/10 border-green-200 dark:border-[#A3FF12]/20">
                    <span className="material-symbols-rounded text-sm">check_circle</span>
                    {inviteFeedback.message}
                </p>
            )}

            {!loading && error && (
                <p className="text-red-400/70 text-xs">{error}</p>
            )}
        </div>
    );
};

export default MembersSection;