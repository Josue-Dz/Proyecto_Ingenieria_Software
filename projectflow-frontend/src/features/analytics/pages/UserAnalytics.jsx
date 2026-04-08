import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import UserRow from "../components/UserRow";
import KPI from "../components/KPI";
import { useNavigate, useParams } from "react-router-dom";

const UserAnalytics = ({ tasks = [], users = [], onBack }) => {

    const userStats = users;
    const navigate = useNavigate();
    const { id: idProyecto, boardId } = useParams();

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

    return (

        <>
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <button
                        onClick={() => { navigate(`/projects/${idProyecto}/boards/${boardId}`) }}
                        className="flex items-center hover:bg-indigo-500/10 px-4 py-2 rounded-lg gap-2"
                    >
                        <span class="material-symbols-rounded">
                            keyboard_backspace
                        </span>
                        <p>Volver al tablero</p>
                    </button>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={() => navigate(`/projects/${idProyecto}/boards/${boardId}/reportes`)}
                        //onClick={() => navigate(`/projects/${idProyecto}/boards/${boardId}/analytics`)}
                        className="flex justify-center md:w-12 rounded-md hover:bg-gray-500/10 dark:hover:bg-white/10 p-1 transition-colors"
                        title="Progreso Sprint"
                    >
                        <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12] shrink-0">
                            analytics
                        </span>
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