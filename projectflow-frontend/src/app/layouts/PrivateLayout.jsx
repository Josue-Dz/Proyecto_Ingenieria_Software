import Navbar from "../layouts/components/PrivateNavbar"
import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { useState } from "react";


const PrivateLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <div className='min-h-screen w-full relative'>
                <div
                    className='absolute inset-0 z-0'
                    style={{
                        background: 'radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)',
                    }}
                />

                <div className='relative z-10 flex flex-col min-h-screen overflow-x-hidden'>

                    <header>
                        <Navbar />
                    </header>

                    <div className="flex flex-1">

                        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

                        <main className={`flex-1 transition-all duration-300 px-4 max-w-7xl sm:px-6 md:px-12 pt-22 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
                            <Outlet />
                        </main>

                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateLayout