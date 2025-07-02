import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

export default function PrivateAdminRoute({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
