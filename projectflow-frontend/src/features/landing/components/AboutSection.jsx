/// Acerca de nosotros
const team = [
    {
        name: "Ronny Posadas",
        role: "Frontend Developer",
        initials: "RP",
        github: "https://github.com/Josue-Dz",
    },
    {
        name: "David Pavada",
        role: "Backend Developer",
        initials: "DP",
        github: "https://github.com/DeibiXD",
    },
    {
        name: "Jose Daniel Nuñez",
        role: "Full Stack Developer",
        initials: "JDN",
        github: "https://github.com/jdnunez-10",
    },
];

const AboutSection = () => {
    return (
        <section id="acerca-de" className="w-full py-16 px-6 md:px-20">

            {/* Línea divisoria sutil */}
            <div className="border-t border-white/10 mb-16" />

            {/* Misión */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">

                {/* Texto misión */}
                <div className="space-y-4">
                    <span className="text-[#A3FF12] text-sm font-semibold uppercase tracking-widest">
                        Acerca de nosotros
                    </span>
                    <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight">
                        Construido por{" "}
                        <span className="text-[#A3FF12]">Estudiantes UNAH</span>,<br />
                        para estudiantes UNAH
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Este proyecto nació como respuesta a la necesidad de contar con una
                        herramienta de gestión accesible y pensada para el contexto
                        universitario. Somos estudiantes de la carrera de Ingeniería de Sistemas de la
                        Universidad Nacional Autónoma de Honduras, cursando la clase Ingenieria del Software,
                        comprometidos con aplicar metodologías ágiles para nuestros proyectos de Software.
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Nuestra misión es facilitar la organización y colaboración de
                        equipos de trabajo académicos, ayudando a convertir ideas en
                        proyectos bien ejecutados.
                    </p>
                </div>

                {/* Estadísticas / highlights */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: "100%", label: "Open Source" },
                        { value: "Ágil", label: "Scrum & Kanban" },
                        { value: "UNAH", label: "Proyecto académico" },
                        { value: "2026", label: "Generación" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border border-white/15 rounded-xl p-4 bg-white/3 text-center"
                        >
                            <p className="text-[#A3FF12] text-2xl font-extrabold">
                                {item.value}
                            </p>
                            <p className="text-white/50 text-xs mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Equipo */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h3 className="text-white text-2xl font-bold">
                        Nuestro <span className="text-[#A3FF12]">equipo</span>
                    </h3>
                    <p className="text-white/50 text-sm mt-1">
                        Las personas que hicieron que este proyecto fuera posible
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="border border-white/15 rounded-xl p-5 bg-white/3 hover:border-[#A3FF12]/50 hover:scale-[1.03] transition-all duration-300 w-full sm:w-56 text-center group"
                        >
                            {/* Avatar con iniciales */}
                            <div className="w-14 h-14 rounded-full bg-[#A3FF12]/15 border border-[#A3FF12]/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#A3FF12]/25 transition-colors duration-300">
                                <span className="text-[#A3FF12] font-bold text-lg">
                                    {member.initials}
                                </span>
                            </div>
                            <h4 className="text-white font-semibold text-sm">{member.name}</h4>
                            <p className="text-white/50 text-xs mt-0.5">{member.role}</p>

                            {/* GitHub link */}
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-3 text-[#A3FF12]/70 hover:text-[#A3FF12] text-xs transition-colors duration-200"
                            >
                                <span className="material-symbols-rounded text-base">code</span>
                                GitHub
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;