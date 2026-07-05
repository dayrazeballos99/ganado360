import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Animals from "../pages/Animals";
import AnimalProfile from "../pages/AnimalProfile";
import Movements from "../pages/Movements";
import Eventos from "../pages/Eventos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
<Route
  path="/movimientos"
  element={<Movements />}
/>
<Route
  path="/eventos"
  element={<Eventos />}
/>
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