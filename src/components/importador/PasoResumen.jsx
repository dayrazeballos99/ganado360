import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

export default function PasoResumen({
  archivo,
  volver,
  siguiente,
}) {

  return (

    <Box maxWidth={700} mx="auto">

      <Paper sx={{ p:4 }}>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          📄 Resumen de Importación
        </Typography>

        <Divider sx={{ mb:3 }} />

        <Typography variant="h6">
          Archivo seleccionado
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {archivo?.name}
        </Typography>

        <Typography variant="h6">
          Tipo detectado
        </Typography>

        <Typography
          color="success.main"
          fontWeight="bold"
          mb={3}
        >
          (Próximamente se detectará automáticamente)
        </Typography>

        <Typography variant="h6">
          Cantidad de registros
        </Typography>

        <Typography color="text.secondary">
          Se calculará automáticamente.
        </Typography>

        <Typography
          variant="h6"
          mt={3}
        >
          Observaciones
        </Typography>

        <Typography color="text.secondary">
          El archivo será validado antes de importar.
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          mt={5}
        >

          <Button
            variant="outlined"
            onClick={volver}
          >
            ← Volver
          </Button>

          <Button
            variant="contained"
            onClick={siguiente}
          >
            Importar →
          </Button>

        </Stack>

      </Paper>

    </Box>

  );

}