import { useState, useRef } from "react";
import MemberDetailModal from "./MemberDetailModal";
import { rolBadge } from "../constants/roles";

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

export default MemberBubble;