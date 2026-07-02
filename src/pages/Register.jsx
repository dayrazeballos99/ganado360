import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Register() {
  const navigate = useNavigate();

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

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar el usuario.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7f5",
      }}
    >
      <Paper sx={{ p: 5, width: 400 }}>
        <Typography variant="h4" align="center" mb={3}>
          🐄 Crear cuenta
        </Typography>

        <TextField
          fullWidth
          label="Correo electrónico"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Contraseña"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={registrar}
        >
          Registrarse
        </Button>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Volver al Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;