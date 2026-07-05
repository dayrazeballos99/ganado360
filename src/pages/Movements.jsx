import Layout from "../components/Layout";
import { Typography } from "@mui/material";

function Movements() {

  return (

    <Layout>

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        🚚 Movimientos
      </Typography>

      <Typography mt={2}>
        Próximamente podrás registrar ingresos,
        egresos, cambios de lote y ventas.
      </Typography>

    </Layout>

  );

}

export default Movements;