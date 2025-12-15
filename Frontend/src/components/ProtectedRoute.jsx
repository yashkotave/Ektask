import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("adminLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
