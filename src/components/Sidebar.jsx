import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PetsIcon from "@mui/icons-material/Pets";
import ScaleIcon from "@mui/icons-material/Scale";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

const menu = [
  {
    texto: "Inicio",
    icono: <DashboardIcon />,
    ruta: "/inicio",
  },
  {
    texto: "Animales",
    icono: <PetsIcon />,
    ruta: "/animales",
  },
  {
    texto: "Pesajes",
    icono: <ScaleIcon />,
    ruta: "/pesajes",
  },
  {
    texto: "Sanidad",
    icono: <VaccinesIcon />,
    ruta: "/sanidad",
  },
  {
    texto: "Lotes",
    icono: <AgricultureIcon />,
    ruta: "/lotes",
  },
  {
    texto: "Reportes",
    icono: <AssessmentIcon />,
    ruta: "/reportes",
  },
  {
    texto: "Configuración",
    icono: <SettingsIcon />,
    ruta: "/configuracion",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#2E7D32",
          color: "white",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          🐄 Ganado360
        </Typography>
      </Toolbar>

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.texto}
            selected={location.pathname === item.ruta}
            onClick={() => navigate(item.ruta)}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 2,
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.18)",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.10)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icono}
            </ListItemIcon>

            <ListItemText primary={item.texto} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;