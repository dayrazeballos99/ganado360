import { Typography, Paper, Stack } from "@mui/material";

import ImportadorPesajes from "../components/ImportadorPesajes";
import ImportadorAnimales from "../components/ImportadorAnimales";
import ImportadorSanidad from "../components/ImportadorSanidad";

function Importaciones() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        📥 Centro de Importaciones
      </Typography>

      <Typography sx={{ mb: 3 }}>
        Desde aquí podrás importar información masiva al sistema.
      </Typography>

      <Stack spacing={2}>

        {/* =========================
            IMPORTAR ANIMALES
        ========================= */}

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            🐄 Importar Animales
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Crear animales desde un archivo Excel.
          </Typography>

          <ImportadorAnimales />
        </Paper>


        {/* =========================
            IMPORTAR PESAJES
            NO TOCAMOS NADA
        ========================= */}

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            ⚖️ Importar Pesajes
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Agregar nuevos pesajes a animales existentes.
          </Typography>

          <ImportadorPesajes />
        </Paper>


        {/* =========================
            IMPORTAR SANIDAD
        ========================= */}

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            💉 Importar Sanidad
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Importar vacunaciones y tratamientos.
          </Typography>

          <ImportadorSanidad />
        </Paper>

      </Stack>
    </>
  );
}

export default Importaciones;