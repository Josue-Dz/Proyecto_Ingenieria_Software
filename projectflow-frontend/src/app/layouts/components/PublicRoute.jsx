import { Navigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user ? <Navigate to="/projects" /> : children;
};

export default PublicRoute