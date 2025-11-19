import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminRout({ children }) {
  const { user } = useSelector((state) => state.authState);
  if (user.role === "admin") {
    return children;
  } else {
    toast.warning("This page is not allowed user...", {
      position: "bottom-center",
    });
    return <Navigate to={"/"} />;
  }
}
