import { DragDropProvider } from "@dnd-kit/react"
import { useEffect } from "react"
import BoardCore from "../../boards/components/BoardCore";
import { useKanban } from "../../boards/hooks/useKanban";

const ProjectBacklog = ({ userRol, backlog, canCreate, canMove }) => {
    const {columns, items, taskMap, setBacklogColumn, updateTask, addTask, setItems,moveTask, updateColumn } = useKanban(null);

    useEffect(() => {
        if (backlog && backlog.idColumna) {
            setBacklogColumn(backlog);
        }
    }, [backlog]);


    return (
        <>
            <DragDropProvider>
                <BoardCore columns={columns}
                    items={items}
                    userRol={userRol}
                    taskMap={taskMap}
                    canCreate={canCreate}
                    canMove={canMove}
                    addTask={addTask}
                    setItems={setItems}
                    updateTask={updateTask}
                    updateColumn={updateColumn}
                    moveTask={moveTask} />
            </DragDropProvider>
        </>
    )
}

export default ProjectBacklog