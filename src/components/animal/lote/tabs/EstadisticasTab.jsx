import {
  Box,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EstadisticasTab({
  animales = [],
}) {

  const animalesConPeso = animales.filter(
    (animal) =>
      animal.peso !== undefined &&
      animal.peso !== null &&
      animal.peso !== ""
  );

  const animalesSinPeso =
    animales.length - animalesConPeso.length;

  const pesos = animalesConPeso.map(
    (animal) => Number(animal.peso)
  );

  const pesoMinimo =
    pesos.length > 0
      ? Math.min(...pesos)
      : 0;

  const pesoMaximo =
    pesos.length > 0
      ? Math.max(...pesos)
      : 0;

  const pesoPromedio =
    pesos.length > 0
      ? (
          pesos.reduce(
            (total, peso) => total + peso,
            0
          ) / pesos.length
        ).toFixed(1)
      : 0;

  const pesoTotal =
    pesos.reduce(
      (total, peso) => total + peso,
      0
    );

  const menosDe400 = pesos.filter(
    (peso) => peso < 400
  ).length;

  const entre400y500 = pesos.filter(
    (peso) =>
      peso >= 400 &&
      peso < 500
  ).length;

  const entre500y600 = pesos.filter(
    (peso) =>
      peso >= 500 &&
      peso < 600
  ).length;

  const masDe600 = pesos.filter(
    (peso) => peso >= 600
  ).length;

  const calcularPorcentaje = (cantidad) => {

    if (pesos.length === 0) {
      return 0;
    }

    return (
      (cantidad / pesos.length) * 100
    ).toFixed(1);

  };

  const datosDistribucion = [
    {
      rango: "< 400 kg",
      cantidad: menosDe400,
      porcentaje: calcularPorcentaje(menosDe400),
    },
    {
      rango: "400 - 499 kg",
      cantidad: entre400y500,
      porcentaje: calcularPorcentaje(entre400y500),
    },
    {
      rango: "500 - 599 kg",
      cantidad: entre500y600,
      porcentaje: calcularPorcentaje(entre500y600),
    },
    {
      rango: "600+ kg",
      cantidad: masDe600,
      porcentaje: calcularPorcentaje(masDe600),
    },
  ];

  return (

    <Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        📈 Estadísticas del lote
      </Typography>

      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              ⚖️ Peso mínimo
            </Typography>

            <Typography variant="h4">
              {pesoMinimo} kg
            </Typography>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              📊 Peso promedio
            </Typography>

            <Typography variant="h4">
              {pesoPromedio} kg
            </Typography>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              🏋️ Peso máximo
            </Typography>

            <Typography variant="h4">
              {pesoMaximo} kg
            </Typography>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              🐄 Peso total
            </Typography>

            <Typography variant="h4">
              {pesoTotal.toLocaleString("es-AR")} kg
            </Typography>

          </Paper>
        </Grid>

      </Grid>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          🐄 Resumen de animales
        </Typography>

        <Typography>
          Animales totales: {animales.length}
        </Typography>

        <Typography>
          Animales con peso: {animalesConPeso.length}
        </Typography>

        <Typography>
          Animales sin peso: {animalesSinPeso}
        </Typography>

      </Paper>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          📊 Distribución de pesos
        </Typography>

        {datosDistribucion.map((dato) => (

          <Typography key={dato.rango}>

            {dato.rango}: {dato.cantidad} animales (
            {dato.porcentaje}%)

          </Typography>

        ))}

      </Paper>

      <Paper
        sx={{
          p: 3,
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          📊 Gráfico de distribución
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={datosDistribucion}
          >

            <XAxis
              dataKey="rango"
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value, name, props) => {

                if (name === "cantidad") {
                  return [
                    `${value} animales (${props.payload.porcentaje}%)`,
                    "Cantidad",
                  ];
                }

                return value;

              }}
            />

            <Bar
              dataKey="cantidad"
            />

          </BarChart>

        </ResponsiveContainer>

      </Paper>

    </Box>

  );

}