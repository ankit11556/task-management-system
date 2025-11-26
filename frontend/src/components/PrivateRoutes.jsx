import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { loading, isAutheticated } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAutheticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
