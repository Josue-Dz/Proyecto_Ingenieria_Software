
import { useEffect, useState } from "react";
import { getProjectsRequest } from "../services/projectService";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjectsRequest();
                console.log("Esta es la lista de proyectos:", data); //borrar luego para no tener ese monton de objetos en consola
                setProjects(data);
            } catch (err) {
                setError("No se pudieron cargar los proyectos.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="pt-6">
            <h1 className="text-2xl font-bold text-white mb-6">Mis Proyectos</h1>

            <div className="mb-4 flex justify-end">
                <button disabled={loading} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#a3ff12]/15 border border-[#a3ff12]/30 text-[#a3ff12] text-base font-semibold hover:bg-[#a3ff12]/25 transition-colors" >
                    <span className="material-symbols-rounded text-lg">add</span>
                    Crear proyecto
                </button>

            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-black/60 border border-white/10 rounded-lg p-5 animate-pulse">
                            <div className="w-2/3 h-4 rounded bg-white/10 mb-3" />
                            <div className="w-full h-3 rounded bg-white/10 mb-2" />
                            <div className="w-4/5 h-3 rounded bg-white/10 mb-4" />
                            <div className="w-full h-8 rounded bg-white/10" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="text-red-400/70 text-sm">{error}</p>
            )}

            {!loading && !error && projects.length === 0 && (
                <p className="text-gray-400">No participas en ningún proyecto aún.</p>
            )}

            {!loading && !error && projects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.idProyecto}
                            className="bg-black/60 border border-white/10 rounded-lg p-5 hover:border-[#A3FF12]/40 transition-colors"
                        >
                            <h2 className="text-lg font-semibold text-[#A3FF12] mb-2">
                                {project.nombreProyecto}
                            </h2>
                            <p className="text-gray-300 text-sm mb-4">
                                {project?.descripcion}
                            </p>
                            <p className="text-xs text-gray-500 mb-4">
                                Fecha: {new Date(project?.fechaInicio).toLocaleDateString()}
                            </p>
                            <button
                                className="w-full bg-[#A3FF12]/20 border border-[#A3FF12]/40 text-white py-2 rounded-md hover:bg-[#A3FF12]/30 transition-colors"
                                onClick={() => {
                                    window.location.href = `/projects/${project.idProyecto}`;
                                }}
                            >
                                Ver Panel
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
