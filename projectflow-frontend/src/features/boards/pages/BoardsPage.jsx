import { useEffect, useState } from 'react'
import { createTaskRequest, getBoardsRequest } from '../services/boardService';
import { useNavigate, useParams } from 'react-router-dom';
import CreateBoardModal from '../components/CreateBoardModal';
import AddButton from '../components/AddButton';
import MembersSection from '../../projects/components/MembersSection';
import { getProjectRequest } from '../../projects/services/projectService';
import Backlog from '../../projects/components/ProjectBacklog';
import { useAuth } from '../../auth/hooks/useAuth';
import { useProjectRol } from '../../projects/hooks/useProjectRol';

const BoardsPage = () => {

    const { id: idProyecto } = useParams();
    const { user } = useAuth();

    const { userRol } = useProjectRol(idProyecto, user);

    const [boards, setBoards] = useState([]);
    const [backlog, setBacklog] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const canCreate = userRol === "ADMIN";
    const canMove = userRol === "ADMIN" || userRol === "COLABORADOR";

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                //const data = await getBoardsRequest(id);
                const [boardsData, projectData] = await Promise.all([
                    getBoardsRequest(idProyecto),
                    getProjectRequest(idProyecto)
                ]);
                //setUserRol("ADMIN");
                console.log("Estos son los boards del proyecto: ", boardsData);
                console.log("PROYECTO: ", projectData);
                console.log("BACKLOG: ", projectData.backlog.idColumna);
                setBoards(boardsData);
                setBacklog(projectData.backlog);
            } catch (err) {
                setError("No se pudieron cargar los tableros");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBoards();
    }, [idProyecto]);
    

    const handleAddTaskToBacklog = async (columnId, taskData) => {
        try {
            const newTask = await createTaskRequest(columnId, taskData);

            setBacklog(prev => ({
                ...prev,
                tarjetas: [...(prev.tarjetas || []), newTask]
            }));
        } catch (err) {
            console.error("Error al añadir al backlog:", err);
        }
    };


    const handleClick = (boardId) => {
        navigate(`/projects/${idProyecto}/boards/${boardId}`)
    }

    console.log("IDCOLUMNA: ", backlog?.idColumna)

    return (

        <div className="pt-6 pb-14">

            {/* Header con título y miembros en la misma línea */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-xl font-bold dark:text-white">Tableros del Proyecto</h2>
            </div>

            <div className="flex items-center justify-end space-x-3 space-y-3">
                <MembersSection idProyecto={idProyecto} />
                <AddButton disabled={loading} setIsModalOpen={setIsModalOpen} textoBoton="Nuevo tablero" />
            </div>

            <CreateBoardModal
                projectId={idProyecto}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBoardCreated={(newBoard) => setBoards(prev => [newBoard, ...prev])}
            />

            <div className="flex gap-6 items-start mt-5 bg-indigo-200/20 border border-indigo-300/30 rounded-lg p-4">

                {/**Backlog */}
                <div className="w-80 flex flex-col gap-3">
                    <Backlog backlog={backlog} canCreate={canCreate} canMove={canMove} onAddTask={handleAddTaskToBacklog} />
                </div>

                <div className="w-px h-80 bg-indigo-500 dark:bg-white/10" />

                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-rounded text-indigo-500 dark:text-[#A3FF12] text-[20px]">view_kanban</span>
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-white">Sprints</h3>
                            <span className="text-[0.65rem] font-medium dark:text-white/30 dark:bg-white/5 border dark:border-white/10 rounded-full px-2 py-0.5">
                                {boards.length}
                            </span>
                        </div>
                    </div>
                    {!loading && error && (
                        <p className="text-red-400/70 text-sm">{error}</p>
                    )}

                    {!loading && !error && boards.length === 0 && (
                        <p className="text-gray-400">Parece que aún no tienes ningún tablero</p>
                    )}

                    {!loading && !error && boards.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {boards.map((board) => (
                                <div key={board.idTablero}
                                    onClick={() => handleClick(board.idTablero)}
                                    className="flex flex-col bg-indigo-50 backdrop-blur-md dark:text-white dark:bg-black/60 border border-gray-500/20 shadow-md dark:border-white/10 rounded-lg p-5 hover:border-indigo-400 duration-200 transition-all dark:hover:border-[#A3FF12]/40">

                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-[#A3FF12] mb-2">
                                        {board.nombreTablero}
                                    </h2>
                                    <p className="text-xs text-slate-400 dark:text-[#A3FF12]/70 ">
                                        {board.descripcionTablero}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default BoardsPage