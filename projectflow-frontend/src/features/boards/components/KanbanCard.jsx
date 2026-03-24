
import { useSortable } from "@dnd-kit/react/sortable"

const PRIORITY_STYLES = {
    CRITICA: { label: "Crítica", class: "bg-red-500/15 text-red-400 border-red-500/25" },
    ALTA: { label: "Alta", class: "bg-orange-500/15 text-orange-400 border-orange-500/25" },
    MEDIA: { label: "Media", class: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25" },
    BAJA: { label: "Baja", class: "bg-green-500/15 text-green-400 border-green-500/25" },
};


function formatDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("es-HN", {
        day: "numeric", month: "short",
    });
}

function isOverdue(dateStr) {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
}


const KanbanCard = ({ task, index, columnId, onTaskClick, canMove }) => {

    const sortable = useSortable({
        id: task.idTarjeta,
        index,
        group: String(columnId),
        type: "item",
        disabled: !canMove,
    });


    const { ref, isDragging, handleRef } = sortable;

    const priority = PRIORITY_STYLES[task.prioridad?.toUpperCase()] ?? PRIORITY_STYLES.BAJA;
    const overdue = isOverdue(task.fechaLimite);


    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0.4 : 1 }}
            onClick={() => onTaskClick(task)}
            className="bg-white dark:bg-white/5 border border-white/95 dark:border-white/10 rounded-xl p-3.5 dark:hover:border-white/20 dark:hover:bg-white/8 shadow-md transition-colors select-none active: cursor-grabbing"
        >
            {canMove && (
            <div
                ref={handleRef}
                onClick={e => e.stopPropagation()}
                className="flex justify-end mb-1 cursor-grab active:cursor-grabbing"
            >
                <span className="material-symbols-rounded text-slate-400 dark:text-white/20 text-[16px]">
                    drag_indicator
                </span>
            </div>
            )}

            <p className="dark:text-white/90 text-sm font-medium leading-snug mb-3">
                {task.titulo}
            </p>

            <div className="flex items-center justify-between gap-2">
                <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${priority.class}`}>
                    {priority.label}
                </span>

                {task.fechaLimite && (
                    <div className={`flex items-center gap-1 text-[0.65rem] ${overdue ? "text-red-400" : "dark:text-white/30"}`}>
                        <span className="material-symbols-rounded text-[11px]">
                            {overdue ? "warning" : "calendar_today"}
                        </span>
                        {formatDate(task.fechaLimite)}
                    </div>
                )}
            </div>

        </div>
    )
}

export default KanbanCard