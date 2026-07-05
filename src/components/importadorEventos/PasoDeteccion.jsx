import {
  Box,
  Button,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

function PasoDeteccion({
  archivo,
  tipoEvento,
  setPaso,
}) {

  return (

    <Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        🔍 Análisis del archivo
      </Typography>

      <Paper sx={{ p:3, mt:2 }}>

        <Typography>
          <b>Archivo:</b>{" "}
          {archivo?.name}
        </Typography>

        <Typography sx={{ mt:2 }}>
          <b>Tipo detectado:</b>
        </Typography>

        <Chip
          label={tipoEvento || "Desconocido"}
          color="success"
          sx={{ mt:1 }}
        />

      </Paper>

      <Box
        display="flex"
        justifyContent="space-between"
        mt={3}
      >

        <Button
          onClick={() => setPaso(1)}
        >
          Volver
        </Button>

        <Button
          variant="contained"
          onClick={() => setPaso(3)}
        >
          Continuar
        </Button>

      </Box>

    </Box>

  );

}

export default PasoDeteccion;