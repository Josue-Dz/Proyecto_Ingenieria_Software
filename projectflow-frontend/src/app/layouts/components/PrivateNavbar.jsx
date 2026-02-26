import Logo from '../../../assets/Logo.png'

const PrivateNavbar = () => {
    return (
        <nav className="fixed top-0 w-full z-30 bg-black/70 backdrop-blur-sm">
            <div className='flex text-white justify-between'>
                <div>
                    <img src={Logo} className='w-16' alt='Logo de la aplicación'/>
                </div>
                <div className='flex w-96 items-center gap-10'>
                    <div className='flex gap-1'>
                        <p>Ronny Posadas</p>
                        <div className='w-14 h-14 rounded-full bg-[#A3FF12]/15 border border-[#A3FF12]/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#A3FF12]/25 transition-colors duration-300'>

                        </div>
                    </div>
                    
                    <div className='flex gap-1'>
                        <span className="material-symbols-rounded">logout</span>
                        <p>Cerrar Sesión</p>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default PrivateNavbar