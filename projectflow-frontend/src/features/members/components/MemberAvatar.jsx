const MemberAvatar = ({ member, isSelected, onClick }) => {
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all border-2 text-white ${
                    isSelected
                        ? "border-[#A3FF12] scale-110"
                        : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
                {member.iniciales}
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl text-left w-max max-w-48 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                <p className="text-white text-xs font-medium">{member.nombre} {member.apellido}</p>
                <p className="text-white/40 text-[0.65rem]">{member.correo}</p>
                <span className={`text-[0.6rem] font-medium px-1.5 py-0.5 rounded-full mt-1 inline-block ${
                    member.rol === "ADMIN"
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        : member.rol === "COLABORADOR"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/5 text-white/30 border border-white/10"
                }`}>
                    {member.rol}
                </span>
                {/* Flecha */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
            </div>
        </div>
    );
};

export default MemberAvatar;