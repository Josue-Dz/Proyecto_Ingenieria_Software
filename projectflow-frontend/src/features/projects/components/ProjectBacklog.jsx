import { DragDropProvider } from "@dnd-kit/react"
import KanbanColumn from "../../boards/components/KanbanColumn"

const ProjectBacklog = ({ backlog }) => {
    return (
        <>
            <DragDropProvider>
                <KanbanColumn column={backlog} />
            </DragDropProvider>
        </>
    )
}

export default ProjectBacklog