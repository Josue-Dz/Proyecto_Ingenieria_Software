import { useParams } from "react-router-dom"
import KanbanBoard from "../components/KanbanBoard";

const BoardPage = () => {
    const { id } = useParams();

    return (
        <div className="pt-6">
            <KanbanBoard boardId={id}/>
        </div>
    )
}

export default BoardPage