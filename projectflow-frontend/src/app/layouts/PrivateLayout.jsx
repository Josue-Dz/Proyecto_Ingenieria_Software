import Navbar from "../layouts/components/PrivateNavbar"
import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { useSidebarState } from "./hooks/useSidebarState";

const PrivateLayout = () => {
    const { collapsed, open, close, isMobile } = useSidebarState();

    return (
        <>
            <div className='min-h-screen w-full relative'>
                <div className="absolute inset-0 z-0"
                    style={{ background: "var(--bg-gradient)" }}
                />

                <div className='relative z-10 flex flex-col min-h-screen overflow-x-hidden'>

                    <header>
                        <Navbar
                            isMobile={isMobile}
                            onLogoHover={(isHovering) => {
                                if (isMobile) {
                                    if (isHovering) open();
                                    return;
                                }
                                if (isHovering) {
                                    open();
                                } else {
                                    close();
                                }
                            }}
                        />

                        {/* Zona invisible para activar sidebar */}
                        {!isMobile && (
                            <div
                                onMouseEnter={open}
                                className="fixed top-16 left-0 h-full w-6 z-40"
                            />
                        )}

                    </header>

                    <Sidebar
                        collapsed={collapsed}
                        onMouseEnter={open}
                        onMouseLeave={close}
                        isMobile={isMobile}
                    />
                    <div className="flex flex-1">

                        <main className="flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-10 pt-20 overflow-x-auto">
                            <Outlet />
                        </main>

                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateLayout