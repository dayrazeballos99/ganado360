import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function PesoPorLoteChart({ datos = [] }) {
  const datosValidos = datos.filter(
    (item) => Number(item.pesoPromedio) > 0
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#ffffff",
      }}
    >

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h6"
          fontWeight={600}
        >
          Peso promedio por lote
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Comparación del peso promedio actual entre los lotes.
        </Typography>

      </Box>

      {datosValidos.length === 0 ? (

        <Box
          sx={{
            height: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >

          <Typography
            sx={{
              fontSize: 42,
              mb: 1,
            }}
          >
            🌱
          </Typography>

          <Typography fontWeight={600}>
            Sin datos de peso por lote
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              maxWidth: 320,
            }}
          >
            No hay animales con peso registrado dentro de los lotes.
          </Typography>

        </Box>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={datosValidos}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="nombre"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              unit=" kg"
            />

            <Tooltip
              formatter={(value) => [
                `${value} kg`,
                "Peso promedio",
              ]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e0e0e0",
                boxShadow:
                  "0 4px 14px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="pesoPromedio"
              fill="#5C6BC0"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      )}

    </Paper>
  );
}