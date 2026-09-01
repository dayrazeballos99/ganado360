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

import ReproduccionDialog from "../ReproduccionDialog";

import {
  obtenerEventosReproductivos,
  agregarEventoReproductivo,
  editarEventoReproductivo,
  eliminarEventoReproductivo,
} from "../../../services/reproduccionService";


function ReproduccionTab({ animal }) {

  const [eventos, setEventos] = useState([]);

  const [openDialog, setOpenDialog] =
    useState(false);

  const [
    eventoEditando,
    setEventoEditando,
  ] = useState(null);

  const [
    eventoSeleccionado,
    setEventoSeleccionado,
  ] = useState(null);


  async function cargarEventos() {

    if (!animal) return;

    const datos =
      await obtenerEventosReproductivos(
        animal.id
      );

    setEventos(datos);

  }


  useEffect(() => {

    cargarEventos();

  }, [animal]);


  async function guardarEvento(evento) {

    if (eventoEditando) {

      await editarEventoReproductivo(
        animal.id,
        eventoEditando.id,
        evento
      );

    } else {

      await agregarEventoReproductivo(
        animal.id,
        evento
      );

    }

    setEventoEditando(null);

    setOpenDialog(false);

    cargarEventos();

  }


  function editar(evento) {

    setEventoEditando(evento);

    setOpenDialog(true);

  }


  async function eliminar(evento) {

    const confirmar =
      window.confirm(
        "¿Eliminar este evento reproductivo?"
      );

    if (!confirmar) return;

    await eliminarEventoReproductivo(
      animal.id,
      evento.id
    );

    if (
      eventoSeleccionado?.id ===
      evento.id
    ) {

      setEventoSeleccionado(null);

    }

    cargarEventos();

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
          🐄 Historial Reproductivo
        </Typography>


        <Button
          variant="contained"
          onClick={() => {

            setEventoEditando(null);

            setOpenDialog(true);

          }}
        >
          Registrar evento
        </Button>

      </Box>


      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Fecha
              </TableCell>

              <TableCell>
                Evento
              </TableCell>

              <TableCell>
                Reproductor
              </TableCell>

              <TableCell>
                Método
              </TableCell>

              <TableCell align="center">
                Acciones
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {eventos.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No hay eventos reproductivos registrados.
                </TableCell>

              </TableRow>

            ) : (

              eventos.map((evento) => (

                <TableRow
                  key={evento.id}
                  hover
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setEventoSeleccionado(
                      evento
                    )
                  }
                >

                  <TableCell>
                    {evento.fecha}
                  </TableCell>


                  <TableCell>
                    {evento.tipo}
                  </TableCell>


                  <TableCell>
                    {evento.reproductor || "-"}
                  </TableCell>


                  <TableCell>
                    {evento.metodo || "-"}
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
                        editar(evento)
                      }
                    >
                      <EditIcon />
                    </IconButton>


                    <IconButton
                      color="error"
                      onClick={() =>
                        eliminar(evento)
                      }
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


      {eventoSeleccionado && (

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
            📋 Detalle del evento
          </Typography>


          <Grid
            container
            spacing={2}
          >

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Typography>
                <b>Fecha:</b>{" "}
                {eventoSeleccionado.fecha || "-"}
              </Typography>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Typography>
                <b>Tipo:</b>{" "}
                {eventoSeleccionado.tipo || "-"}
              </Typography>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Typography>
                <b>Toro / reproductor:</b>{" "}
                {eventoSeleccionado.reproductor || "-"}
              </Typography>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Typography>
                <b>Método:</b>{" "}
                {eventoSeleccionado.metodo || "-"}
              </Typography>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Typography>
                <b>Próximo control:</b>{" "}
                {eventoSeleccionado.proximoControl || "-"}
              </Typography>

            </Grid>


            <Grid size={{ xs: 12 }}>

              <Typography>
                <b>Observaciones:</b>
              </Typography>

              <Typography
                color="text.secondary"
              >
                {eventoSeleccionado.observaciones ||
                  "Sin observaciones."}
              </Typography>

            </Grid>

          </Grid>

        </Paper>

      )}


      <ReproduccionDialog
        open={openDialog}
        eventoInicial={eventoEditando}
        onClose={() => {

          setOpenDialog(false);

          setEventoEditando(null);

        }}
        onGuardar={guardarEvento}
      />

    </Box>

  );

}


export default ReproduccionTab;