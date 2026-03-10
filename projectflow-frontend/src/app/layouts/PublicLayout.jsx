import Navbar from './components/PublicNavbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const PublicLayout = () => {
    return (
        <>
            <div className="min-h-screen w-full relative">
                <div className="absolute inset-0 z-0"
                    style={{ background: "var(--bg-gradient)" }}
                />

                <div className='relative z-10 flex flex-col min-h-screen overflow-x-hidden'>

                    <header>
                        <Navbar />
                    </header>

                    <main className='grow h-auto px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pt-22'>
                        <Outlet /> {/* Importante aquí se renderizarán las páginas hijas */}
                    </main>

                    <footer>
                        <Footer />
                    </footer>

                </div>
            </div>
        </>
    )
}

export default PublicLayout