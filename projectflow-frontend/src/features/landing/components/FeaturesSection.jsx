<i class="bi bi-people-fill"></i>

const FeaturesSection = () => {

    const features = [
        {
            icon: "view_kanban",
            title: "Tableros Kanban",
            description:
                "Organiza tus tareas de manera visual y dinámica. Arrastra y suelta actividades, controla el progreso y mantén la claridad en cada proyecto.",
        },
        {
            icon: "groups",
            title: "Gestión de Equipos",
            description:
                "Coordina fácilmente a tu equipo. Asigna responsabilidades, comparte avances y fomenta la colaboración en un espacio centralizado.",
        },
        {
            icon: "folder_open",
            title: "Proyectos Académicos",
            description:
                "Administra tus trabajos y proyectos educativos. Lleva un registro ordenado de entregas, plazos y recursos para alcanzar tus metas.",
        }
    ]

    return (
        <section>
            <div className="flex flex-col py-6 px-4 md:px-20 justify-between gap-3 md:flex-row dark:text-white md:text-base text-sm">

                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-gray-500/10 rounded-xl p-5 bg-white/25 shadow-md dark:shadow-none hover:border-indigo-400 dark:bg-white/3 dark:hover:border-[#A3FF12]/50 dark:hover:bg-white/6 hover:scale-[1.03] transition-all duration-300 group"
                    >
                        <div className="mb-3 w-11 h-11 rounded-lg bg-indigo-200/10 dark:bg-[#A3FF12]/10 flex items-center justify-center dark:group-hover:bg-[#A3FF12]/20 transition-colors duration-300">
                            <span className="material-symbols-rounded text-indigo-600 dark:text-[#A3FF12] text-2xl">
                                {feature.icon}
                            </span>
                        </div>
                        <h3 className="dark:text-white font-semibold text-base mb-1">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    )
}

export default FeaturesSection