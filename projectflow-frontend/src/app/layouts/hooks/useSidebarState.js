import { useEffect, useRef, useState } from "react";

export function useSidebarState() {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const timeoutRef = useRef(null);
    const [isMobile, setIsMobile] = useState(mediaQuery.matches);
    const [collapsed, setCollapsed] = useState(
        localStorage.getItem("sidebar") === "true"
    );

    useEffect(() => {
        const handleChange = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        if (!isMobile) setCollapsed(false);
    }, [isMobile]);

    useEffect(() => {
        localStorage.setItem("sidebar", collapsed);
    }, [collapsed]);

    const open = () => {
        clearTimeout(timeoutRef.current);
        setCollapsed(true);
    };

    const close = () => {
        if (isMobile) {
            setCollapsed(false);
        } else {
            timeoutRef.current = setTimeout(() => setCollapsed(false), 300);
        }
    };

    return { collapsed, open, close, isMobile };
}