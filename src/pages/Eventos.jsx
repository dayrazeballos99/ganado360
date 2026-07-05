import Layout from "../components/Layout";
import EventoWizard from "../components/importadorEventos/EventoWizard";

import {
  Typography,
  Paper,
} from "@mui/material";

function Eventos() {

  return (

    <Layout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        ⚡ Asistente de Eventos
      </Typography>

      <Paper sx={{ p: 3 }}>

        <EventoWizard />

      </Paper>

    </Layout>

  );

}

export default Eventos;