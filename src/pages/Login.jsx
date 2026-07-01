import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    if (!email || !password) {
      alert("Complete todos los campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Bienvenido a Ganado360");

      onLogin();
    } catch (error) {
      alert("Correo o contraseña incorrectos.");
      console.error(error);
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
        🐄 Ganado360
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
        onClick={iniciarSesion}
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
        Iniciar sesión
      </button>

      <button
        onClick={onRegister}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "10px",
          background: "#1976D2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Crear cuenta
      </button>
    </div>
  );
}

export default Login;