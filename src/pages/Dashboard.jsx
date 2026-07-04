import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";

import { obtenerResumenDashboard } from "../services/dashboardService";

import { Grid, Typography, Paper, Box } from "@mui/material";

function Dashboard() {
  const [resumen, setResumen] = useState({
  total: 0,
  activos: 0,
  vendidos: 0,
  muertos: 0,
  alertas: 0,
  pesoPromedio: 0,
});

useEffect(() => {

  async function cargarResumen() {

    const datos = await obtenerResumenDashboard();

    setResumen(datos);

  }

  cargarResumen();

}, []);
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
  valor={resumen.total}
  subtitulo={`${resumen.activos} activos • ${resumen.vendidos} vendidos`}
  icono="🐄"
  color="#C8E6C9"
/>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard
  titulo="Peso promedio"
  valor={`${resumen.pesoPromedio} kg`}
  subtitulo="Promedio del rodeo"
  icono="⚖️"
  color="#BBDEFB"
/>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            titulo="Alertas"
            valor={resumen.alertas}
            subtitulo="Animales sin peso"
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