import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Grid,
} from "@mui/material";

import { obtenerPesajes } from "../../../../services/pesajeService";

export default function PesajesTab({ animales = [] }) {

  const [pesajes, setPesajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {

    async function cargarPesajes() {

      setCargando(true);

      try {

        const todosLosPesajes = [];

        for (const animal of animales) {

          const pesajesAnimal =
            await obtenerPesajes(animal.id);

          pesajesAnimal.forEach((pesaje) => {

            todosLosPesajes.push({
              ...pesaje,

              animalId: animal.id,

              rp:
                animal.rp ||
                animal.caravana ||
                animal.nombre ||
                "Sin identificar",

              nombre:
                animal.nombre || "-",
            });

          });

        }

        todosLosPesajes.sort((a, b) => {

          return (
            new Date(b.fecha) -
            new Date(a.fecha)
          );

        });

        setPesajes(todosLosPesajes);

      } catch (error) {

        console.error(
          "Error cargando pesajes del lote:",
          error
        );

      } finally {

        setCargando(false);

      }

    }

    cargarPesajes();

  }, [animales]);


  if (cargando) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        p={4}
      >
        <CircularProgress />
      </Box>

    );

  }


  const animalesConPesaje = new Set(
    pesajes.map((pesaje) => pesaje.animalId)
  ).size;

  const totalPesajes = pesajes.length;


  const ultimoPesajePorAnimal = {};

  pesajes.forEach((pesaje) => {

    if (!ultimoPesajePorAnimal[pesaje.animalId]) {

      ultimoPesajePorAnimal[
        pesaje.animalId
      ] = pesaje;

    }

  });


  const ultimosPesajes = Object.values(
    ultimoPesajePorAnimal
  );


  const pesoPromedio =
    ultimosPesajes.length > 0
      ? (
          ultimosPesajes.reduce(
            (total, pesaje) =>
              total + Number(pesaje.peso),
            0
          ) / ultimosPesajes.length
        ).toFixed(1)
      : 0;


  const pesajesFiltrados = pesajes.filter((pesaje) => {

    const texto = busqueda.toLowerCase();

    return (
      String(pesaje.rp || "")
        .toLowerCase()
        .includes(texto) ||

      String(pesaje.nombre || "")
        .toLowerCase()
        .includes(texto)
    );

  });


  return (

    <Box>

      <Grid
        container
        spacing={3}
        mb={4}
      >

        <Grid size={{ xs: 12, md: 4 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              🐄 Animales con pesaje
            </Typography>

            <Typography variant="h4">
              {animalesConPesaje}
            </Typography>

          </Paper>

        </Grid>


        <Grid size={{ xs: 12, md: 4 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              ⚖️ Pesajes registrados
            </Typography>

            <Typography variant="h4">
              {totalPesajes}
            </Typography>

          </Paper>

        </Grid>


        <Grid size={{ xs: 12, md: 4 }}>

          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              📊 Peso promedio actual
            </Typography>

            <Typography variant="h4">
              {pesoPromedio} kg
            </Typography>

          </Paper>

        </Grid>

      </Grid>


      <Box mb={3}>

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          ⚖️ Pesajes del lote
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Historial de pesajes de los animales
          pertenecientes a este lote.
        </Typography>


        <TextField
          fullWidth
          label="Buscar animal"
          placeholder="Buscar por RP o nombre"
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />

      </Box>


      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Animal
              </TableCell>

              <TableCell>
                Nombre
              </TableCell>

              <TableCell>
                Fecha
              </TableCell>

              <TableCell>
                Tipo
              </TableCell>

              <TableCell align="right">
                Peso
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {pesajesFiltrados.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No se encontraron pesajes.
                </TableCell>

              </TableRow>

            ) : (

              pesajesFiltrados.map((pesaje) => (

                <TableRow
                  key={`${pesaje.animalId}-${pesaje.id}`}
                >

                  <TableCell>
                    {pesaje.rp}
                  </TableCell>

                  <TableCell>
                    {pesaje.nombre}
                  </TableCell>

                  <TableCell>
                    {pesaje.fecha || "-"}
                  </TableCell>

                  <TableCell>
                    {pesaje.tipo || "Control"}
                  </TableCell>

                  <TableCell align="right">
                    {pesaje.peso} kg
                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </Paper>

    </Box>

  );

}