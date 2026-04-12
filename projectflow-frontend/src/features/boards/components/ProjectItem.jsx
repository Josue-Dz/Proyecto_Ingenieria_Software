const STATUS_STYLES = {
    "En progreso": "bg-blue-500/10 text-blue-500",
    "En riesgo": "bg-red-500/10 text-red-500",
    "Completado": "bg-green-500/10 text-green-500",
};

const ProjectItem = ({ name, status, progress = 0, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="p-4 rounded-xl border bg-white hover:shadow-md transition cursor-pointer"
        >
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-slate-700">{name}</h4>

                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[status]}`}>
                    {status}
                </span>
            </div>

            {/* Progreso */}
            <div className="w-full bg-slate-100 h-2 rounded-full">
                <div
                    className="bg-indigo-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-right text-xs text-slate-400 mt-1">
                {progress}%
            </div>
        </div>
    );
};

export default ProjectItem;