import React from 'react'
import MemberAvatar from '../../members/components/MemberAvatar'

const BoardFilterBar = ({ members, filters, hasActiveFilters, clearFilters, setFilters }) => {
    return (
        <div>            
            {/* Barra de filtros */}
            <div className="flex items-center gap-3 py-2 px-1 mb-2 flex-wrap">

                {/* Filtro por responsable */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white/30 mr-1">Responsable:</span>
                    {members.map(member => (
                        <MemberAvatar
                            key={member.idUsuario}
                            member={member}
                            isSelected={filters.responsableId === member.idUsuario}
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                responsableId: prev.responsableId === member.idUsuario ? null : member.idUsuario
                            }))}
                        />
                    ))}
                </div>

                {/* Separador */}
                <div className="w-px h-5 bg-white/10" />

                {/* Filtro por prioridad */}
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-white/30 mr-1">Prioridad:</span>
                    {[
                        { value: "ALTA", label: "Alta", class: "text-orange-400 border-orange-500/30 bg-orange-500/15" },
                        { value: "MEDIA", label: "Media", class: "text-yellow-400 border-yellow-500/30 bg-yellow-500/15" },
                        { value: "BAJA", label: "Baja", class: "text-green-400 border-green-500/30 bg-green-500/15" },
                    ].map(p => (
                        <button
                            key={p.value}
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                prioridad: prev.prioridad === p.value ? null : p.value
                            }))}
                            className={`text-[0.65rem] font-medium px-2.5 py-1 rounded-full border transition-all ${p.class} ${filters.prioridad === p.value
                                ? "opacity-100 scale-105 ring-1 ring-white/20"
                                : "opacity-40 hover:opacity-70"
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                {/* Limpiar filtros */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors ml-1"
                    >
                        <span className="material-symbols-rounded text-[14px]">close</span>
                        Limpiar
                    </button>
                )}
            </div>
        </div>
    )
}

export default BoardFilterBar