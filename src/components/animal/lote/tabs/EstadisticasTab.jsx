import {
  Paper,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const colores = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#E91E63",
  "#9C27B0",
];

export default function EstadisticasTab({
  lote,
}) {

  return (

    <Paper sx={{ p:3 }}>

      <Typography
        variant="h6"
        gutterBottom
      >
        📊 Categorías del lote
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={lote.categoriasChart}
            dataKey="cantidad"
            nameKey="nombre"
            outerRadius={120}
            label
          >

            {lote.categoriasChart.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    colores[
                      index % colores.length
                    ]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </Paper>

  );

}