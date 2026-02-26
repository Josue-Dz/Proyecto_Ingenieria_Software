import { useState } from "react"


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <aside className={`${isOpen ? "w-64" : "w-20"
            } h-screen bg-black/80 backdrop-blur-sm border-r border-white/10 fixed left-0 top-16 transition-all duration-300`}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 text-white">
                <h2 className="text-sm md:text-lg font-bold tracking-wide">
                    {isOpen ? "Gestión Proyectos" : "GP"}
                </h2>
                <button onClick={toggleMenu}
                    className="p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-rounded">
                        {isOpen ? "chevron_left" : "chevron_right"}
                    </span>
                </button>
            </div>

            {/*Opciones */}
            <nav className="mt-6 text-white">
                <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#A3FF12]/20 rounded-md cursor-pointer transition-colors">
                        <span className="material-symbols-rounded text-[#A3FF12]">dashboard</span>
                        {isOpen && <span>Tableros</span>}
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar