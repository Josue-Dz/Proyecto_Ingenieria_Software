import { useEffect, useState } from "react";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Llamada al backend para obtener proyectos del usuario autenticado
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get("/projects/my-projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="pt-6">
            <h1 className="text-2xl font-bold text-white mb-6">Mis Proyectos</h1>

            {projects.length === 0 ? (
                <p className="text-gray-400">No participas en ningún proyecto aún.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-black/60 border border-white/10 rounded-lg p-5 hover:border-[#A3FF12]/40 transition-colors"
                        >
                            <h2 className="text-lg font-semibold text-[#A3FF12] mb-2">
                                {project.nombre}
                            </h2>
                            <p className="text-gray-300 text-sm mb-4">
                                {project.descripcion}
                            </p>
                            <p className="text-xs text-gray-500 mb-4">
                                Fecha: {new Date(project.fecha).toLocaleDateString()}
                            </p>
                            <button
                                className="w-full bg-[#A3FF12]/20 border border-[#A3FF12]/40 text-[#A3FF12] py-2 rounded-md hover:bg-[#A3FF12]/30 transition-colors"
                                onClick={() => {
                                    // redirigir al panel de gestión
                                    window.location.href = `/projects/${project.id}`;
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
