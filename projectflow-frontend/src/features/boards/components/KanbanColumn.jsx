import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from "@dnd-kit/abstract";
import KanbanCard from '../../cards/components/KanbanCard';
import CreateTaskPopover from '../../cards/components/CreateTaskPopover';

const KanbanColumn = ({ column, onAddTask, onTaskClick, index, canCreate, canMove }) => {

    const { isDropTarget, ref } = useDroppable({
        id: String(column.idColumna),
        index,
        type: 'column',
        accept: ['item', 'column'],
        collisionPriority: CollisionPriority.Low,
        data: {
            columnId: column.idColumna,
            group: String(column.idColumna),
        },
    });

    const style = isDropTarget ? { background: '#00000030' } : undefined;

    return (
        <div className="flex flex-col w-76 shrink-0 ">
            <div className="flex items-center bg-[#1a1d4c] dark:bg-white/3 border dark:border-white/6 rounded-t-xl gap-2 p-2">
                <span className="text-white text-sm font-semibold tracking-tight">
                    {column.nombreColumna}
                </span>
                <span className="text-[0.65rem] font-medium text-white/80 dark:bg-white/5 border dark:border-white/10 rounded-full px-2 py-0.5">
                    {column.tarjetas?.length ?? 0}
                </span>
            </div>

            <div
                ref={ref}
                className="flex flex-col gap-2.5 overflow-y-auto max-h-98 rounded-b-2xl p-3 bg-[#dfeaff]/80 dark:bg-white/3 border border-white/70 dark:border-white/6"
                style={style}
            >
                {/* Crear tarea solo ADMIN */}
                {canCreate && (
                    <CreateTaskPopover columnId={column.idColumna} onAddTask={onAddTask} />
                )}

                {column.tarjetas?.map((task, index) => (
                    <KanbanCard
                        key={task.idTarjeta}
                        task={task}
                        index={index}
                        columnId={column.idColumna}
                        onTaskClick={onTaskClick}
                        canMove={canMove}
                    />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;