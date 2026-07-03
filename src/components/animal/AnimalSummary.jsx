import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function AnimalSummary({ animal }) {

  return (

    <Grid container spacing={2} sx={{ mb:3 }}>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p:2 }}>

          <Typography variant="body2" color="text.secondary">
            ⚖️ Último Pesaje
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {animal?.peso || "-"} kg
          </Typography>

          <Typography variant="caption">
            Próximamente mostrará la fecha del último pesaje.
          </Typography>

        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p:2 }}>

          <Typography variant="body2" color="text.secondary">
            📍 Lote Actual
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {animal?.lote || "-"}
          </Typography>

        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p:2 }}>

          <Typography variant="body2" color="text.secondary">
            🐄 Categoría
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            {animal?.categoria || "-"}
          </Typography>

        </Paper>
      </Grid>

      <Grid item xs={12} md={3}>
        <Paper sx={{ p:2 }}>

          <Typography variant="body2" color="text.secondary">
            💉 Estado Sanitario
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            🟢 Al día
          </Typography>

          <Typography variant="caption">
            Próximamente se calculará automáticamente.
          </Typography>

        </Paper>
      </Grid>

    </Grid>

  );

}

export default AnimalSummary;