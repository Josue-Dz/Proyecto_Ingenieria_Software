import { useAuth } from "../../auth/context/AuthContext";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Verificando sesión...</p>;

  return (
    <div>
      {/* muestra el estado actual del contexto */}
      <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
        {JSON.stringify({ user, loading }, null, 2)}
      </pre>
      {/* resto de tu app */}
    </div>
  );
}

export default DashboardPage