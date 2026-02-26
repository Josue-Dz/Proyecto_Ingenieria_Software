import AboutSection from './components/AboutSection'

const AboutPage = () => {
    return (
        <div className='min-h-screen pt-20'>

            <div className='text-center pb-7 px-6'>
                <span className='text-[#A3FF12] text-sm font-semibold uppercase tracking-widest'>
                    PumaTask
                </span>
                <h1 className='text-white text-4xl md:text-5xl font-extrabold mt-2'>
                    Sobre Nosotros
                </h1>
                <p className='text-white/60 text-sm mt-3 max-w-lg mx-auto'>
                    Conoce al equipo detrás del proyecto y la misión que nos impulsa
                    a construir mejores herramientas para los estudiantes de la UNAH.
                </p>
            </div>

            
            <AboutSection />
        </div>
    )
}

export default AboutPage