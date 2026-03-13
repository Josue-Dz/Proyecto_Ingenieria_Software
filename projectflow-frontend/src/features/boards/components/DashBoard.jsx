
import { useEffect, useState } from "react";
import { getProjectsRequest } from "../services/projectService";
import CreateProjectModal from "./CreateProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import EditProjectModal from "./EditProjectModal";
import ProjectCardMenu from "./ProjectCardMenu";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [projectToEdit, setProjectToEdit] = useState(null);

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

    // Cuando se cree un proyecto exitosamente, lo agrega al estado sin recargar
    const handleProjectCreated = (newProject) => {
        setProjects((prev) => [newProject, ...prev]);
    };

    const handleProjectDeleted = (deletedId) => {
        setProjects((prev) => prev.filter((p) => p.idProyecto !== deletedId));
    };

    const handleProjectUpdated = (updatedProject) => {
        setProjects((prev) =>
            prev.map((p) => p.idProyecto === updatedProject.idProyecto ? updatedProject : p)
        );
    };

    return (
        <div className="pt-6 pb-14">
            <h1 className="text-2xl font-bold dark:text-white mb-6">Mis Proyectos</h1>


            <div className="mb-4 flex justify-end">
                <button disabled={loading}
                    onClick={() => setIsModalOpen(true)} // Abre el modal para crear un nuevo proyecto
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#a3ff12]/15 border dark:border-[#a3ff12]/30 dark:text-[#a3ff12] text-base font-semibold dark:hover:bg-[#a3ff12]/25 transition-colors">
                    <span className="material-symbols-rounded text-lg">add</span>
                    Nuevo proyecto
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {projects.map((project) => (
                        <div
                            key={project.idProyecto}
                            className="flex flex-col bg-indigo-50/50 backdrop-blur-md dark:bg-black/60 border
                             border-gray-500/20 shadow-md dark:border-white/10 rounded-lg p-5
                              hover:border-indigo-400 duration-300 transition-all
                               dark:hover:border-[#A3FF12]/40"

                        >
                            {/* Header de la card con título y menú */}
                            <div className="flex items-start justify-between mb-2">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-[#A3FF12] 
                                leading-tight pr-2">
                                    {project.nombreProyecto}
                                </h2>
                                <ProjectCardMenu
                                    onEdit={() => setProjectToEdit(project)}
                                    onDelete={() => setProjectToDelete(project)}
                                />
                            </div>

                            <p className="text-slate-600 dark:text-gray-300 text-sm line-clamp-3 grow mb-4">
                                {project?.descripcion}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-gray-500 mb-4">
                                Fecha: {new Date(project?.fechaInicio).toLocaleDateString()}
                            </p>
                            <button
                                className=" w-1/3 border border-indigo-200 bg-indigo-50
                                 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300
                                  dark:bg-[#A3FF12]/20 dark:border-[#A3FF12]/40 dark:text-white py-2 rounded-lg
                                   dark:hover:bg-[#A3FF12]/30 transition-all duration-200 ease-in-out"
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

            {/* Modal de crear proyecto */}
            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProjectCreated={handleProjectCreated}
            />

            {/* Modal de eliminar proyecto */}
            <DeleteProjectModal
                isOpen={!!projectToDelete}
                onClose={() => setProjectToDelete(null)}
                project={projectToDelete}
                onProjectDeleted={handleProjectDeleted}
            />

                {/* Modal de editar proyecto */}
            <EditProjectModal
                isOpen={!!projectToEdit}
                onClose={() => setProjectToEdit(null)}
                project={projectToEdit}
                onProjectUpdated={handleProjectUpdated}
            />
        </div>
    );
};

export default Dashboard;
