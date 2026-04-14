
import { useSortable } from "@dnd-kit/react/sortable"

const PRIORITY_STYLES = {
    ALTA: { label: "Alta", class: "bg-red-100 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20" },
    MEDIA: { label: "Media", class: "bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400         dark:border-yellow-500/20" },
    BAJA: { label: "Baja", class: "bg-green-100 text-green-600 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20" },
};

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function formatDate(dateStr) {
    if (!dateStr) return null;

    const [, month, day] = dateStr.split("-");

    return `${Number(day)} ${MONTHS[Number(month) - 1]}`;
}

function isOverdue(dateStr) {
    if (!dateStr) return false;

    const today = new Date().toISOString().split("T")[0];

    return dateStr < today;
}

const KanbanCard = ({ task, index, columnId, onTaskClick, canMove }) => {

    const sortable = useSortable({
        id: task.idTarjeta,
        index,
        group: String(columnId),
        type: "item",
        accept: "item",
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
            className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-xl p-3.5 
            dark:hover:border-white/20 dark:hover:bg-white/8 shadow-md transition-colors select-none cursor-pointer"
        >
            {/* Handle drag — solo si puede mover */}
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

            <p className="text-sm font-medium text-slate-800 dark:text-white leading-snug mb-3">
                {task.titulo}
            </p>

            <div className="flex items-center justify-between gap-2">
                <span className={`text-[0.65rem] font-medium px-2 py-0.5 rounded-full border ${priority.class}`}>
                    {priority.label}
                </span>

                {task.totalSubtareas > 0 && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">

                        {/* icono */}
                        <span className="material-symbols-rounded text-[14px]">
                            checklist
                        </span>

                        {/* contador */}
                        <span>
                            {task.subtareasCompletadas}/{task.totalSubtareas}
                        </span>

                    </div>
                )}

                {task.fechaLimite && (
                    <div className={`flex items-center gap-1 text-[0.65rem] ${overdue ? "text-red-500 dark:text-red-400" : "text-slate-400 dark:text-white/30"}`}>
                        <span className="material-symbols-rounded text-[11px]">
                            {overdue ? "warning" : "calendar_today"}
                        </span>
                        {formatDate(task.fechaLimite)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanCard;