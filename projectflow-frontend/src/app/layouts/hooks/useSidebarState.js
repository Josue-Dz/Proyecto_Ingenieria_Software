import { useEffect, useState } from "react";

export function useSidebarState() {
  
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    );

    const [collapsed, setCollapsed] = useState(
        () => localStorage.getItem("sidebar") === "true"
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        
        const handleChange = (e) => {
            setIsMobile(e.matches);
            if (!e.matches) {
                setCollapsed(false);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebar", collapsed);
    }, [collapsed]);


    const open = () => setCollapsed(true);
    const close = () => setCollapsed(false);

    return { collapsed, open, close, isMobile };
}