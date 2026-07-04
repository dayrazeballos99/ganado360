import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { useState } from "react";

import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const titulos = {
  "/inicio": "🏠 Dashboard",
  "/animales": "🐄 Animales",
  "/pesajes": "⚖️ Pesajes",
  "/sanidad": "💉 Sanidad",
  "/alimentacion": "🌾 Alimentación",
  "/reproduccion": "🐄 Reproducción",
  "/movimientos": "🚚 Movimientos",
  "/comercial": "💰 Comercial",
  "/reportes": "📊 Reportes",
  "/configuracion": "⚙️ Configuración",
};
const [anchorEl, setAnchorEl] = useState(null);

const open = Boolean(anchorEl);

function abrirMenu(event) {
  setAnchorEl(event.currentTarget);
}

function cerrarMenu() {
  setAnchorEl(null);
}
async function cerrarSesion() {

  await signOut(auth);

  navigate("/login");

}
  return (
    <div
      style={{
        background: "white",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2 style={{ margin: 0 }}>
  {titulos[location.pathname] || "🐄 Ganado360"}
</h2>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>

  <IconButton>

    <NotificationsIcon />

  </IconButton>

  <IconButton onClick={abrirMenu}>

    <Avatar
      sx={{
        width: 36,
        height: 36,
        bgcolor: "#2E7D32",
      }}
    >
      D
    </Avatar>

  </IconButton>

  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={cerrarMenu}
  >

    <MenuItem onClick={cerrarMenu}>
      👤 Mi perfil
    </MenuItem>

    <MenuItem onClick={cerrarMenu}>
      ⚙️ Configuración
    </MenuItem>

    <MenuItem
      onClick={async () => {

        cerrarMenu();

        await cerrarSesion();

      }}
    >
      🚪 Cerrar sesión
    </MenuItem>

  </Menu>

</div>
    </div>
  );
}

export default Header;