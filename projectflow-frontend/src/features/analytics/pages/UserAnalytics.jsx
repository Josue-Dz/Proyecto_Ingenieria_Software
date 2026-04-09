import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import UserRow from "../components/UserRow";
import KPI from "../components/KPI";
import { useNavigate, useParams } from "react-router-dom";
import { exportarReporteUsuariosRequest } from "../services/reportService";
import { useState } from "react";

const UserAnalytics = ({ users = [] }) => {

    const userStats = users;
    const navigate = useNavigate();
    const { id: idProyecto, boardId, id: idTablero } = useParams();
    const [exportLoading, setExportLoading] = useState(null);

    //KPIs
    const totalUsers = users.length;

    const totalTasks = users.reduce((acumulador, usuario) => {
        return acumulador + usuario.pendientes + usuario.enProgreso + usuario.finalizadas;
    }, 0);

    const totalDone = users.reduce((acumulador, usuario) => {
        return acumulador + usuario.finalizadas;
    }, 0);

    const porcentajeDone = totalTasks
        ? ((totalDone / totalTasks) * 100).toFixed(0)
        : 0;

    const avgEfficiency = users.length ?
        (users.reduce((acumulador, user) => acumulador + user.eficiencia, 0) / users.length).toFixed(1)
        : (0)


        // Función para exportar reporte de usuarios
        const handleExportar = async (formato) => {
    setExportLoading(formato);
    try {
        const response = await exportarReporteUsuariosRequest(idTablero, formato);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `reporte_usuarios.${formato === "excel" ? "xlsx" : "pdf"}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Error al exportar:", err);
    } finally {
        setExportLoading(null);
    }
};

    return (

        <>
            <div className="flex justify-between mb-4">
    <div className="flex items-center">
        <button
            onClick={() => navigate(`/projects/${idProyecto}/boards/${boardId}`)}
            className="flex items-center hover:bg-indigo-500/10 px-4 py-2 rounded-lg gap-2"
        >
            <span className="material-symbols-rounded">keyboard_backspace</span>
            <p>Volver al tablero</p>
        </button>
    </div>

    <div className="flex items-center gap-2">
        {/* Botones exportación — solo aparecen si hay datos*/}
        {users.length > 0 && (
            <>
                <button
                    onClick={() => handleExportar("pdf")}
                    disabled={exportLoading !== null}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     border border-slate-200 dark:border-white/10 text-slate-600
                     dark:text-white/70 text-sm hover:bg-slate-50
                     dark:hover:bg-white/5 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {exportLoading === "pdf"
                        ? <span className="material-symbols-rounded text-sm animate-spin">
                            progress_activity
                          </span>
                        : <span className="material-symbols-rounded text-sm text-red-500">
                            picture_as_pdf
                          </span>
                    }
                    {exportLoading === "pdf" ? "Generando..." : "PDF"}
                </button>

                <button
                    onClick={() => handleExportar("excel")}
                    disabled={exportLoading !== null}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     border border-slate-200 dark:border-white/10 text-slate-600
                     dark:text-white/70 text-sm hover:bg-slate-50
                     dark:hover:bg-white/5 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {exportLoading === "excel"
                        ? <span className="material-symbols-rounded text-sm animate-spin">
                            progress_activity
                          </span>
                        : <span className="material-symbols-rounded text-sm text-green-500">
                            table_view
                          </span>
                    }
                    {exportLoading === "excel" ? "Generando..." : "Excel"}
                </button>
            </>
        )}

            <button
                onClick={() => navigate(`/projects/${idProyecto}/boards/${boardId}/reportes`)}
                className="flex justify-center md:w-12 rounded-md hover:bg-gray-500/10
                dark:hover:bg-white/10 p-1 transition-colors"
                title="Progreso Sprint"
            >
                <span className="material-symbols-rounded text-indigo-600
                dark:text-[#A3FF12] shrink-0">analytics</span>
            </button>
        </div>
    </div>

            <div className="p-6 bg-gray-50 min-h-screen rounded-md">

                {/* HEADER */}
                <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                        Vista de Carga de Trabajo y Eficiencia del Equipo
                    </h2>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-4 gap-4 mb-6">

                    <KPI title="Total de Miembros" value={totalUsers} />
                    <KPI title="Total de Tareas" value={totalTasks} />
                    <KPI title="Tasa de Finalización" value={`${porcentajeDone}%`} />
                    <KPI title="Eficiencia Promedio" value={`${avgEfficiency} días`} />

                </div>

                {/* TABLA */}
                <div className="bg-white rounded-xl shadow overflow-hidden">

                    {/* HEADER TABLA */}
                    <div className="grid grid-cols-7 p-4 bg-gray-100 text-sm font-semibold">
                        <div>Miembro</div>
                        <div className="text-center">Asignadas</div>
                        <div>Pendientes</div>
                        <div>En Progreso</div>
                        <div>Finalizadas</div>
                        <div>Eficiencia</div>
                        <div>Detalle</div>
                    </div>

                    {userStats.map(user => (
                        <UserRow key={user.nombre} user={user} totalTask={totalTasks} />
                    ))}

                </div>

                {/* GRÁFICO GENERAL */}
                <div className="bg-white p-6 rounded-xl shadow mt-6">
                    <h3 className="font-semibold mb-4">Tareas por Estado</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userStats}>
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar dataKey="pendientes" fill="#facc15" />
                            <Bar dataKey="enProgreso" fill="#3b82f6" />
                            <Bar dataKey="finalizadas" fill="#22c55e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </>

    );
};

export default UserAnalytics;