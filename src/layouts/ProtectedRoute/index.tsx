import { ROUTES } from "@constants/routes";
import useAuth from "@hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  if (!user) return <Navigate to={ROUTES.login} state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
