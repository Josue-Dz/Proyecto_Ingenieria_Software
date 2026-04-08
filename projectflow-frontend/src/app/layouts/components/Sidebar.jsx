import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle }) => {
    return (
        <>
            <aside className={`${isOpen ? "w-64" : "w-20"} h-screen bg-white/25 dark:bg-black/80 backdrop-blur-sm border-r border-indigo-600/20 dark:border-white/10 fixed left-0 top-16 pt-6 transition-all duration-300`}>

                <div className="flex items-center justify-between px-4 dark:text-white">
                    <h2 className="text-sm md:text-lg font-bold tracking-wide">
                        {isOpen ? "Gestión Proyectos" : ""}
                    </h2>
                    <button onClick={onToggle}
                        className="p-1 rounded-md hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-rounded">
                            {isOpen ? "chevron_left" : "chevron_right"}
                        </span>
                    </button>
                </div>

                <nav className="mt-6 dark:text-white">
                    <ul className="flex flex-col gap-2 px-2">

                        {/* Dashboard */}
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-md transition-colors
                            ${isActive
                                        ? "bg-indigo-600/20 dark:bg-[#A3FF12]/20 text-indigo-700 dark:text-[#A3FF12]"
                                        : "hover:bg-indigo-600/15 dark:hover:bg-[#A3FF12]/10 text-gray-700 dark:text-white"
                                    }`
                                }
                                title="Dashboard"
                            >
                                <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12] shrink-0">
                                    analytics
                                </span>
                                {isOpen && <span className="text-sm font-medium">Dashboard</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/projects"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                                ${isActive
                                        ? "bg-indigo-600/20 dark:bg-[#A3FF12]/20 text-indigo-700 dark:text-[#A3FF12]"
                                        : "hover:bg-indigo-600/15 dark:hover:bg-[#A3FF12]/10 text-gray-700 dark:text-white"
                                    }`
                                }
                                title="Proyectos"
                            >
                                <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12] shrink-0">
                                    folder_open
                                </span>
                                {isOpen && <span className="text-sm font-medium">Proyectos</span>}
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;