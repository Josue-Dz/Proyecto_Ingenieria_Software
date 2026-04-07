import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import { useBurndown } from "../hooks/useBurndown";

const ReportePage = () => {
    const { boardId} = useParams();
    const navigate = useNavigate();
    const { data, loading, error, fetchBurndown } = useBurndown();

    const today = new Date().toISOString().split("T")[0];
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState(today);

    const handleBuscar = () => {
        if (!fechaInicio || !fechaFin) return;
        fetchBurndown(boardId, fechaInicio, fechaFin);
    };

    // Formatear datos para recharts
    const chartData = data?.puntos?.map((p) => ({
        fecha: p.fecha,
        "Tareas totales": p.tareasTotalesEsperadas,
        "Completadas en el día": p.tareasCompletadasEnDia,
        "Restantes": p.tareasRestantes,
    })) ?? [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f0f] px-6 py-8">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10
                     transition-colors"
                >
                    <span className="material-symbols-rounded text-slate-500
                     dark:text-white/50 text-[20px]">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
                        Reporte de Sprint
                    </h1>
                    <p className="text-sm text-slate-400 dark:text-white/40 mt-0.5">
                        Burndown chart del tablero
                    </p>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200
             dark:border-white/10 rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-semibold text-slate-700 dark:text-white mb-4">
                    Rango del sprint
                </h2>
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500 dark:text-white/40 font-medium">
                            Fecha inicio
                        </label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="bg-slate-50 dark:bg-white/5 border border-slate-200
                             dark:border-white/10 rounded-lg px-3 py-2 text-sm
                             text-slate-800 dark:text-white focus:outline-none
                             focus:border-indigo-400 dark:focus:border-[#A3FF12]/40
                             transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500 dark:text-white/40 font-medium">
                            Fecha fin
                        </label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="bg-slate-50 dark:bg-white/5 border border-slate-200
                             dark:border-white/10 rounded-lg px-3 py-2 text-sm
                             text-slate-800 dark:text-white focus:outline-none
                             focus:border-indigo-400 dark:focus:border-[#A3FF12]/40
                             transition-colors"
                        />
                    </div>
                    <button
                        onClick={handleBuscar}
                        disabled={!fechaInicio || !fechaFin || loading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-indigo-600 dark:bg-[#A3FF12]/15 border border-indigo-600
                         dark:border-[#A3FF12]/30 text-white dark:text-[#A3FF12]
                         text-sm font-semibold hover:bg-indigo-700
                         dark:hover:bg-[#A3FF12]/25 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? <span className="material-symbols-rounded text-sm animate-spin">
                                progress_activity
                              </span>
                            : <span className="material-symbols-rounded text-sm">
                                search
                              </span>
                        }
                        {loading ? "Cargando..." : "Generar reporte"}
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl
                 bg-red-50 dark:bg-red-400/10 border border-red-200
                 dark:border-red-400/20 text-red-500 dark:text-red-400 text-sm mb-6">
                    <span className="material-symbols-rounded text-[18px]">error</span>
                    {error}
                </div>
            )}

            {/* Resultados */}
            {data && !loading && (
                <>
                    {/* Métrica de completitud */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200
                         dark:border-white/10 rounded-2xl p-5">
                            <p className="text-xs text-slate-400 dark:text-white/40 mb-1">
                                Completitud del sprint
                            </p>
                            <p className="text-3xl font-semibold text-indigo-600
                             dark:text-[#A3FF12]">
                                {data.porcentajeCompletitud.toFixed(1)}%
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200
                         dark:border-white/10 rounded-2xl p-5">
                            <p className="text-xs text-slate-400 dark:text-white/40 mb-1">
                                Total de tareas
                            </p>
                            <p className="text-3xl font-semibold text-slate-800 dark:text-white">
                                {data.puntos[0]?.tareasTotalesEsperadas ?? 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200
                         dark:border-white/10 rounded-2xl p-5">
                            <p className="text-xs text-slate-400 dark:text-white/40 mb-1">
                                Tareas restantes
                            </p>
                            <p className="text-3xl font-semibold text-slate-800 dark:text-white">
                                {data.puntos[data.puntos.length - 1]?.tareasRestantes ?? 0}
                            </p>
                        </div>
                    </div>

                    {/* Gráfica */}
                    <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200
                     dark:border-white/10 rounded-2xl p-6">
                        <h2 className="text-sm font-semibold text-slate-700
                         dark:text-white mb-6">
                            Burndown Chart
                        </h2>
                        <ResponsiveContainer width="100%" height={380}>
                            <ComposedChart data={chartData}
                                margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(148,163,184,0.15)"
                                />
                                <XAxis
                                    dataKey="fecha"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "#1a1a1a",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        color: "#fff"
                                    }}
                                    cursor={{ fill: "rgba(148,163,184,0.05)" }}
                                />
                                <Legend
                                    wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                                />
                                <Bar
                                    dataKey="Completadas en el día"
                                    fill="#6366f1"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={32}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="Restantes"
                                    stroke="#A3FF12"
                                    strokeWidth={2}
                                    dot={{ fill: "#A3FF12", r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="Tareas totales"
                                    stroke="#94a3b8"
                                    strokeWidth={1.5}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            {/* Empty state */}
            {!data && !loading && !error && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <span className="material-symbols-rounded text-slate-300
                     dark:text-white/20 text-5xl">insights</span>
                    <p className="text-slate-400 dark:text-white/30 text-sm">
                        Selecciona un rango de fechas para generar el reporte
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReportePage;