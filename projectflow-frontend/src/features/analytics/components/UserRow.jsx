import CircularProgress from "./CircularProgress";
import MiniChart from "./MiniChart";
import ProgressBar from "./ProgressBar";

const UserRow = ({ user, totalTask }) => {

    const porcentaje = totalTask
        ? ((user.finalizadas / totalTask) * 100).toFixed(0)
        : 0;

    const getPorcentaje = (cantidad) => {
        return user.totalAsignadas > 0
            ? (cantidad / user.totalAsignadas)
            : 0;
    };

    return (
        <div className="grid grid-cols-7 gap-6 items-center p-4 border-t border-slate-200 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-white/5 transition-colors">

            <div className="flex items-center gap-3">
                <button
                    className="text-xs font-bold w-10 aspect-square flex items-center justify-center rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                    {user.iniciales}
                </button>
                <div>
                    <p className="font-semibold text-xs sm:text-base md:text-lg text-slate-800 dark:text-white">
                        {user.nombre}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-white/40">
                        Miembro del equipo
                    </p>
                </div>
            </div>

            <div className="text-center font-bold text-slate-700 dark:text-white/80">
                {user.totalAsignadas}
            </div>

            <ProgressBar
                value={user.pendientes}
                displayValue={getPorcentaje(user.pendientes)}
                color="yellow"
            />

            <ProgressBar
                value={user.enProgreso}
                displayValue={getPorcentaje(user.enProgreso)}
                color="blue"
            />

            <ProgressBar
                value={user.finalizadas}
                displayValue={getPorcentaje(user.finalizadas)}
                color="green"
            />

            <div className="flex items-center gap-2 p-1">
                <CircularProgress porcentaje={porcentaje} />
                <MiniChart user={user} efficiency={porcentaje} />
            </div>

        </div>
    );
};

export default UserRow;