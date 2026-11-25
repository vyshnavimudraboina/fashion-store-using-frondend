
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole") || "user";

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && userRole !== "admin") {
    alert("Access Denied: Only Admins have permission to add, edit, or manage products.");
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default ProtectedRoute;


