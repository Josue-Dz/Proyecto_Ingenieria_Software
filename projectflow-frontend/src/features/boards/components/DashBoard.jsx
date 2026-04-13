
import KPI from "../../analytics/components/KPI";
import { useDashboard } from "../hooks/useDashboard";

import {
    PieChart, Pie,
    XAxis, YAxis, Tooltip,
    BarChart, Bar, Legend, ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid
} from "recharts";

const COLORS = {
    pendientes: "#eab308",
    enProgreso: "#3b82f6",
    finalizadas: "#22c55e",
    vencidas: "#ef4444"
};

const DashBoard = () => {

    const { data, loading } = useDashboard();

    if (loading) return <p>Cargando...</p>;
    if (!data) return <p>Sin datos</p>;

    const estadoData = [
        { name: "Pendientes", value: data.pendientes, fill: COLORS.pendientes },
        { name: "En progreso", value: data.enProgreso, fill: COLORS.enProgreso },
        { name: "Completadas", value: data.finalizadas, fill: COLORS.finalizadas },
        { name: "Vencidas", value: data.vencidas, fill: COLORS.vencidas }
    ];

    const progresoData = data.progresoSemanal || [];
    const proyectosData = data.tareasPorProyecto || [];

    return (
        <div className="p-6 space-y-6 dark:bg-[#0a0a0b] rounded-2xl min-h-screen overflow-hidden">

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

                <KPI title="Proyectos Activos" value={data.proyectosActivos} />
                <KPI title="Pendientes" value={data.pendientes} />
                <KPI title="En Progreso" value={data.enProgreso} />
                <KPI title="Completadas" value={data.finalizadas} />
                <KPI title="Eficiencia" value={`${data.eficiencia}%`} />
                <KPI title="Vencidas" value={data.vencidas} />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="bg-white dark:bg-[#0f0f10] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Estado de Tareas</h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={estadoData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={90}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#111",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    color: "#fff"
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="flex gap-4 mt-4 flex-wrap text-slate-600 dark:text-white/70">
                        {estadoData.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.fill }}
                                />
                                {item.name} ({item.value})
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0f0f10] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Eficiencia</h3>

                    <div className="text-5xl font-bold text-indigo-600 dark:text-[#A3FF12]">
                        {data.eficiencia}%
                    </div>

                    <p className="text-sm text-slate-500 dark:text-white/40">
                        Tareas completadas a tiempo
                    </p>
                </div>

                <div className="bg-white dark:bg-[#0f0f10] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Progreso Semanal</h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={progresoData}>
                            <defs>
                                <linearGradient id="colorCompletadas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.finalizadas} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={COLORS.finalizadas} stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="colorPendientes" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.pendientes} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={COLORS.pendientes} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />

                            <XAxis
                                dataKey="dia"
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                            />

                            <YAxis
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#111",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    color: "#fff"
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="completadas"
                                stroke={COLORS.finalizadas}
                                fill="url(#colorCompletadas)"
                                strokeWidth={2}
                                name="Finalizadas"
                            />

                            <Area
                                type="monotone"
                                dataKey="pendientes"
                                stroke={COLORS.pendientes}
                                fill="url(#colorPendientes)"
                                strokeWidth={2}
                                name="Pendientes"
                            />

                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <div className="bg-white dark:bg-[#0f0f10] p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                <h3 className="font-semibold mb-4 text-slate-800 dark:text-white">Tareas por Proyecto</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={proyectosData}>
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#94a3b8" }}
                            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        />
                        <YAxis
                            tick={{ fill: "#94a3b8" }}
                            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "#fff"
                            }}
                        />
                        <Legend />
                        <Bar dataKey="finalizadas" fill={COLORS.finalizadas} />
                        <Bar dataKey="enProgreso" fill={COLORS.enProgreso} />
                        <Bar dataKey="pendientes" fill={COLORS.pendientes} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default DashBoard;