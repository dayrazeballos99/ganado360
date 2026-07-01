import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Register({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {
    if (!email || !password) {
      alert("Complete todos los campos.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Usuario registrado correctamente.");

      onBack();
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar el usuario.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2E7D32" }}>
        🐄 Crear cuenta
      </h1>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
      />

      <button
        onClick={registrar}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2E7D32",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Registrarse
      </button>

      <button
        onClick={onBack}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          background: "#666",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Volver
      </button>
    </div>
  );
}

export default Register;