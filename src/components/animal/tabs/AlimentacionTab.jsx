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
  IconButton,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AlimentacionAnimalDialog from "../AlimentacionAnimalDialog";

import {
  obtenerAlimentacionesAnimal,
  agregarAlimentacionAnimal,
  editarAlimentacionAnimal,
  eliminarAlimentacionAnimal,
} from "../../../services/alimentacionService";

function AlimentacionTab({ animal }) {
  const [alimentaciones, setAlimentaciones] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [
    alimentacionEditando,
    setAlimentacionEditando,
  ] = useState(null);

  const [
    alimentacionSeleccionada,
    setAlimentacionSeleccionada,
  ] = useState(null);

  async function cargarAlimentaciones() {
    if (!animal) return;

    const datos =
      await obtenerAlimentacionesAnimal(
        animal.id
      );

    setAlimentaciones(datos);
  }

  useEffect(() => {
    cargarAlimentaciones();
  }, [animal]);

  async function guardarAlimentacion(alimentacion) {
    if (alimentacionEditando) {
      await editarAlimentacionAnimal(
        animal.id,
        alimentacionEditando.id,
        alimentacion
      );
    } else {
      await agregarAlimentacionAnimal(
        animal.id,
        alimentacion
      );
    }

    setAlimentacionEditando(null);
    setOpenDialog(false);

    cargarAlimentaciones();
  }

  function editar(alimentacion) {
    setAlimentacionEditando(alimentacion);

    setOpenDialog(true);
  }

  async function eliminar(alimentacion) {
    if (
      !window.confirm(
        "¿Eliminar este registro de alimentación?"
      )
    ) {
      return;
    }

    await eliminarAlimentacionAnimal(
      animal.id,
      alimentacion.id
    );

    if (
      alimentacionSeleccionada?.id ===
      alimentacion.id
    ) {
      setAlimentacionSeleccionada(null);
    }

    cargarAlimentaciones();
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
          🌾 Historial de Alimentación
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setAlimentacionEditando(null);

            setOpenDialog(true);
          }}
        >
          Registrar alimentación
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>

              <TableCell>Tipo</TableCell>

              <TableCell>Alimento</TableCell>

              <TableCell>Cantidad</TableCell>

              <TableCell>Responsable</TableCell>

              <TableCell align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {alimentaciones.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No hay registros de alimentación.
                </TableCell>
              </TableRow>
            ) : (
              alimentaciones.map(
                (alimentacion) => (
                  <TableRow
                    key={alimentacion.id}
                    hover
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setAlimentacionSeleccionada(
                        alimentacion
                      )
                    }
                  >
                    <TableCell>
                      {alimentacion.fecha}
                    </TableCell>

                    <TableCell>
                      {alimentacion.tipo}
                    </TableCell>

                    <TableCell>
                      {alimentacion.alimento}
                    </TableCell>

                    <TableCell>
                      {alimentacion.cantidad}{" "}
                      {alimentacion.unidad}
                    </TableCell>

                    <TableCell>
                      {alimentacion.responsable || "-"}
                    </TableCell>

                    <TableCell
                      align="center"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <IconButton
                        color="primary"
                        onClick={() =>
                          editar(alimentacion)
                        }
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() =>
                          eliminar(alimentacion)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </Paper>

      {alimentacionSeleccionada && (
        <Paper
          sx={{
            mt: 3,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
          >
            📋 Detalle de alimentación
          </Typography>

          <Grid
            container
            spacing={2}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Fecha:</b>{" "}
                {alimentacionSeleccionada.fecha || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Tipo:</b>{" "}
                {alimentacionSeleccionada.tipo || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Alimento:</b>{" "}
                {alimentacionSeleccionada.alimento || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                <b>Cantidad:</b>{" "}
                {alimentacionSeleccionada.cantidad || 0}{" "}
                {alimentacionSeleccionada.unidad || ""}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                <b>Responsable:</b>{" "}
                {alimentacionSeleccionada.responsable || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                <b>Observaciones:</b>
              </Typography>

              <Typography color="text.secondary">
                {alimentacionSeleccionada.observaciones ||
                  "Sin observaciones."}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      <AlimentacionAnimalDialog
        open={openDialog}
        alimentacionInicial={
          alimentacionEditando
        }
        onClose={() => {
          setOpenDialog(false);
          setAlimentacionEditando(null);
        }}
        onGuardar={guardarAlimentacion}
      />
    </Box>
  );
}

export default AlimentacionTab;