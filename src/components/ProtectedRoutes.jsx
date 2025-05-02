import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
const ProtectedRoutes = ({ children, userRole }) => {
  const { role } = useAuth();
  // console.log("User, Role", user, role);
  if (!role) {
    return <Navigate to="/" />;
  }
  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
