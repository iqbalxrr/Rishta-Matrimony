import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Contex/AuthProvider";


const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }


  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
