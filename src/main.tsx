import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@stylesheets/index.scss";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MissingPage from "@pages/MissingPage/index.tsx";
import Login from "@pages/Login/index.tsx";
import ProtectedRoute from "@components/ProtectedRoute/index.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				{/* Protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<App />} />
				</Route>

				{/* Page not found */}
				<Route path="*" element={<MissingPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
