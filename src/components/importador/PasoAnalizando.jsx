import { useEffect } from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function PasoAnalizando({
  archivo,
  finalizar,
}) {

  useEffect(() => {

    async function analizar() {

      // Simulación del análisis
      await new Promise((r) =>
        setTimeout(r, 1200)
      );

      finalizar();

    }

    analizar();

  }, []);

  return (

    <Box
      textAlign="center"
      mt={10}
    >

      <CircularProgress
        size={70}
      />

      <Typography
        variant="h5"
        mt={4}
      >
        Analizando archivo...
      </Typography>

      <Typography
        color="text.secondary"
        mt={2}
      >
        Detectando formato automáticamente
      </Typography>

      <Typography
        color="text.secondary"
      >
        {archivo?.name}
      </Typography>

    </Box>

  );

}