import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Layout/Loader";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.authState);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <Loader />;
  }
  if (isAuthenticated) {
    return children;
  }
}
