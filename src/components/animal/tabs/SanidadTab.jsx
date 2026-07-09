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

import SanidadDialog from "../SanidadDialog";

import {
  obtenerTratamientos,
  agregarTratamiento,
  editarTratamiento,
  eliminarTratamiento,
} from "../../../services/sanidadService";

function SanidadTab({ animal }) {

  const [tratamientos, setTratamientos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tratamientoEditando, setTratamientoEditando] = useState(null);
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState(null);

  async function cargarTratamientos() {

    if (!animal) return;

    const datos = await obtenerTratamientos(animal.id);

    setTratamientos(datos);

  }

  useEffect(() => {

    cargarTratamientos();

  }, [animal]);

  async function guardarTratamiento(tratamiento) {

    if (tratamientoEditando) {

      await editarTratamiento(
        animal.id,
        tratamientoEditando.id,
        tratamiento
      );

    } else {

      await agregarTratamiento(
        animal.id,
        tratamiento
      );

    }

    setTratamientoEditando(null);
    setOpenDialog(false);

    cargarTratamientos();

  }

  function editar(tratamiento) {

    setTratamientoEditando(tratamiento);

    setOpenDialog(true);

  }

  async function eliminar(tratamiento) {

    if (!window.confirm("¿Eliminar tratamiento?")) return;

    await eliminarTratamiento(
      animal.id,
      tratamiento.id
    );

    if (tratamientoSeleccionado?.id === tratamiento.id) {
      setTratamientoSeleccionado(null);
    }

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
          onClick={() => {

            setTratamientoEditando(null);

            setOpenDialog(true);

          }}
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

              <TableCell>Veterinario</TableCell>

              <TableCell align="center">
                Acciones
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {tratamientos.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No hay tratamientos registrados.
                </TableCell>

              </TableRow>

            ) : (

              tratamientos.map((tratamiento) => (

                <TableRow
                  key={tratamiento.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setTratamientoSeleccionado(tratamiento)
                  }
                >

                  <TableCell>
                    {tratamiento.fecha}
                  </TableCell>

                  <TableCell>
                    {tratamiento.tipo}
                  </TableCell>

                  <TableCell>
                    {tratamiento.producto}
                  </TableCell>

                  <TableCell>
                    {tratamiento.dosis} {tratamiento.unidad}
                  </TableCell>

                  <TableCell>
                    {tratamiento.veterinario || "-"}
                  </TableCell>

                  <TableCell
                    align="center"
                    onClick={(e) => e.stopPropagation()}
                  >

                    <IconButton
                      color="primary"
                      onClick={() => editar(tratamiento)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => eliminar(tratamiento)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </Paper>

            {tratamientoSeleccionado && (

        <Paper sx={{ mt: 3, p: 3 }}>

          <Typography
            variant="h6"
            gutterBottom
          >
            📋 Detalle del tratamiento
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <Typography>
                <b>Producto:</b> {tratamientoSeleccionado.producto || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <b>Laboratorio:</b> {tratamientoSeleccionado.laboratorio || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <b>Veterinario:</b> {tratamientoSeleccionado.veterinario || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <b>Responsable:</b> {tratamientoSeleccionado.responsable || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <b>Diagnóstico:</b> {tratamientoSeleccionado.diagnostico || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <b>Próxima dosis:</b> {tratamientoSeleccionado.proximaDosis || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>
                <b>Período de retiro:</b> {tratamientoSeleccionado.retiro || "-"}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <b>Observaciones:</b>
              </Typography>

              <Typography color="text.secondary">
                {tratamientoSeleccionado.observaciones || "Sin observaciones."}
              </Typography>
            </Grid>

          </Grid>

        </Paper>

      )}

      <SanidadDialog
        open={openDialog}
        tratamientoInicial={tratamientoEditando}
        onClose={() => {
          setOpenDialog(false);
          setTratamientoEditando(null);
        }}
        onGuardar={guardarTratamiento}
      />

    </Box>

  );

}

export default SanidadTab;