import { useState } from "react";
import { useMembers } from "../hooks/useMembers";
import MemberBubble from "./MemberBubble";
import InviteForm from "./InviteForm";

const MembersSection = ({ idProyecto, onMembersChanged }) => {
    const { members, loading, error, isAdmin, handleInvite, handleRolChange, handleRemove } =
        useMembers(idProyecto, onMembersChanged);

    const [showInviteForm, setShowInviteForm] = useState(false);

    return (
        <div className="flex items-center gap-3 flex-wrap">

            {/* Burbujas */}
            {loading ? (
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full bg-slate-200
                         dark:bg-white/10 border-2 border-white dark:border-[#0f0f0f]
                         animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="flex -space-x-2 flex-wrap gap-y-2">
                    {members.map(member => (
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

            {/* Botón invitar */}
            {isAdmin && (
                <button
                    onClick={() => setShowInviteForm(!showInviteForm)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600
                     dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12] text-xs
                     font-semibold hover:bg-indigo-700 dark:hover:bg-[#A3FF12]/25
                     transition-colors"
                >
                    <span className="material-symbols-rounded text-sm">person_add</span>
                    Invitar
                </button>
            )}

            {/* Formulario de invitación */}
            {showInviteForm && isAdmin && (
                <InviteForm
                    onInvite={handleInvite}
                    onCancel={() => setShowInviteForm(false)}
                />
            )}

            {error && (
                <p className="text-red-400/70 text-xs">{error}</p>
            )}
        </div>
    );
};

export default MembersSection;