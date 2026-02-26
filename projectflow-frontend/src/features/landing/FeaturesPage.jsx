import CharacteristicsSection from './components/CharacteristicsSection'

const FeaturesPage = () => {
    return (
        <div className='min-h-screen pt-20'>
            
            <div className='text-center px-6'>
                <span className='text-[#A3FF12] text-sm font-semibold uppercase tracking-widest'>
                    PumaTask
                </span>
                <h1 className='text-white text-4xl md:text-5xl font-extrabold mt-2'>
                    Características
                </h1>
                <p className='text-white/60 text-sm mt-3 max-w-lg mx-auto'>
                    Descubre todas las herramientas que PumaTask pone a tu disposición
                    para gestionar tus proyectos académicos con metodologías ágiles.
                </p>
            </div>

            {/*Sección de features */}
            <CharacteristicsSection />
        </div>
    )
}

export default FeaturesPage