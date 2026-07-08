import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import AnimalesTab from "../components/animal/lote/tabs/AnimalesTab";
import EstadisticasTab from "../components/animal/lote/tabs/EstadisticasTab";

import {
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";

import { obtenerResumenLote } from "../services/loteProfileService";

export default function LoteProfile() {

  const { id } = useParams();

  const [lote, setLote] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {

    async function cargar() {

      const datos = await obtenerResumenLote(id);

      setLote(datos);

    }

    cargar();

  }, [id]);

  if (!lote) {

    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );

  }

  return (

    <Layout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        📦 {lote.nombre}
      </Typography>

      <Paper sx={{ p:3, mb:3 }}>

        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <Typography>
              <b>Tipo:</b> {lote.tipo}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography>
              <b>Estado:</b> {lote.estado}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography>
              <b>Capacidad:</b> {lote.capacidad}
            </Typography>
          </Grid>

        </Grid>

      </Paper>

      <Paper>

        <Tabs
          value={tab}
          onChange={(e, nuevo) => setTab(nuevo)}
          variant="scrollable"
          scrollButtons="auto"
        >

          <Tab label="📋 Resumen" />
          <Tab label="🐄 Animales" />
          <Tab label="⚖️ Pesajes" />
          <Tab label="💉 Sanidad" />
          <Tab label="🚚 Movimientos" />
          <Tab label="📈 Estadísticas" />
          <Tab label="🌾 Alimentación" />

        </Tabs>

      </Paper>

      <Paper sx={{ p:4, mt:3 }}>

        {tab === 0 && (

          <Grid container spacing={3}>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p:2 }}>
                <Typography variant="body2">
                  🐄 Animales
                </Typography>

                <Typography variant="h4">
                  {lote.cantidadAnimales}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p:2 }}>
                <Typography variant="body2">
                  ⚖️ Peso promedio
                </Typography>

                <Typography variant="h4">
                  {lote.pesoPromedio} kg
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p:2 }}>
                <Typography variant="body2">
                  🏋️ Peso total
                </Typography>

                <Typography variant="h4">
                  {lote.pesoTotal} kg
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper sx={{ p:2 }}>
                <Typography variant="body2">
                  📈 GMD
                </Typography>

                <Typography variant="h4">
                  Próximamente
                </Typography>
              </Paper>
            </Grid>

          </Grid>

        )}

        {tab === 1 && (
          <AnimalesTab
            animales={lote.animales}
          />
        )}

        {tab === 2 && (
          <Typography>Próximamente.</Typography>
        )}

        {tab === 3 && (
          <Typography>Próximamente.</Typography>
        )}

        {tab === 4 && (
          <Typography>Próximamente.</Typography>
        )}

        {tab === 5 && (
  <EstadisticasTab
    lote={lote}
  />
)}

        {tab === 6 && (
          <Typography>Próximamente.</Typography>
        )}

      </Paper>

    </Layout>

  );

}