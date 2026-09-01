import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Grid,
} from "@mui/material";

import { obtenerTratamientos } from "../../../../services/sanidadService";

function formatearFecha(fecha) {
  if (!fecha) return "-";

  // Si ya viene como YYYY-MM-DD
  if (typeof fecha === "string" && fecha.includes("-")) {
    return fecha;
  }

  // Si viene como número de Excel
  if (!isNaN(fecha)) {
    const fechaExcel = new Date(
      Math.round((Number(fecha) - 25569) * 86400 * 1000)
    );

    return fechaExcel.toISOString().split("T")[0];
  }

  return String(fecha);
}

export default function SanidadTab({ animales = [] }) {
  const [tratamientos, setTratamientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarTratamientos() {
      setCargando(true);

      try {
        const todosLosTratamientos = [];

        for (const animal of animales) {
          const tratamientosAnimal =
            await obtenerTratamientos(animal.id);

          tratamientosAnimal.forEach((tratamiento) => {
            todosLosTratamientos.push({
              ...tratamiento,

              animalId: animal.id,

              rp:
                animal.rp ||
                animal.caravana ||
                animal.nombre ||
                "Sin identificar",

              nombre: animal.nombre || "-",
            });
          });
        }

        todosLosTratamientos.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });

        setTratamientos(todosLosTratamientos);

      } catch (error) {
        console.error(
          "Error cargando tratamientos del lote:",
          error
        );

      } finally {
        setCargando(false);
      }
    }

    cargarTratamientos();

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

  const animalesConTratamiento = new Set(
    tratamientos.map(
      (tratamiento) => tratamiento.animalId
    )
  ).size;

  const totalTratamientos = tratamientos.length;

  const ultimoTratamiento = tratamientos[0];

  return (
    <Box>

      <Grid container spacing={3} mb={3}>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              🐄 Animales con registros
            </Typography>

            <Typography variant="h4">
              {animalesConTratamiento}
            </Typography>

          </Paper>
        </Grid>


        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              💉 Tratamientos registrados
            </Typography>

            <Typography variant="h4">
              {totalTratamientos}
            </Typography>

          </Paper>
        </Grid>


        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>

            <Typography variant="body2">
              📅 Último registro
            </Typography>

            <Typography variant="h6">
              {ultimoTratamiento?.fecha || "-"}
            </Typography>

          </Paper>
        </Grid>

      </Grid>


      <Typography
        variant="h5"
        fontWeight="bold"
      >
        💉 Sanidad del lote
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={2}
      >
        Historial sanitario de los animales
        pertenecientes a este lote.
      </Typography>


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
                Tratamiento
              </TableCell>

              <TableCell>
                Observaciones
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {tratamientos.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No hay registros sanitarios
                  para los animales de este lote.
                </TableCell>

              </TableRow>

            ) : (

              tratamientos.map((tratamiento) => (

                <TableRow
                  key={`${tratamiento.animalId}-${tratamiento.id}`}
                >

                  <TableCell>
                    {tratamiento.rp}
                  </TableCell>

                  <TableCell>
                    {tratamiento.nombre}
                  </TableCell>

                  <TableCell>
  {formatearFecha(tratamiento.fecha)}
</TableCell>

                  <TableCell>
                    {tratamiento.tipo || "-"}
                  </TableCell>

                  <TableCell>
                    {tratamiento.observaciones || "-"}
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