import { useRef, useState, useEffect } from 'react';
import { useKanban } from '../hooks/useKanban'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from "@dnd-kit/helpers"
import KanbanColumn from './KanbanColumn';
import { useParams } from 'react-router-dom';
import TaskDetailModal from '../../cards/components/TaskDetailModal';
import { isSortable } from '@dnd-kit/react/sortable';
import MembersSection from '../../projects/components/MembersSection';
import { getMembersRequest } from '../../projects/services/MemberService';
import { useAuth } from '../../auth/hooks/useAuth';
import MemberAvatar from '../../members/components/MemberAvatar';
import BoardFilterBar from './BoardFilterBar';

const KanbanBoard = () => {
    const { boardId, id: idProyecto } = useParams();
    const { user } = useAuth();
    const { columns, items, taskMap, setItems, addColumn, addTask, moveTask, updateTask } = useKanban(boardId);
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({ prioridad: null, responsableId: null });

    const [showAddColumn, setShowAddColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [addingColumn, setAddingColumn] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [userRol, setUserRol] = useState(null);

    const itemsRef = useRef(items);
    const sourceGroupRef = useRef(null);

    // Obtener rol del usuario en este proyecto
    useEffect(() => {
        if (!idProyecto || !user?.idUsuario) return;
        getMembersRequest(idProyecto)
            .then((members) => {
                setMembers(members);
                const me = members.find((m) => Number(m.idUsuario) === Number(user.idUsuario));
                setUserRol(me?.rol ?? null);
            })
            .catch(console.error);
    }, [idProyecto, user?.idUsuario]);

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

    const hasActiveFilters = filters.prioridad || filters.responsableId;

    const clearFilters = () => setFilters({ prioridad: null, responsableId: null });

    const canCreate = userRol === "ADMIN";
    const canMove = userRol === "ADMIN" || userRol === "COLABORADOR";

    const handleDragStart = (event) => {
        const { source } = event.operation;
        if (source) {
            sourceGroupRef.current = source.group;
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

        let destColumnId = sourceColumnId;
        for (const [colId, taskIds] of Object.entries(itemsRef.current)) {
            if (taskIds.includes(taskId)) {
                destColumnId = Number(colId);
                break;
            }
        }

        const newPosition = itemsRef.current[String(destColumnId)]?.indexOf(taskId) ?? 0;
        if (sourceColumnId === destColumnId && source.initialIndex === source.index) return;

        moveTask(taskId, sourceColumnId, destColumnId, newPosition);
    };

    const handleAddColumn = async (e) => {
        e.preventDefault();
        if (!newColumnName.trim() || !canCreate) return;
        setAddingColumn(true);
        await addColumn(newColumnName.trim());
        setNewColumnName("");
        setShowAddColumn(false);
        setAddingColumn(false);
    };

    return (
        <>
            {/* Miembros del proyecto */}
            <div className="flex items-center justify-end py-3 px-1 mb-2">
                <MembersSection idProyecto={idProyecto} />
            </div>

            <BoardFilterBar 
                members={members}
                filters={filters}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
                setFilters={setFilters}
            />

            <DragDropProvider
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* Botón nueva columna — solo ADMIN */}
                {canCreate && (
                    <div className="py-1">
                        {showAddColumn ? (
                            <form onSubmit={handleAddColumn} className="w-72 dark:bg-white/3 border border-indigo-400/15 dark:border-white/6 rounded-2xl p-3 flex flex-col gap-2">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Nombre de la columna"
                                    value={newColumnName}
                                    onChange={e => setNewColumnName(e.target.value)}
                                    className="dark:bg-white/5 border border-indigo-400/30 dark:border-white/15 rounded-xl px-3 py-2 dark:text-white text-sm dark:placeholder-white/20 focus:outline-none dark:focus:border-[#A3FF12]/40 transition-colors"
                                />
                                <div className="flex gap-2">
                                    <button type="submit" disabled={addingColumn}
                                        className="flex-1 py-1.5 rounded-xl text-white bg-indigo-600 dark:bg-[#A3FF12]/15 border dark:border-[#A3FF12]/30 text-xs font-medium dark:hover:bg-[#A3FF12]/25 transition-colors disabled:opacity-50">
                                        {addingColumn ? "Creando..." : "Crear"}
                                    </button>
                                    <button type="button" onClick={() => { setShowAddColumn(false); setNewColumnName(""); }}
                                        className="flex-1 py-1.5 rounded-lg border border-gray-500 dark:border-white/10 dark:text-white/40 text-xs dark:hover:bg-white/5 transition-colors">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button onClick={() => setShowAddColumn(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-500 dark:border-white/15 dark:text-white/30 text-sm dark:hover:border-white/25 dark:hover:text-white/50 dark:hover:bg-white/3 transition-colors">
                                <span className="material-symbols-rounded text-[18px]">add</span>
                                Nueva Columna
                            </button>
                        )}
                    </div>
                )}

                <div className="flex gap-4 overflow-x-auto pb-6 items-start">
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

            {selectedTask && (
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
            )}
        </>
    );
};

export default KanbanBoard;