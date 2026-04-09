import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from "@dnd-kit/abstract";
import KanbanCard from '../../cards/components/KanbanCard';
import CreateTaskPopover from '../../cards/components/CreateTaskPopover';
import { useState } from 'react';

const KanbanColumn = ({ column, onAddTask, onTaskClick, index, canCreate, canMove, onRenameColumn }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(column.nombreColumna)

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
            <div className="flex items-center bg-[#1a1d4c]/95 dark:bg-white/3 border dark:border-white/6 rounded-t-xl gap-2 p-2">
                {isEditing ?
                    (
                        <input
                            className="text-white text-sm font-semibold bg-transparent border border-white outline-none"
                            value={newName}
                            autoFocus
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={() => {
                                setIsEditing(false);
                                console.log("Nuevo nombre: ", newName)
                                if (newName !== column.nombreColumna) {
                                    onRenameColumn(column.idColumna, newName)
                                }
                            }}

                            onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                    setIsEditing(false);
                                    if (newName !== column.nombreColumna) {
                                        onRenameColumn(column.idColumna, newName)
                                    }
                                }

                                if (e.key === "Escape") {
                                    setIsEditing(false);
                                    setNewName(column.nombreColumna);
                                }
                            }}
                        />
                    ) :
                    (
                        <span className="text-white text-sm font-semibold tracking-tight"
                            onClick={() => setIsEditing(true)}
                        >
                            {column.nombreColumna}
                        </span>
                    )}
                <span className="text-[0.65rem] font-medium text-white/80 dark:bg-white/5 border dark:border-white/10 rounded-full px-2 py-0.5">
                    {column.tarjetas?.length ?? 0}
                </span>
            </div>

            <div
                ref={ref}
                className="flex flex-col gap-2.5 overflow-y-auto max-h-98 rounded-b-2xl p-3 bg-[#dfeaff]/85 dark:bg-white/3 border border-slate-300 dark:border-white/6 shadow"
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
        </div >
    );
};

export default KanbanColumn;