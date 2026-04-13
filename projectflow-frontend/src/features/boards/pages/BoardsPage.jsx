import { useEffect, useState } from 'react'
import { getBoardsRequest } from '../services/boardService';
import { useNavigate, useParams } from 'react-router-dom';
import CreateBoardModal from '../components/CreateBoardModal';
import AddButton from '../components/AddButton';
import MembersSection from '../../members/components/MembersSection';
import { getProjectRequest } from '../../projects/services/projectService';
import Backlog from '../../projects/components/ProjectBacklog';
import { useProjectRol } from '../../projects/hooks/useProjectRol';
import { useAuth } from '../../auth/hooks/useAuth';

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
                const [boardsData, projectData] = await Promise.all([
                    getBoardsRequest(idProyecto),
                    getProjectRequest(idProyecto)
                ]);

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

    const formatFecha = (fecha) => fecha?.split("-").reverse().join("/");

    const handleClick = (boardId) => {
        navigate(`/projects/${idProyecto}/boards/${boardId}`)
    }

    return (

        <div className="pt-6 w-full h-full">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/projects")}
                        className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-rounded text-slate-600 dark:text-white/60">
                            arrow_back
                        </span>
                    </button>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                        Tableros del Proyecto
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <MembersSection idProyecto={idProyecto} />
                    <AddButton disabled={loading} setIsModalOpen={setIsModalOpen} textoBoton="Nuevo tablero" />
                </div>
            </div>

            <CreateBoardModal
                projectId={idProyecto}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBoardCreated={(newBoard) => setBoards(prev => [newBoard, ...prev])}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 lg:gap-6 mt-4 dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-xl p-3 sm:p-4 w-full">

                <div className="w-full lg:w-[320px] flex flex-col gap-3">
                    <Backlog backlog={backlog} userRol={userRol} canCreate={canCreate} canMove={canMove} />
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12]">
                                view_kanban
                            </span>
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-white">
                                Sprints
                            </h3>
                            <span className="text-[0.65rem] font-medium text-slate-600 dark:text-white/30 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-2 py-0.5">
                                {boards.length}
                            </span>
                        </div>
                    </div>

                    <div>
                        {!loading && error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        {!loading && !error && boards.length === 0 && (
                            <p className="text-slate-400 dark:text-white/40">
                                Parece que aún no tienes ningún tablero
                            </p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-h-125 lg:max-h-96 overflow-y-auto pr-2">
                            {boards.map((board) => (
                                <div
                                    key={board.idTablero}
                                    onClick={() => handleClick(board.idTablero)}
                                    className="flex flex-col max-h-40 min-h-20 w-full
                                    bg-white dark:bg-[#111]
                                    border border-slate-200 dark:border-white/10
                                    rounded-xl p-4
                                    hover:border-indigo-400 dark:hover:border-[#A3FF12]/40
                                    hover:shadow-md
                                    cursor-pointer duration-200 transition-all"
                                >

                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-[#A3FF12] truncate p-2">
                                        {board.nombreTablero}
                                    </h2>

                                    <p className="text-xs text-slate-500 dark:text-white/60 line-clamp-3 px-2">
                                        {board.descripcionTablero}
                                    </p>

                                    <p className="text-xs text-slate-400 dark:text-white/50 p-2">
                                        Duración: {formatFecha(board?.fechaInicio)} al {formatFecha(board?.fechaFin)}
                                    </p>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BoardsPage;