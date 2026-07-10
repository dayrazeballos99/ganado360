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

import MovimientoDialog from "../../MovimientoDialog";

import {
  obtenerMovimientos,
  agregarMovimiento,
} from "../../../services/movimientoService";

export default function MovimientosTab({ animal }) {

  const [movimientos, setMovimientos] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  async function cargarMovimientos() {

    if (!animal) return;

    const datos = await obtenerMovimientos(animal.id);

    setMovimientos(datos);

  }

  useEffect(() => {

    cargarMovimientos();

  }, [animal]);

  async function guardarMovimiento(movimiento) {

    await agregarMovimiento(
      animal.id,
      movimiento
    );

    setOpenDialog(false);

    cargarMovimientos();

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
          🚚 Movimientos
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Registrar movimiento
        </Button>

      </Box>

      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Fecha</TableCell>

              <TableCell>Tipo</TableCell>

              <TableCell>Origen</TableCell>

              <TableCell>Destino</TableCell>

              <TableCell>Observaciones</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {movimientos.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No hay movimientos registrados.
                </TableCell>

              </TableRow>

            ) : (

              movimientos.map((movimiento) => (

                <TableRow key={movimiento.id}>

                  <TableCell>{movimiento.fecha}</TableCell>

                  <TableCell>{movimiento.tipo}</TableCell>

                  <TableCell>{movimiento.origen}</TableCell>

                  <TableCell>{movimiento.destino}</TableCell>

                  <TableCell>{movimiento.observaciones}</TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </Paper>

      <MovimientoDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onGuardar={guardarMovimiento}
      />

    </Box>

  );

}