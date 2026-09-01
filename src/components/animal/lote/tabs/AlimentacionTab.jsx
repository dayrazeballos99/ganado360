import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  obtenerAlimentaciones,
  agregarAlimentacion,
  editarAlimentacion,
  eliminarAlimentacion,
} from "../../../../services/alimentacionService";


export default function AlimentacionTab({
  loteId,
}) {

  const [alimentaciones, setAlimentaciones] =
    useState([]);

  const [dialogoAbierto, setDialogoAbierto] =
    useState(false);

  const [editando, setEditando] =
    useState(null);

  const [formulario, setFormulario] =
    useState({
      fecha: "",
      tipo: "",
      alimento: "",
      cantidad: "",
      unidad: "kg",
      responsable: "",
      observaciones: "",
    });


  async function cargarAlimentaciones() {

    try {

      const datos =
        await obtenerAlimentaciones(loteId);

      setAlimentaciones(datos);

    } catch (error) {

      console.error(
        "Error cargando alimentación:",
        error
      );

    }

  }


  useEffect(() => {

    cargarAlimentaciones();

  }, [loteId]);


  function abrirNuevo() {

    setEditando(null);

    setFormulario({
      fecha: "",
      tipo: "",
      alimento: "",
      cantidad: "",
      unidad: "kg",
      responsable: "",
      observaciones: "",
    });

    setDialogoAbierto(true);

  }


  function abrirEditar(alimentacion) {

    setEditando(alimentacion);

    setFormulario({
      fecha: alimentacion.fecha || "",
      tipo: alimentacion.tipo || "",
      alimento: alimentacion.alimento || "",
      cantidad: alimentacion.cantidad || "",
      unidad: alimentacion.unidad || "kg",
      responsable:
        alimentacion.responsable || "",
      observaciones:
        alimentacion.observaciones || "",
    });

    setDialogoAbierto(true);

  }


  function cambiarFormulario(
    campo,
    valor
  ) {

    setFormulario({
      ...formulario,
      [campo]: valor,
    });

  }


  async function guardar() {

    if (
      !formulario.fecha ||
      !formulario.tipo ||
      !formulario.alimento ||
      !formulario.cantidad
    ) {

      alert(
        "Completá fecha, tipo, alimento y cantidad."
      );

      return;

    }

    try {

      if (editando) {

        await editarAlimentacion(
          loteId,
          editando.id,
          formulario
        );

      } else {

        await agregarAlimentacion(
          loteId,
          formulario
        );

      }

      setDialogoAbierto(false);

      await cargarAlimentaciones();

    } catch (error) {

      console.error(
        "Error guardando alimentación:",
        error
      );

    }

  }


  async function eliminar(alimentacionId) {

    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este registro?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await eliminarAlimentacion(
        loteId,
        alimentacionId
      );

      await cargarAlimentaciones();

    } catch (error) {

      console.error(
        "Error eliminando alimentación:",
        error
      );

    }

  }


  const totalRegistros =
    alimentaciones.length;


  const cantidadTotal =
    alimentaciones.reduce(
      (total, alimentacion) =>
        total +
        Number(alimentacion.cantidad || 0),
      0
    );


  const ultimoRegistro =
    alimentaciones.length > 0
      ? alimentaciones[0]
      : null;


  return (

    <Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Box>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            🌾 Alimentación del lote
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Registro e historial de alimentación.
          </Typography>

        </Box>

        <Button
          variant="contained"
          onClick={abrirNuevo}
        >
          + Agregar alimentación
        </Button>

      </Box>


      <Grid
        container
        spacing={3}
        mb={3}
      >

        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              🌾 Registros
            </Typography>

            <Typography variant="h4">
              {totalRegistros}
            </Typography>

          </Paper>

        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              ⚖️ Cantidad total
            </Typography>

            <Typography variant="h4">
              {cantidadTotal.toLocaleString("es-AR")} kg
            </Typography>

          </Paper>

        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              📅 Último registro
            </Typography>

            <Typography variant="h6">
              {ultimoRegistro
                ? ultimoRegistro.fecha
                : "-"}
            </Typography>

          </Paper>

        </Grid>


        <Grid size={{ xs: 12, md: 3 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              🥣 Último alimento
            </Typography>

            <Typography variant="h6">
              {ultimoRegistro
                ? ultimoRegistro.alimento
                : "-"}
            </Typography>

          </Paper>

        </Grid>

      </Grid>


      <Paper sx={{ p: 2 }}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Fecha
              </TableCell>

              <TableCell>
                Tipo
              </TableCell>

              <TableCell>
                Alimento
              </TableCell>

              <TableCell align="right">
                Cantidad
              </TableCell>

              <TableCell>
                Responsable
              </TableCell>

              <TableCell>
                Observaciones
              </TableCell>

              <TableCell align="center">
                Acciones
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {alimentaciones.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={7}
                  align="center"
                >

                  Todavía no hay registros de
                  alimentación para este lote.

                </TableCell>

              </TableRow>

            ) : (

              alimentaciones.map(
                (alimentacion) => (

                  <TableRow
                    key={alimentacion.id}
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

                    <TableCell align="right">
                      {alimentacion.cantidad}{" "}
                      {alimentacion.unidad}
                    </TableCell>

                    <TableCell>
                      {alimentacion.responsable ||
                        "-"}
                    </TableCell>

                    <TableCell>
                      {alimentacion.observaciones ||
                        "-"}
                    </TableCell>

                    <TableCell align="center">

                      <IconButton
                        onClick={() =>
                          abrirEditar(
                            alimentacion
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>


                      <IconButton
                        onClick={() =>
                          eliminar(
                            alimentacion.id
                          )
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


      <Dialog
        open={dialogoAbierto}
        onClose={() =>
          setDialogoAbierto(false)
        }
        fullWidth
        maxWidth="md"
      >

        <DialogTitle>

          {editando
            ? "Editar alimentación"
            : "Agregar alimentación"}

        </DialogTitle>


        <DialogContent>

          <Grid
            container
            spacing={2}
            sx={{ mt: 1 }}
          >

            <Grid
              size={{ xs: 12, md: 6 }}
            >

              <TextField
                label="Fecha"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={formulario.fecha}
                onChange={(e) =>
                  cambiarFormulario(
                    "fecha",
                    e.target.value
                  )
                }
              />

            </Grid>


            <Grid
              size={{ xs: 12, md: 6 }}
            >

              <TextField
                label="Tipo de alimentación"
                placeholder="Ej: Silo, pastura, balanceado"
                fullWidth
                value={formulario.tipo}
                onChange={(e) =>
                  cambiarFormulario(
                    "tipo",
                    e.target.value
                  )
                }
              />

            </Grid>


            <Grid size={12}>

              <TextField
                label="Nombre del alimento"
                placeholder="Ej: Silo de maíz"
                fullWidth
                value={formulario.alimento}
                onChange={(e) =>
                  cambiarFormulario(
                    "alimento",
                    e.target.value
                  )
                }
              />

            </Grid>


            <Grid
              size={{ xs: 12, md: 6 }}
            >

              <TextField
                label="Cantidad"
                type="number"
                fullWidth
                value={formulario.cantidad}
                onChange={(e) =>
                  cambiarFormulario(
                    "cantidad",
                    e.target.value
                  )
                }
              />

            </Grid>


            <Grid
              size={{ xs: 12, md: 6 }}
            >

              <TextField
                label="Unidad"
                fullWidth
                value={formulario.unidad}
                onChange={(e) =>
                  cambiarFormulario(
                    "unidad",
                    e.target.value
                  )
                }
              />

            </Grid>


            <Grid size={12}>

              <TextField
                label="Responsable"
                fullWidth
                value={
                  formulario.responsable
                }
                onChange={(e) =>
                  cambiarFormulario(
                    "responsable",
                    e.target.value
                  )
                }
              />

            </Grid>


            <Grid size={12}>

              <TextField
                label="Observaciones"
                multiline
                rows={3}
                fullWidth
                value={
                  formulario.observaciones
                }
                onChange={(e) =>
                  cambiarFormulario(
                    "observaciones",
                    e.target.value
                  )
                }
              />

            </Grid>

          </Grid>

        </DialogContent>


        <DialogActions>

          <Button
            onClick={() =>
              setDialogoAbierto(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={guardar}
          >
            Guardar
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}