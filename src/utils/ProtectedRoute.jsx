import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Layout/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.authState);
  useEffect(() => {
    if (isAuthenticated === false)
      toast.error("Pleace login first after access this page...", {
        position: "bottom-center",
      });
  }, [isAuthenticated]);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <Loader />;
  }
  if (isAuthenticated === true) {
    return children;
  }
}
