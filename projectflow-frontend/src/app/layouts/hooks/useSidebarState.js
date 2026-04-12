import { useEffect, useState } from "react";

export function useSidebarState() {
    const [isMobile, setIsMobile] = useState(
        () => window.matchMedia("(max-width: 768px)").matches
    );
    
    const [isCollapsedStored, setIsCollapsedStored] = useState(
        () => localStorage.getItem("sidebar") === "true"
    );

    // 1. Escuchar el cambio de pantalla
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleChange = (e) => setIsMobile(e.matches);
        
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);


    const collapsed = isMobile ? isCollapsedStored : false;

    useEffect(() => {
        localStorage.setItem("sidebar", collapsed);
    }, [collapsed]);

    const open = () => setIsCollapsedStored(true);
    const close = () => setIsCollapsedStored(false);

    return { collapsed, open, close, isMobile };
}