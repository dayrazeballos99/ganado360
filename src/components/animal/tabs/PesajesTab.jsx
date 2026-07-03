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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PesajeDialog from "../PesajeDialog";

import {
  obtenerPesajes,
  agregarPesaje,
} from "../../../services/pesajeService";

function PesajesTab({ animal }) {

  const [pesajes, setPesajes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  async function cargarPesajes() {

    if (!animal) return;

    const datos = await obtenerPesajes(animal.id);

    setPesajes(datos);

  }

  useEffect(() => {

    cargarPesajes();

  }, [animal]);

  async function guardarPesaje(pesaje) {

    await agregarPesaje(animal.id, pesaje);

    setOpenDialog(false);

    cargarPesajes();

  }

  function calcularDiferencia(index) {

    if (index === 0) return "-";

    const actual = Number(pesajes[index].peso);

    const anterior = Number(pesajes[index - 1].peso);

    return `+${actual - anterior} kg`;

  }

  function calcularGDP(index) {

    if (index === 0) return "-";

    const actual = pesajes[index];

    const anterior = pesajes[index - 1];

    const dias =
      (new Date(actual.fecha) - new Date(anterior.fecha)) /
      (1000 * 60 * 60 * 24);

    if (dias <= 0) return "-";

    const kilos =
      Number(actual.peso) - Number(anterior.peso);

    return `${(kilos / dias).toFixed(2)} kg/día`;

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
          ⚖️ Historial de Pesajes
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          + Nuevo Pesaje
        </Button>

      </Box>

      <Paper>

        <Table>

          <TableHead>

  <TableRow>

    <TableCell>Fecha</TableCell>

    <TableCell>Tipo</TableCell>

    <TableCell align="right">
  Peso (kg)
</TableCell>

<TableCell align="right">
  + / - kg
</TableCell>

<TableCell align="right">
  Ganancia diaria
  <br />
  (kg/día)
</TableCell>

<TableCell align="center">
  Acciones
</TableCell>

  </TableRow>

</TableHead>

          <TableBody>

            {pesajes.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No hay pesajes registrados.
                </TableCell>

              </TableRow>

            ) : (

              pesajes.map((pesaje, index) => (

                <TableRow key={pesaje.id}>

                  <TableCell>
                    {pesaje.fecha}
                  </TableCell>

                  <TableCell>
                    {pesaje.tipo}
                  </TableCell>

                  <TableCell>
                    {pesaje.peso} kg
                  </TableCell>

                  <TableCell>
                    {calcularDiferencia(index)}
                  </TableCell>

                  <TableCell>
                    {calcularGDP(index)}
                  </TableCell>

                  <TableCell align="center">

  <Tooltip title="Editar">

    <IconButton
      color="primary"
    >

      <EditIcon />

    </IconButton>

  </Tooltip>

  <Tooltip title="Eliminar">

    <IconButton
      color="error"
    >

      <DeleteIcon />

    </IconButton>

  </Tooltip>

</TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </Paper>

      <PesajeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onGuardar={guardarPesaje}
      />

    </Box>

  );

}

export default PesajesTab;