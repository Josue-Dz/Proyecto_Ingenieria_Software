import { Navigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute