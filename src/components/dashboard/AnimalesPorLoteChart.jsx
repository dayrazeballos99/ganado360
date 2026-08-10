import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function AnimalesPorLoteChart({ datos = [] }) {
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

      {/* ENCABEZADO */}

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h6"
          fontWeight={600}
        >
          Animales por lote
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Cantidad de animales registrados en cada lote
        </Typography>

      </Box>


      {/* GRÁFICO */}

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart
          data={datos}
          margin={{
            top: 25,
            right: 20,
            left: 0,
            bottom: 10,
          }}
          barCategoryGap="30%"
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
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            formatter={(value) => [
              `${value} animales`,
              "Cantidad",
            ]}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            }}
          />

          <Bar
            dataKey="cantidad"
            fill="#43A047"
            radius={[8, 8, 0, 0]}
            maxBarSize={90}
          >

            <LabelList
              dataKey="cantidad"
              position="top"
              fontSize={14}
              fontWeight={600}
            />

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </Paper>
  );
}