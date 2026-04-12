import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed = false, onMouseLeave, isMobile, onMouseEnter }) => {
    return (
        <>

            {collapsed && isMobile && (
                <div
                    onClick={onMouseLeave}
                    className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40"
                />
            )}

            <aside
                onMouseEnter={!isMobile ? onMouseEnter : undefined}
                onMouseLeave={!isMobile ? onMouseLeave : undefined}
                className={`fixed left-0 top-16 h-[calc(100vh-64px)]
                        w-72 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md
                        border-r border-t border-indigo-600/20 dark:border-white/10 transition-all duration-300 ease-out
                        ${collapsed ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
                  `}
            >

                <div className="flex items-center justify-between px-4 dark:text-white">
                    <h2 className="text-sm md:text-lg font-bold tracking-wide">
                        {collapsed ? "Gestión Proyectos" : ""}
                    </h2>
                    <button onClick={onMouseLeave}
                        className="p-1 rounded-md hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-rounded">
                            {collapsed ? "chevron_left" : "chevron_right"}
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
                                {collapsed && <span className="text-sm font-medium">Dashboard</span>}
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
                                {collapsed && <span className="text-sm font-medium">Proyectos</span>}
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;