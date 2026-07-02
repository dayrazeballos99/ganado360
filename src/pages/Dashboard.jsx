import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

import { Grid, Typography, Paper, Box } from "@mui/material";

function Dashboard() {
  return (
    <Layout>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        👋 Bienvenida, Dayra
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Resumen general de tu establecimiento.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            titulo="Animales"
            valor="0"
            icono="🐄"
            color="#C8E6C9"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            titulo="Peso promedio"
            valor="0 kg"
            icono="⚖️"
            color="#BBDEFB"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            titulo="Alertas"
            valor="0"
            icono="💉"
            color="#FFE082"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            titulo="Lotes"
            valor="0"
            icono="🌱"
            color="#DCEDC8"
          />
        </Grid>
      </Grid>

      <Box mt={5}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            📅 Próximas tareas
          </Typography>

          <Typography color="text.secondary">
            No hay tareas pendientes.
          </Typography>
        </Paper>
      </Box>

      <Box mt={3}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            📋 Actividad reciente
          </Typography>

          <Typography color="text.secondary">
            Todavía no hay movimientos registrados.
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
}

export default Dashboard;