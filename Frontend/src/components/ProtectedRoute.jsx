import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useSelector((state) => state.auth);

  // Show loading state while verifying
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Verifying access...</div>
      </div>
    );
  }

  // Redirect to admin login if not authenticated
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
