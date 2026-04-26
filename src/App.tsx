import { ROUTES } from "@constants/routes";
import ProtectedRoute from "@layouts/ProtectedRoute";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import Overview from "@pages/Overview";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Overview />} />
        </Route>

        {/* Generic */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
