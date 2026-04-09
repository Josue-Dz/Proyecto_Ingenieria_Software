import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKanban } from '../hooks/useKanban'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from "@dnd-kit/helpers"
import KanbanColumn from './KanbanColumn';
import { useParams } from 'react-router-dom';
import TaskDetailModal from '../../cards/components/TaskDetailModal';
import { isSortable } from '@dnd-kit/react/sortable';
import MembersSection from '../../projects/components/MembersSection';
import { useAuth } from '../../auth/hooks/useAuth';
import BoardFilterBar from './BoardFilterBar';
import AddColumnForm from './AddColumnForm';
import { useProjectRol } from '../../projects/hooks/useProjectRol';
import ActivityPanel from '../../notifications/components/ActivityPanel';

const KanbanBoard = () => {
    const { boardId, id: idProyecto } = useParams();
    const { user } = useAuth();
    const { userRol, members } = useProjectRol(idProyecto, user);

    const { columns, items, taskMap, setItems, addColumn, addTask, moveTask, updateTask } = useKanban(boardId);
    const [filters, setFilters] = useState({ prioridad: null, responsableId: null });

    const [selectedTask, setSelectedTask] = useState(null);

    const canCreate = userRol === "ADMIN";
    const canMove = userRol === "ADMIN" || userRol === "COLABORADOR";

    const hasActiveFilters = filters.prioridad || filters.responsableId;
    const clearFilters = () => setFilters({ prioridad: null, responsableId: null });

    const itemsRef = useRef(items);
    const sourceGroupRef = useRef(null);
    const sourceIndexRef = useRef(null);
    const navigate = useNavigate();

    const getFilteredTarjetas = (colId) => {
        const taskIds = items[String(colId)] ?? [];
        return taskIds
            .map(id => taskMap[id])
            .filter(Boolean)
            .filter(task => {
                if (filters.prioridad && task.prioridad !== filters.prioridad) return false;
                if (filters.responsableId) {
                    const asignados = task.asignados ?? [];
                    if (!asignados.some(a => Number(a.idUsuario) === Number(filters.responsableId))) return false;
                }
                return true;
            });
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
        console.log("Mover taskId:", taskId, "de columna", sourceColumnId, "a columna", destColumnId, "en posición", newPosition);

        moveTask(taskId, sourceColumnId, destColumnId, newPosition);
    };


    return (
        <>
            <div className="flex justify-between mb-6">
                <button
                    onClick={() => { navigate(`/boards/projects/${idProyecto}`) }}
                    className="flex items-center px-4 py-2 rounded-md p-3 hover:bg-gray-500/10 transition-colors"
                >
                    <span className="material-symbols-rounded">
                        keyboard_backspace
                    </span>
                    <p className="text-sm">Volver al proyecto</p>
                </button >

                <div className="flex items-center gap-2">
                    {/* Miembros del proyecto */}
                    < div className="flex items-center justify-end gap-4 py-3 px-1" >

                        {canCreate && (
                            <button
                                onClick={() => navigate(`/projects/${idProyecto}/boards/${boardId}/analytics`)}
                                className="flex justify-center md:w-12 rounded-md hover:bg-gray-500/10 dark:hover:bg-white/10 p-1 transition-colors"
                                title="Reportes"
                            >
                                <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12] shrink-0">
                                    analytics
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Actividad */}
                    <ActivityPanel idProyecto={idProyecto} />

                    <div className="w-px h-10 bg-indigo-500/30" />

                    <MembersSection idProyecto={idProyecto} />
                </div >

            </div>


            <div className="flex items-center justify-between">

                <AddColumnForm
                    canCreate={canCreate}
                    addColumn={addColumn}
                />

                {/* Barra de filtros */}
                <BoardFilterBar
                    members={members}
                    filters={filters}
                    hasActiveFilters={hasActiveFilters}
                    clearFilters={clearFilters}
                    setFilters={setFilters}
                />


            </div>


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
                                tarjetas: getFilteredTarjetas(col.idColumna)
                            }}
                            onAddTask={addTask}
                            onTaskClick={setSelectedTask}
                            canCreate={canCreate}
                            canMove={canMove}
                        />
                    ))}
                </div>
            </DragDropProvider>

            {
                selectedTask && (
                    <TaskDetailModal
                        task={selectedTask}
                        proyectoId={idProyecto}
                        userRol={userRol}
                        onClose={() => setSelectedTask(null)}
                        onTaskUpdated={(updated) => {
                            updateTask(updated);
                            setSelectedTask(null);
                        }}
                    />
                )
            }

        </>
    );
};

export default KanbanBoard;