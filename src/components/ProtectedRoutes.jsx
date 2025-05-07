import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const ProtectedRoutes = ({ children, userRole }) => {
  const { role, loading } = useContext(AuthContext);
  console.log("Role from protected route", role);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
