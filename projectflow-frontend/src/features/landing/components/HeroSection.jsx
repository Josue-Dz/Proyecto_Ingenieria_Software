import Landing from '../../../assets/Landing1.png'

const HeroSection = () => {
    return (
        <section className='w-full'>
            <div className="grid grid-cols-1 md:grid-cols-2">

                <div className="sm:p-4 md:p-8 lg:p-20 xl:p-24 space-y-2">
                   <h1 className="text-4xl font-extrabold leading-tight dark:text-white">
                        Organiza tus ideas. <br />
                        Impulsa tus proyectos. <br />
                        <span className="text-indigo-600 dark:text-[#A3FF12]">Colabora sin límites.</span>
                    </h1>
                    <p className=" text-gray-600 dark:text-white/70 text-sm">
                        Visualiza tareas, coordina equipos y lleva tus proyectos al siguiente nivel con una plataforma intuitiva y flexible.
                    </p>
                </div>

                <div className="flex p-4 sm:p-2 md:p-15 lg:p-20">
                    <img alt='Imagen de presentación de la aplicación' src={Landing} className="rounded-2xl"/>
                </div>

            </div>
        </section>
    )
}

export default HeroSection