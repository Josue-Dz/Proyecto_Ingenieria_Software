import { useNavigate } from 'react-router-dom';
import LogoLight from '../../../assets/LogoLight.png'
import LogoDark from '../../../assets/LogoDark.png'
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useDarkMode } from '../hooks/useDarkMode';
import NotificationBell from '../../../features/notifications/components/NotificactionBell';
import { useEffect, useRef, useState } from 'react';

const statusColor = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    idle: "bg-yellow-400"
};

const PrivateNavbar = ({ onLogoHover, isMobile }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { isDark, toggle } = useDarkMode();

    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-30 bg-indigo-50/70 dark:bg-black/70 backdrop-blur-sm border-b dark:border-white/10 border-indigo-600/20">

            <div className="flex items-center justify-between px-4 py-2 dark:text-white">

                <div className="flex items-center gap-2">

                    {/*hamburguesa */}
                    <button
                        onClick={() => onLogoHover(true)}
                        className="md:hidden p-2 rounded-md hover:bg-indigo-200 dark:hover:bg-white/10"
                    >
                        <span className="material-symbols-rounded">menu</span>
                    </button>

                    <div
                        className="flex items-center gap-2"
                        onMouseEnter={!isMobile ? () => onLogoHover(true) : undefined}
                        onMouseLeave={!isMobile ? () => onLogoHover(false) : undefined}
                    >
                        <img
                            src={isDark ? LogoDark : LogoLight}
                            className="w-8 h-8 sm:w-10 sm:h-10"
                            alt="Logo"
                        />
                        <h1 className="text-base sm:text-lg font-semibold">
                            Dashboard
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">

                    {/* modo oscuro */}
                    <button onClick={toggle}>
                        <span className="material-symbols-rounded p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-white/10 
                            transition">
                            {isDark ? "light_mode" : "dark_mode"}
                        </span>
                    </button>

                    <NotificationBell isMobile={isMobile}/>

                    <div ref={menuRef} className="relative">
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="flex items-center gap-2 sm:gap-3 px-2 py-1 rounded-md hover:bg-indigo-200/30 dark:hover:bg-white/10 transition"
                        >

                            <div className="hidden sm:flex flex-col text-right leading-tight">
                                <span className="text-sm font-medium">
                                    {user?.nombreCompleto}
                                </span>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-indigo-200/40 dark:bg-[#A3FF12]/15 flex items-center justify-center">
                                <span className="text-indigo-600 dark:text-[#A3FF12] font-bold text-sm">
                                    {user?.iniciales}
                                </span>
                            </div>

                            {/* <span
                                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-black
                                        ${user?.estado === "online" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                            /> */}

                        </button>

                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-black/90 backdrop-blur-md 
                                    border border-gray-200 dark:border-white/10 rounded-xl shadow-lg z-50 p-2"
                            >
                                <button
                                    onClick={() => {
                                        setOpenMenu(false);
                                        navigate("/perfil");
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-indigo-100 
                                        dark:hover:bg-white/10 text-sm flex items-center gap-2"
                                >
                                    <span className="material-symbols-rounded text-sm">person</span>
                                    Perfil
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 rounded-md hover:bg-red-100 
                                        dark:hover:bg-red-500/20 text-sm flex items-center gap-2 text-red-500"
                                >
                                    <span className="material-symbols-rounded text-sm">logout</span>
                                    Cerrar sesión
                                </button>

                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PrivateNavbar