import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Paper, Typography } from "@mui/material";

export default function AnimalesPorLoteChart({ datos = [] }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>

      <Typography
        variant="h6"
        gutterBottom
      >
        📊 Animales por lote
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={datos}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="nombre" />

          <YAxis />

          <Tooltip />

          <Bar
  dataKey="cantidad"
  fill="#4CAF50"
  radius={[8, 8, 0, 0]}
/>

        </BarChart>

      </ResponsiveContainer>

    </Paper>
  );
}