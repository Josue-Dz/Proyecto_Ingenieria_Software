import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, verifySessionRequest, registerRequest } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const data = await verifySessionRequest();
            console.log("Sesion activa de:", data); //por si olvido removerlos luego
            setUser(data);
        } catch (err){
            console.log("Sin sesión activa:", err.response?.status); //por si olvido removerlos luego
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const data = await loginRequest(credentials);
            setUser(data.user)
        } catch (err) {
            setError(err.response?.data?.message || "Error al iniciar sesión");
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const data = await registerRequest(userData);
            setUser(data.user);
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrarse");
            throw err;
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context
}