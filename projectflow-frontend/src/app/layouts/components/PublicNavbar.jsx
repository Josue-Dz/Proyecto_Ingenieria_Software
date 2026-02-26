import { Link } from 'react-router-dom'
import Logo from '../../../assets/Logo.png'
import { useState } from 'react'

const navbarlinks = [
    {
        id: 1,
        name: "Inicio",
        link: "/"
    },
    {
        id: 2,
        name: "Características",
        link: "/caracteristicas"
    },
    {
        id: 3,
        name: "Sobre Nosotros",
        link: "/sobre-nosotros"
    }
]

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className='fixed top-0 left-0 w-full z-30 bg-black/70 backdrop-blur-sm'>
            <div className='flex justify-between items-center px-4 md:px-12 py-3'>

                <div>
                    <img src={Logo} alt='Logo de la aplicación'
                        className='w-16' />
                </div>

                <button onClick={toggleMenu} className='md:hidden text-white'>
                    <svg className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        {isOpen ? (<path strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                        ) : (<path strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6H16M4 12H16M4 18H16'
                        />
                        )}

                    </svg>
                </button>

                <div className='hidden md:block'>
                    <ul className='flex sm:space-x-6 space-x-4'>
                        {navbarlinks.map((link) => (
                            <li key={link.id}>
                                <Link className='text-white sm:text-lg text-sm hover:text-[#c81e3a] transition-transform hover:scale-105 transform inline-block duration-300' to={link.link}>{link.name}</Link>
                            </li>
                        )
                        )}
                    </ul>
                </div>

                <div className='hidden md:block'>
                    <ul className='flex space-x-4'>
                        <Link to='/login'
                            className='bg-[#3C1722] hover:bg-[#591828] text-white text-center px-4 py-2 rounded-full w-full sm:w-auto transition duration-300 font-semibold'>
                            Iniciar Sesión
                        </Link>
                        <Link to='/signup'
                            className='ml-2 bg-[#c81e3a] hover:bg-[#a51d35] text-white text-center px-4 py-2 font-semibold rounded-full w-full sm:w-auto transition duration-300'>
                            Registrarse
                        </Link>
                    </ul>
                </div>

            </div>

            {/**Aquí dejé el menú para telefonos */}
            <div className={`bg-black/95 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} md:hidden absolute w-full  transition-all duration-300 p-1.5`}>
                <ul className='flex flex-col px-4 py-2'>
                    {navbarlinks.map((link) => (
                        <li key={link.id} className='py-2 text-center'>
                            <a
                                className='text-white hover:text-sky-200'
                                href={link.link} onClick={() => setIsOpen(false)}>
                                {link.name}
                            </a>
                        </li>
                    )
                    )}
                </ul>

                {/**Recordar: Estos son los botones de login y registro en el menú movil*/}
                <ul className='flex flex-col space-y-1'>
                    <Link to='/login' onClick={() => setIsOpen(false)}
                        className='bg-[#3C1722] text-white text-center px-4 py-2 w-full rounded-full'>
                        Iniciar Sesión
                    </Link>
                    <Link to='/signup' onClick={() => setIsOpen(false)}
                        className='bg-[#c81e3a] text-white text-center px-4 py-2 w-full rounded-full'>
                        Registrarse
                    </Link>
                </ul>
            </div>

        </nav>
    )
}

export default Navbar