import { useAuth } from "../../auth/hooks/useAuth";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Verificando sesión...</p>;

  return (
    <div> {/**Esto lo estoy utilizando para pruebas del AuthContext */}
      <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
        {JSON.stringify({ user, loading }, null, 2)}
      </pre>
    </div>
  );
}

export default DashboardPage