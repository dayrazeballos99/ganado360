import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [pantalla, setPantalla] = useState("login");

  if (pantalla === "register") {
    return <Register onBack={() => setPantalla("login")} />;
  }

  if (pantalla === "dashboard") {
    return <Dashboard />;
  }

  return (
    <Login
      onRegister={() => setPantalla("register")}
      onLogin={() => setPantalla("dashboard")}
    />
  );
}

export default App;