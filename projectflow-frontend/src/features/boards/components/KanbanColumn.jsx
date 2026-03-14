import React, { useState } from 'react'
import KanbanCard from './KanbanCard';
import CreateTaskPopover from './CreateTaskPopover';
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

const KanbanColumn = ({ column, onAddTask, onTaskClick }) => {

    const [showForm, setShowForm] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [prioridad, setPrioridad] = useState("MEDIA");
    const [fechaLimite, setFecha] = useState("");
    const [loading, setLoading] = useState(false);

    const { ref: droppableRef } = useDroppable({
        id: String(column.idColumna),
        type: "column",
        accept: ["item"],      
        collisionPriority: CollisionPriority.Low,
        data: {
            columnId: column.idColumna,
            group: String(column.idColumna),
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        setLoading(true);
        await onAddTask(column.idColumna, {
            titulo,
            prioridad,
            fechaLimite: fechaLimite || null,

        });
        setTitulo("");
        setPrioridad("MEDIA");
        setFecha("");
        setShowForm(false);
        setLoading(false);
    }


    return (
        <div className="flex flex-col w-72 pt-8">

            <div className="flex items-center gap-2 px-1 mb-3">
                <span className="dark:text-white/80 text-sm font-semibold tracking-tight">
                    {column.nombreColumna}
                </span>
                <span className="text-[0.65rem] font-medium dark:text-white/30 dark:bg-white/5 border dark:border-white/10 rounded-full px-2 py-0.5">
                    {column.tarjetas?.length ?? 0}
                </span>
            </div>

            <div
                ref={droppableRef}
                className="flex flex-col gap-2.5 flex-1 min-h-30 rounded-2xl p-3 bg-white/60 dark:bg-white/3 border border-white/70 dark:border-white/6">
                {column.tarjetas?.map((task, index) => (
                    <KanbanCard
                        key={task.idTarjeta}
                        task={task}
                        index={index}
                        columnId={column.idColumna}
                        onTaskClick={onTaskClick}
                    />
                ))}

                <CreateTaskPopover columnId={column.idColumna} onAddTask={onAddTask} />

            </div>

        </div>
    )
}

export default KanbanColumn 