import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";

import { obtenerResumenDashboard } from "../services/dashboardService";

import { Grid, Typography, Paper, Box, TextField,
MenuItem, } from "@mui/material";
import AnimalesPorLoteChart from "../components/dashboard/AnimalesPorLoteChart";
import { obtenerLotes } from "../services/loteService";


function Dashboard() {
  const [resumen, setResumen] = useState({
  total: 0,
  activos: 0,
  vendidos: 0,
  muertos: 0,
  alertas: 0,
  pesoPromedio: 0,
  pesoTotal: 0,
  cantidadLotes: 0,
  animalesPorLote: [],
});
const [lotes, setLotes] = useState([]);
const [loteSeleccionado, setLoteSeleccionado] = useState("");

useEffect(() => {

  async function cargarResumen() {

  const datos = await obtenerResumenDashboard();
  setResumen(datos);

  const listaLotes = await obtenerLotes();
  setLotes(listaLotes);

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
<Box sx={{ mb: 3, maxWidth: 300 }}>
  <TextField
    select
    fullWidth
    label="Filtrar por lote"
    value={loteSeleccionado}
    onChange={(e) => setLoteSeleccionado(e.target.value)}
  >
    <MenuItem value="">Todos</MenuItem>

    {lotes.map((lote) => (
      <MenuItem key={lote.id} value={lote.id}>
        {lote.nombre}
      </MenuItem>
    ))}
  </TextField>
</Box>
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
    titulo="Peso Total"
    valor={`${resumen.pesoTotal} kg`}
    subtitulo="Peso del establecimiento"
    icono="🏋️"
    color="#D1C4E9"
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
  valor={resumen.cantidadLotes}
  subtitulo="Lotes con animales"
  icono="🌱"
  color="#DCEDC8"
/>
        </Grid>
      </Grid>

      <Box mt={5}>
        <AnimalesPorLoteChart
  datos={resumen.animalesPorLote}
/>
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