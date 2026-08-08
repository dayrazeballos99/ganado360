import { useEffect, useState } from "react";

import {
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { obtenerPesajes } from "../../../services/pesajeService";

function AnimalEstadisticasTab({ animal }) {
  const [pesajes, setPesajes] = useState([]);

  useEffect(() => {
    async function cargarPesajes() {
      if (!animal?.id) return;

      const datos = await obtenerPesajes(animal.id);
      setPesajes(datos);
    }

    cargarPesajes();
  }, [animal]);

  const cantidadPesajes = pesajes.length;

  const primerPeso =
    cantidadPesajes > 0
      ? Number(pesajes[0].peso)
      : null;

  const ultimoPeso =
    cantidadPesajes > 0
      ? Number(pesajes[cantidadPesajes - 1].peso)
      : null;

  const diferenciaPeso =
    cantidadPesajes > 1
      ? ultimoPeso - primerPeso
      : null;

  const ganancia =
    diferenciaPeso !== null
      ? diferenciaPeso.toFixed(1)
      : "-";

  let gmd = "-";

  if (cantidadPesajes > 1) {
    const primerDia = new Date(pesajes[0].fecha);
    const ultimoDia = new Date(
      pesajes[cantidadPesajes - 1].fecha
    );

    const dias =
      (ultimoDia - primerDia) /
      (1000 * 60 * 60 * 24);

    if (dias > 0) {
      gmd = (
        diferenciaPeso / dias
      ).toFixed(2);
    }
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        📊 Estadísticas del Animal
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              Primer peso
            </Typography>

            <Typography variant="h5">
              {primerPeso ?? "-"} kg
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              Último peso
            </Typography>

            <Typography variant="h5">
              {ultimoPeso ?? "-"} kg
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              Ganancia
            </Typography>

            <Typography variant="h5">
              {ganancia} kg
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              GMD
            </Typography>

            <Typography variant="h5">
              {gmd} kg/día
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 2.4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              Pesajes
            </Typography>

            <Typography variant="h5">
              {cantidadPesajes}
            </Typography>
          </Paper>
        </Grid>

      </Grid>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Evolución del peso
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={pesajes}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="fecha" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="peso"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
}

export default AnimalEstadisticasTab;