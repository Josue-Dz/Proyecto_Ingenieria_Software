import  { useEffect, useState } from 'react'
import { getBoardsRequest } from '../services/boardService';
import { useNavigate, useParams } from 'react-router-dom';
import CreateBoardModal from '../components/CreateBoardModal';
import AddButton from '../components/AddButton';

const BoardsPage = () => {

    const { id } = useParams();
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const data = await getBoardsRequest(id);
                console.log("Estos son los boards del proyecto: ",data);
                setBoards(data);
            } catch (err) {
                setError("No se pudieron cargar los tableros");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBoards();
    }, [id]);

    const handleClick = (boardId) => {
        navigate(`/projects/${id}/boards/${boardId}`)
    }

  return (
    <div className="pt-6 pb-14">

        <h2 className="text-xl font-bold dark:text-white mb-6">Tableros del Proyecto</h2>

        <AddButton disabled={loading} setIsModalOpen={setIsModalOpen} textoBoton="Nuevo tablero"/>

        <CreateBoardModal 
            projectId={id} 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onBoardCreated={(newBoard) => setBoards(prev => [newBoard, ...prev])}
        />

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
                            {board.idTablero}
                        </h2>
                        <p>{board.nombre}</p>
                        <p>{board.descripcion}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default BoardsPage