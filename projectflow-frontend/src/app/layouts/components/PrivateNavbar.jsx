import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo.png'
import { useAuth } from '../../../features/auth/context/AuthContext';

const PrivateNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login")
    }

    return (
        <nav className="fixed top-0 w-full z-30 bg-black/70 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-3 text-white">

                <div className="flex items-center gap-3">
                    <img src={Logo} className="w-12 h-12" alt="Logo de la aplicación" />
                    <h1 className="text-lg font-semibold tracking-wide">Dashboard</h1>
                </div>

                <div className="flex items-center gap-8">

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col text-right">
                            <p className="text-sm font-medium">{user?.nombreCompleto}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#A3FF12]/15 border border-[#A3FF12]/30 flex items-center justify-center transition-colors duration-300 hover:bg-[#A3FF12]/25">
                            <span className="text-[#A3FF12] font-bold text-lg">
                                {user?.iniciales}
                            </span>
                        </div>
                    </div>

                    {/* Logout */}
                    <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-300">
                        <span className="material-symbols-rounded">logout</span>
                        <p className="text-sm">Cerrar Sesión</p>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default PrivateNavbar