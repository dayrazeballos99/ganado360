import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function SexoChart({ datos = [] }) {
  const datosValidos = datos.filter(
    (item) => Number(item.cantidad) > 0
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
        height: "100%",
      }}
    >

      <Box sx={{ mb: 2 }}>

        <Typography
          variant="h6"
          fontWeight={600}
        >
          Composición por sexo
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Distribución de machos y hembras del rodeo
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
            🐄
          </Typography>

          <Typography
            fontWeight={600}
          >
            Sin datos de sexo
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              maxWidth: 280,
            }}
          >
            Todavía no se registró el sexo de los animales.
          </Typography>

        </Box>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={datosValidos}
              dataKey="cantidad"
              nameKey="nombre"
              cx="50%"
              cy="45%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={2}
              label={({ nombre, cantidad }) =>
                `${nombre}: ${cantidad}`
              }
            >

              {datosValidos.map((entrada, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0
                      ? "#5C6BC0"
                      : "#EC407A"
                  }
                />
              ))}

            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value} animales`,
                "Cantidad",
              ]}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e0e0e0",
                boxShadow:
                  "0 4px 14px rgba(0,0,0,0.08)",
              }}
            />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      )}

    </Paper>
  );
}