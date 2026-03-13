import { useNavigate, Link } from 'react-router-dom';
import LogoLight from '../../../assets/LogoLight.png'
import LogoDark from '../../../assets/LogoDark.png'
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useDarkMode } from '../hooks/useDarkMode';

const PrivateNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { isDark, toggle } = useDarkMode();

    const handleLogout = async () => {
        await logout();
        navigate("/login")
    }

    return (
        <nav className="fixed top-0 w-full z-30 bg-indigo-50/70 dark:bg-black/70 backdrop-blur-sm border-b
         dark:border-white/10 border-indigo-600/20">
            <div className="flex items-center justify-between px-6 py-3 dark:text-white">

                <div className="flex items-center gap-3">
                    <img src={isDark ? LogoDark : LogoLight} className="w-12 h-12" alt="Logo de la aplicación" />
                    <h1 className="text-lg font-semibold tracking-wide">Dashboard</h1>
                </div>

                <div className='p-2'>
                    <button onClick={toggle}>
                        <span className="material-symbols-rounded dark:text-white">
                            {isDark ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                </div>

                <div className="flex items-center gap-8">


                    {/* Burbuja de usuario — ahora es un link a /perfil */}
                    <Link
                        to="/perfil"
                        className="flex items-center gap-3 rounded-md group"
                        title="Ver mi perfil"

                        >


                        <div className="flex flex-col text-right px-2 py-2">
                            <p className="text-sm font-medium">{user?.nombreCompleto}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-indigo-200/40 hover:bg-indigo-500/30
                         dark:bg-[#A3FF12]/15 border border-indigo-500
                          dark:border-[#A3FF12]/30 flex items-center justify-center transition-colors duration-300
                           dark:hover:bg-[#A3FF12]/25">
                            <span className="text-indigo-600 dark:text-[#A3FF12] font-bold text-lg">
                                {user?.iniciales}
                            </span>
                        </div>

                    </Link>
                    

                    {/**Logout */}
                    <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 hover:shadow-md rounded-md hover:bg-indigo-200/30 dark:hover:bg-white/10 transition-colors duration-300">
                        <span className="material-symbols-rounded">logout</span>
                        <p className="text-sm">Cerrar Sesión</p>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default PrivateNavbar