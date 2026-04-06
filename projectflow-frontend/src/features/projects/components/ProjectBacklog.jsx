import { DragDropProvider } from "@dnd-kit/react"
import KanbanColumn from "../../boards/components/KanbanColumn"

const ProjectBacklog = ({ backlog, canCreate, canMove, onAddTask }) => {

    return (
        <>
            <DragDropProvider>
                <KanbanColumn column={backlog} index={0} canCreate={canCreate} canMove={canMove} onAddTask={onAddTask}/>
            </DragDropProvider>
        </>
    )
}

export default ProjectBacklog