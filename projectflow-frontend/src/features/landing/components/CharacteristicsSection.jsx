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
    },
    {
        icon: "task_alt",
        title: "Seguimiento de Tareas",
        description:
            "Crea, asigna y monitorea tareas con fechas límite y prioridades. Nunca pierdas de vista lo que falta por hacer.",
    },
    {
        icon: "sprint",
        title: "Metodologías Ágiles",
        description:
            "Trabaja con sprints, backlogs y revisiones. Aplica Scrum o Kanban directamente desde la plataforma sin configuraciones complejas.",
    },
    {
        icon: "bar_chart",
        title: "Reportes y Progreso",
        description:
            "Visualiza el avance de tu proyecto con métricas claras. Identifica cuellos de botella y toma decisiones basadas en datos reales.",
    },
];

const CharacteristicsSection = () => {
    return (
        <section id="caracteristicas" className="w-full py-16 px-6 md:px-20">

            {/**Encabezado */}
            <div className="text-center mb-12">
                <span className="text-[#A3FF12] text-sm font-semibold uppercase tracking-widest">
                    ¿Qué puedes hacer?
                </span>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mt-2">
                    Todo lo que necesitas,{" "}
                    <span className="text-[#A3FF12]">en un solo lugar</span>
                </h2>
                <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
                    Diseñado especialmente para estudiantes y equipos de la UNAH que
                    quieren gestionar sus proyectos de software con metodologías ágiles.
                </p>
            </div>

            {/**Card y renderizado de las mismas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-white/15 rounded-xl p-5 bg-white/3 hover:border-[#A3FF12]/50 hover:bg-white/6 hover:scale-[1.03] transition-all duration-300 group"
                    >
                        <div className="mb-3 w-11 h-11 rounded-lg bg-[#A3FF12]/10 flex items-center justify-center group-hover:bg-[#A3FF12]/20 transition-colors duration-300">
                            <span className="material-symbols-rounded text-[#A3FF12] text-2xl">
                                {feature.icon}
                            </span>
                        </div>
                        <h3 className="text-white font-semibold text-base mb-1">
                            {feature.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default CharacteristicsSection;