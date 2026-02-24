<i class="bi bi-people-fill"></i>

const FeaturesSection = () => {
    return (
        <section>
            <div className='flex flex-col py-6 px-20 justify-between gap-3 md:flex-row text-white md:text-base text-sm'>

                <div className='border border-white/25 rounded w-full md:w-1/3 p-3 min-w-32 max-w-sm mx-auto hover:scale-104 transition-transform duration-300'>

                    <span className="material-symbols-rounded">view_kanban</span>

                    <h2 className='pb-1'>Tableros Kanban</h2>

                    <p className='text-white/75'>
                        Organiza tus tareas de manera visual y dinámica. Arrastra y suelta actividades, controla el progreso y mantén la claridad en cada proyecto.
                    </p>

                </div>

                <div className='border border-white/25 rounded w-full md:w-1/3 p-3 min-w-32 max-w-sm mx-auto hover:scale-104 transition-transform duration-300'>

                    <span className="material-symbols-rounded">groups</span>

                    <h2 className='pb-1'>Gestión de Equipos</h2>

                    <p className='text-white/75'>
                        Coordina fácilmente a tu equipo. Asigna responsabilidades, comparte avances y fomenta la colaboración en un espacio centralizado.
                    </p>

                </div>

                <div className='border border-white/25 rounded w-full md:w-1/3 p-3 min-w-32 max-w-sm mx-auto hover:scale-104 transition-transform duration-300'>

                    <span className="material-symbols-rounded">folder_open</span>

                    <h2 className='pb-1'>Proyectos Académicos</h2>

                    <p className='text-white/75'>
                        Administra tus trabajos y proyectos educativos. Lleva un registro ordenado de entregas, plazos y recursos para alcanzar tus metas académicas.
                    </p>

                </div>

            </div>
        </section>
    )
}

export default FeaturesSection