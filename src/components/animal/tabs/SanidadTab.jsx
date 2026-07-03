import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

function SanidadTab({ animal }) {

  return (

    <Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          💉 Historial Sanitario
        </Typography>

        <Button
          variant="contained"
        >
          Registrar tratamiento
        </Button>

      </Box>

      <Paper sx={{ p:4 }}>

        <Typography>

          Este animal todavía no posee registros sanitarios.

        </Typography>

      </Paper>

    </Box>

  );

}

export default SanidadTab;