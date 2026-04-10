import { DragDropProvider } from "@dnd-kit/react";
import KanbanColumn from "./KanbanColumn";
import { useRef, useState } from "react";
import { move } from "@dnd-kit/helpers"
import { isSortable } from '@dnd-kit/react/sortable';
import TaskDetailModal from '../../cards/components/TaskDetailModal';
import { useParams } from "react-router-dom";

const BoardCore = ({ userRol, columns, items, taskMap, setItems, moveTask, updateTask, addTask, canCreate, canMove, getFilteredTarjetas, updateColumn }) => {

    const { id: projectId } = useParams();

    const itemsRef = useRef(items);
    const sourceGroupRef = useRef(null);
    const sourceIndexRef = useRef(null);

    const [selectedTask, setSelectedTask] = useState(null);

    const getTarjetas = (colId) => {
        const taskIds = items[String(colId)] ?? [];
        return taskIds.map(id => taskMap[id]).filter(Boolean);
    };

    const handleDragStart = (event) => {
        const { source } = event.operation;
        if (source) {
            sourceGroupRef.current = source.group;
            sourceIndexRef.current = source.index;
        }
    };

    const handleDragOver = (event) => {
        if (!canMove) return;
        const { source } = event.operation;
        if (!source || source.type === "column") return;
        setItems(prev => {
            const updated = move(prev, event);
            itemsRef.current = updated;
            return updated;
        });
    };

    const handleDragEnd = (event) => {
        if (!canMove) return;
        if (event.canceled) {
            sourceGroupRef.current = null;
            return;
        }

        const { source } = event.operation;
        if (!source || !isSortable(source)) return;

        const taskId = source.id;
        const sourceColumnId = Number(sourceGroupRef.current);
        sourceGroupRef.current = null;
        const initialPosition = sourceIndexRef.current;

        let destColumnId = sourceColumnId;
        for (const [colId, taskIds] of Object.entries(itemsRef.current)) {
            if (taskIds.includes(taskId)) {
                destColumnId = Number(colId);
                break;
            }
        }

        const newPosition = itemsRef.current[String(destColumnId)]?.indexOf(taskId) ?? 0;
        if (sourceColumnId === destColumnId && initialPosition === source.index) return;

        moveTask(taskId, sourceColumnId, destColumnId, newPosition);
    };

    return (
        <div>
            <DragDropProvider
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >


                <div className="flex gap-4 overflow-x-auto items-start pt-8">
                    {columns.map((col, index) => (
                        <KanbanColumn
                            key={col.idColumna}
                            index={index}
                            column={{
                                ...col,
                                tarjetas: getFilteredTarjetas ?
                                    getFilteredTarjetas(col.idColumna) :
                                    getTarjetas(col.idColumna)
                            }}
                            onAddTask={addTask}
                            onTaskClick={setSelectedTask}
                            canCreate={canCreate}
                            canMove={canMove}
                            onRenameColumn={updateColumn}
                        />
                    ))}
                </div>
            </DragDropProvider>

            {
                selectedTask && (
                    <TaskDetailModal
                        task={selectedTask}
                        proyectoId={projectId}
                        userRol={userRol}
                        onClose={() => setSelectedTask(null)}
                        onTaskUpdated={(updated) => {
                            updateTask(updated);
                            setSelectedTask(null);
                        }}
                    />
                )
            }

        </div>
    )
}

export default BoardCore