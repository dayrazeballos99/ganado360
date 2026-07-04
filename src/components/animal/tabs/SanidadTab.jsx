import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import SanidadDialog from "../SanidadDialog";

import {
  obtenerTratamientos,
  agregarTratamiento,
} from "../../../services/sanidadService";

function SanidadTab({ animal }) {

  const [tratamientos, setTratamientos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  async function cargarTratamientos() {

    if (!animal) return;

    const datos = await obtenerTratamientos(animal.id);

    setTratamientos(datos);

  }

  useEffect(() => {

    cargarTratamientos();

  }, [animal]);

  async function guardarTratamiento(tratamiento) {

    await agregarTratamiento(animal.id, tratamiento);

    setOpenDialog(false);

    cargarTratamientos();

  }

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
          onClick={() => setOpenDialog(true)}
        >
          Registrar tratamiento
        </Button>

      </Box>

      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Fecha</TableCell>

              <TableCell>Tipo</TableCell>

              <TableCell>Producto</TableCell>

              <TableCell>Dosis</TableCell>

              <TableCell>Vía</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {tratamientos.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No hay tratamientos registrados.
                </TableCell>

              </TableRow>

            ) : (

              tratamientos.map((tratamiento) => (

                <TableRow key={tratamiento.id}>

                  <TableCell>{tratamiento.fecha}</TableCell>

                  <TableCell>{tratamiento.tipo}</TableCell>

                  <TableCell>{tratamiento.producto}</TableCell>

                  <TableCell>
                    {tratamiento.dosis} {tratamiento.unidad}
                  </TableCell>

                  <TableCell>{tratamiento.via}</TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </Paper>

      <SanidadDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onGuardar={guardarTratamiento}
      />

    </Box>

  );

}

export default SanidadTab;