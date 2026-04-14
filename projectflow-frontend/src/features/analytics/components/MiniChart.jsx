import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from "recharts";

const MiniChart = ({ user }) => {

    const data = [
        { name: "Pend", v: user.pendientes },
        { name: "Prog", v: user.enProgreso },
        { name: "Fin", v: user.finalizadas }
    ];

    return (
        <div className="w-24 h-12 flex items-center opacity-70">
            <ResponsiveContainer width="100%" height={40}>
                <AreaChart data={data}>

                    <defs>
                        <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fill="url(#colorTasks)"
                    />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MiniChart;