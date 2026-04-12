import { useEffect, useState } from "react";
import { loginRequest, logoutRequest, verifySessionRequest, registerRequest } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

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
            setUser(data);
        } catch (error){
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