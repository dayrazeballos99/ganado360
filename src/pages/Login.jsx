import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async () => {
    if (!email || !password) {
      alert("Complete todos los campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/inicio");
    } catch (error) {
      alert("Correo o contraseña incorrectos.");
      console.error(error);
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
          🐄 Ganado360
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
          onClick={iniciarSesion}
        >
          Iniciar sesión
        </Button>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/register")}
        >
          Crear cuenta
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;