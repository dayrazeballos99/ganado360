import { useState } from "react";
import Animals from "./Animals";

function Dashboard() {
  const [pantalla, setPantalla] = useState("inicio");

  if (pantalla === "animales") {
    return <Animals />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "#2E7D32" }}>🐄 Ganado360</h1>

      <h2>Bienvenido</h2>

      <hr />

      <button
        style={boton}
        onClick={() => setPantalla("animales")}
      >
        🐄 Animales
      </button>

      <button style={boton}>⚖️ Pesajes</button>

      <button style={boton}>💉 Sanidad</button>

      <button style={boton}>🌱 Lotes</button>

      <button style={boton}>📈 Reportes</button>

      <button style={boton}>⚙️ Configuración</button>
    </div>
  );
}

const boton = {
  width: "260px",
  padding: "15px",
  margin: "15px 0",
  fontSize: "18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#2E7D32",
  color: "white",
};

export default Dashboard;