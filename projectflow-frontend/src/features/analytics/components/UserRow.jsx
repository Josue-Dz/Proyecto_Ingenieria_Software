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
        <div className="grid grid-cols-7 gap-6 items-center p-4 border-t hover:bg-indigo-300/10">

            {/* Usuario */}
            <div className="flex items-center gap-3">
                <button className="text-xs font-bold w-10 aspect-square flex items-center justify-center rounded-full transition-all"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                    {user.iniciales}
                </button>
                <div>
                    <p className="font-semibold text-xs sm:text-base md:text-lg">{user.nombre}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Miembro del equipo</p>
                </div>
            </div>


            <div className="text-center font-bold">{user.totalAsignadas}</div>

            <ProgressBar value={user.pendientes} displayValue={getPorcentaje(user.pendientes)} color="yellow" />

            <ProgressBar value={user.enProgreso} displayValue={getPorcentaje(user.enProgreso)} color="blue" />

            <ProgressBar value={user.finalizadas} displayValue={getPorcentaje(user.finalizadas)} color="green" />

            {/* Eficiencia */}
            <div className="flex items-center gap-2 p-1">

                <CircularProgress porcentaje={porcentaje} />  {/*Modificar esto no esta bien*/}

                <MiniChart user={user} efficiency={porcentaje} />

            </div> 

            {/* Botón */}
            <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                Ver más
            </button>

        </div>
    );
};

export default UserRow;