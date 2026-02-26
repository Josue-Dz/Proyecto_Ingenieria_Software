import Navbar from "../layouts/components/PrivateNavbar"
import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"


const PrivateLayout = () => {
    return (
        <>
            <div className="min-h-screen w-full relative">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
                    }}
                />

                <div className='relative z-10 flex flex-col min-h-screen overflow-x-hidden'>
                    <Sidebar />

                    <div className='flex flex-col flex-1'>
                        <header>
                            <Navbar />
                        </header>

                        <main className='grow h-auto px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pt-22'>
                            <Outlet />
                        </main>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PrivateLayout