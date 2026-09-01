import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";

import {
  obtenerResumenDashboard,
} from "../services/dashboardService";

import {
  obtenerTodosLosPesajes,
} from "../services/pesajeService";

import {
  Grid,
  Typography,
  Paper,
  Box,
  TextField,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";

import AnimalesPorLoteChart from "../components/dashboard/AnimalesPorLoteChart";
import PesoDistribucionChart from "../components/dashboard/PesoDistribucionChart";
import PesoPromedioChart from "../components/dashboard/PesoPromedioChart";
import PesoPorLoteChart from "../components/dashboard/PesoPorLoteChart";
import SexoChart from "../components/dashboard/SexoChart";

import { obtenerLotes } from "../services/loteService";

function Dashboard() {
  const [resumen, setResumen] = useState({
    total: 0,
    activos: 0,
    vendidos: 0,
    muertos: 0,
    alertas: 0,
    pesoPromedio: 0,
    pesoTotal: 0,
    cantidadLotes: 0,
    animalesPorLote: [],
    pesoDistribucion: [],
    pesoPorLote: [],
    machos: 0,
    hembras: 0,
  });

  const [pesosHistoricos, setPesosHistoricos] =
    useState([]);

  const [lotes, setLotes] = useState([]);

  const [loteSeleccionado, setLoteSeleccionado] =
    useState("");

  useEffect(() => {
    async function cargarDashboard() {
      try {
        const datos =
          await obtenerResumenDashboard(
            loteSeleccionado
          );

        setResumen(datos);

        const listaLotes =
          await obtenerLotes();

        setLotes(listaLotes);

        const pesajes =
          await obtenerTodosLosPesajes();

        // =====================================
        // FILTRAR PESAJES POR LOTE
        // =====================================

        const animalesDelLote =
          loteSeleccionado
            ? datos.animales
            : null;

        const idsAnimalesLote =
          animalesDelLote
            ? new Set(
                animalesDelLote.map(
                  (animal) => animal.id
                )
              )
            : null;

        const pesajesFiltrados =
          loteSeleccionado
            ? pesajes.filter((pesaje) =>
                idsAnimalesLote.has(
                  pesaje.animalId
                )
              )
            : pesajes;

        // =====================================
        // ORDENAR PESAJES POR FECHA
        // =====================================

        const pesajesValidos =
          pesajesFiltrados
            .filter((pesaje) => {
              const peso =
                Number(pesaje.peso);

              return (
                pesaje.fecha &&
                Number.isFinite(peso) &&
                peso > 0
              );
            })
            .sort(
              (a, b) =>
                new Date(a.fecha) -
                new Date(b.fecha)
            );

        // =====================================
        // AGRUPAR PESAJES POR FECHA
        // =====================================

        const pesajesPorFecha = {};

        pesajesValidos.forEach(
          (pesaje) => {
            if (
              !pesajesPorFecha[
                pesaje.fecha
              ]
            ) {
              pesajesPorFecha[
                pesaje.fecha
              ] = [];
            }

            pesajesPorFecha[
              pesaje.fecha
            ].push(pesaje);
          }
        );

        // =====================================
        // CALCULAR ÚLTIMO PESO CONOCIDO
        // DE CADA ANIMAL EN CADA FECHA
        // =====================================

        const ultimoPesoPorAnimal = {};

        const evolucionPeso = [];

        Object.keys(
          pesajesPorFecha
        )
          .sort(
            (a, b) =>
              new Date(a) -
              new Date(b)
          )
          .forEach((fecha) => {
            pesajesPorFecha[
              fecha
            ].forEach((pesaje) => {
              ultimoPesoPorAnimal[
                pesaje.animalId
              ] = Number(
                pesaje.peso
              );
            });

            const pesosActuales =
              Object.values(
                ultimoPesoPorAnimal
              );

            if (
              pesosActuales.length === 0
            ) {
              return;
            }

            const suma =
              pesosActuales.reduce(
                (total, peso) =>
                  total + peso,
                0
              );

            const promedio =
              suma /
              pesosActuales.length;

            evolucionPeso.push({
              fecha,
              pesoPromedio:
                Number(
                  promedio.toFixed(1)
                ),
            });
          });

        setPesosHistoricos(
          evolucionPeso
        );

      } catch (error) {
        console.error(
          "Error cargando Dashboard:",
          error
        );
      }
    }

    cargarDashboard();
  }, [loteSeleccionado]);

  const sexoDistribucion = [
    {
      nombre: "Machos",
      cantidad: resumen.machos || 0,
    },
    {
      nombre: "Hembras",
      cantidad: resumen.hembras || 0,
    },
  ];

  return (
    <Layout>

      <Box sx={{ mb: 4 }}>

        <Typography
          variant="overline"
          sx={{
            color: "#2e7d32",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          GANADO360
        </Typography>

        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mt: 0.5,
            fontSize: {
              xs: "2rem",
              md: "2.5rem",
            },
          }}
        >
          Dashboard General
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Resumen general de tu establecimiento y rodeo.
        </Typography>

      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "#fafafa",
        }}
      >

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          alignItems={{
            xs: "stretch",
            sm: "center",
          }}
          justifyContent="space-between"
        >

          <Box>

            <Typography
              variant="subtitle1"
              fontWeight={600}
            >
              Filtro de información
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Seleccioná un lote para consultar sus datos.
            </Typography>

          </Box>

          <TextField
            select
            label="Lote"
            value={loteSeleccionado}
            onChange={(e) =>
              setLoteSeleccionado(
                e.target.value
              )
            }
            size="small"
            sx={{
              minWidth: 240,
              backgroundColor: "#fff",
            }}
          >

            <MenuItem value="">
              Todos los lotes
            </MenuItem>

            {lotes.map((lote) => (

              <MenuItem
                key={lote.id}
                value={lote.id}
              >
                {lote.nombre}
              </MenuItem>

            ))}

          </TextField>

        </Stack>

      </Paper>

      <Grid container spacing={2.5}>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            titulo="Animales"
            valor={resumen.total}
            subtitulo={`${resumen.activos} activos • ${resumen.vendidos} vendidos`}
            icono="🐄"
            color="#E8F5E9"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            titulo="Peso promedio"
            valor={`${resumen.pesoPromedio} kg`}
            subtitulo="Promedio del rodeo"
            icono="⚖️"
            color="#E3F2FD"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            titulo="Peso total"
            valor={`${resumen.pesoTotal} kg`}
            subtitulo="Peso del establecimiento"
            icono="🏋️"
            color="#F3E5F5"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            titulo="Alertas"
            valor={resumen.alertas}
            subtitulo="Animales sin peso"
            icono="⚠️"
            color="#FFF8E1"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            titulo="Lotes"
            valor={resumen.cantidadLotes}
            subtitulo="Lotes registrados"
            icono="📦"
            color="#E0F2F1"
          />
        </Grid>

      </Grid>

      <Box sx={{ mt: 4 }}>
        <AnimalesPorLoteChart
          datos={resumen.animalesPorLote}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <PesoDistribucionChart
          datos={resumen.pesoDistribucion}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <PesoPromedioChart
          datos={pesosHistoricos}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <PesoPorLoteChart
          datos={resumen.pesoPorLote}
        />
      </Box>

      <Box sx={{ mt: 3 }}>

        <Grid container spacing={3}>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <SexoChart
              datos={sexoDistribucion}
            />
          </Grid>

        </Grid>

      </Box>

      <Box sx={{ mt: 3 }}>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >

          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
          >
            📅 Próximas tareas
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography color="text.secondary">
            No hay tareas pendientes.
          </Typography>

        </Paper>

      </Box>

      <Box
        sx={{
          mt: 3,
          pb: 4,
        }}
      >

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >

          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
          >
            📋 Actividad reciente
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography color="text.secondary">
            Todavía no hay actividad registrada.
          </Typography>

        </Paper>

      </Box>

    </Layout>
  );
}

export default Dashboard;