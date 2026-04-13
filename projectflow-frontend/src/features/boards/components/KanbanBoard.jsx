import { useState } from 'react';
import { useMemo } from 'react';
import { useNavigate} from 'react-router-dom';
import { useKanban } from '../hooks/useKanban'
import { useParams } from 'react-router-dom';
import MembersSection from '../../members/components/MembersSection';
import { useAuth } from '../../auth/hooks/useAuth';
import BoardFilterBar from './BoardFilterBar';
import AddColumnForm from './AddColumnForm';
import { useProjectRol } from '../../projects/hooks/useProjectRol';
import ActivityPanel from '../../notifications/components/ActivityPanel';
import BoardCore from './BoardCore';

const KanbanBoard = () => {
    const { boardId, id: idProyecto } = useParams();
    const { user } = useAuth();
    const { userRol, members, refetch:refetchMembers } = useProjectRol(idProyecto, user);

    const { columns, items, taskMap, setItems, addColumn, addTask, moveTask, updateTask, updateColumn } = useKanban(boardId);
    const [filters, setFilters] = useState({ prioridad: null, responsableId: null });

    const canCreate = userRol === "ADMIN";
    const canMove = userRol === "ADMIN" || userRol === "COLABORADOR";

    const hasActiveFilters = filters.prioridad || filters.responsableId;
    const clearFilters = () => setFilters({ prioridad: null, responsableId: null });

    // Filtrar lectores para el filtro de responsables
    const membersAsignables = useMemo(() => members.filter(m => m.rol !== "LECTOR"),
    [members] );

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


    return (
        <>
            <div className="flex justify-between mb-5">
                <button
                    onClick={() => { navigate(`/boards/projects/${idProyecto}`) }}
                    className="flex items-center dark:text-white px-4 py-2 rounded-md p-3 hover:bg-gray-500/20 transition-colors"
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

                    <MembersSection idProyecto={idProyecto} onMembersChanged={refetchMembers} />
                </div >

            </div>


            <div className="flex items-center justify-between pb-6">

                <AddColumnForm
                    canCreate={canCreate}
                    addColumn={addColumn}
                />

                {/* Barra de filtros */}
                <BoardFilterBar
                    members={membersAsignables}
                    filters={filters}
                    hasActiveFilters={hasActiveFilters}
                    clearFilters={clearFilters}
                    setFilters={setFilters}
                />


            </div>
            
            <BoardCore 
                userRol={userRol}
                columns={columns}
                items={items}
                taskMap={taskMap}
                setItems={setItems}
                moveTask={moveTask}
                addTask={addTask}
                updateTask={updateTask}
                canCreate={canCreate}
                canMove={canMove}
                getFilteredTarjetas={getFilteredTarjetas}
                updateColumn = {updateColumn}
            />

        </>
    );
};

export default KanbanBoard;