import {
  ResponsiveContainer,
  LineChart,
  Line,
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

export default function PesoPromedioChart({ datos = [] }) {
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
          Evolución del peso promedio
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Evolución del peso registrado a través del tiempo
        </Typography>

      </Box>

      {datos.length === 0 ? (

        <Box
          sx={{
            height: 320,
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
            ⚖️
          </Typography>

          <Typography fontWeight={600}>
            Sin historial de pesajes
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              maxWidth: 320,
            }}
          >
            Todavía no hay suficientes pesajes registrados para mostrar la evolución.
          </Typography>

        </Box>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <LineChart
            data={datos}
            margin={{
              top: 20,
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
              dataKey="fecha"
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

            <Line
              type="monotone"
              dataKey="pesoPromedio"
              stroke="#5C6BC0"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      )}

    </Paper>
  );
}