import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Animals from "../pages/Animals";
import AnimalProfile from "../pages/AnimalProfile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/inicio" element={<Dashboard />} />

        <Route path="/animales" element={<Animals />} />

        <Route
          path="/animal/:id"
          element={<AnimalProfile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;