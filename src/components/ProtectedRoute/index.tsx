import { Outlet } from "react-router";

const ProtectedRoute = () => {
  return (
    <div>
      This route is protected! <Outlet />
    </div>
  );
};

export default ProtectedRoute;
