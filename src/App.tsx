import { ROUTES } from "@constants/routes";
import NavbarLayout from "@layouts/NavbarLayout";
import ProtectedRoute from "@layouts/ProtectedRoute";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import Overview from "@pages/Overview";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path={ROUTES.login} element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.base} element={<Overview />} />
          </Route>

          {/* Generic */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
