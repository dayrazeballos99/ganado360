import { Typography, Paper, Button, Stack } from "@mui/material";
import ImportadorPesajes from "../components/ImportadorPesajes";


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

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            🐄 Importar Animales
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Crear animales desde un archivo Excel.
          </Typography>

          <Button variant="contained">
            Próximamente
          </Button>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            ⚖️ Importar Pesajes
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Agregar nuevos pesajes a animales existentes.
          </Typography>

          <ImportadorPesajes />
          
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">
            💉 Importar Sanidad
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Importar vacunaciones y tratamientos.
          </Typography>

          <Button variant="contained">
            Próximamente
          </Button>
        </Paper>

      </Stack>
    </>
  );
}

export default Importaciones;