import Navbar from "../layouts/components/PrivateNavbar"
import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { useState } from "react";


const PrivateLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <div className='min-h-screen w-full relative'>
                 <div className="absolute inset-0 z-0"
                    style={{ background: "var(--bg-gradient)" }}
                />

                <div className='relative z-10 flex flex-col min-h-screen overflow-x-hidden'>

                    <header>
                        <Navbar />
                    </header>

                    <div className="flex flex-1">

                        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

                        <main className={`flex-1 transition-all duration-300 px-4 sm:px-6 md:px-12 pt-22 overflow-x-auto ${sidebarOpen ? "ml-64" : "ml-18"}`}>
                            <Outlet />
                        </main>

                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateLayout