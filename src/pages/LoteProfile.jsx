import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";

import AnimalesTab from "../components/animal/lote/tabs/AnimalesTab";
import EstadisticasTab from "../components/animal/lote/tabs/EstadisticasTab";
import PesajesTab from "../components/animal/lote/tabs/PesajesTab";
import SanidadTab from "../components/animal/lote/tabs/SanidadTab";
import AlimentacionTab from "../components/animal/lote/tabs/AlimentacionTab";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";

import { obtenerResumenLote } from "../services/loteProfileService";


export default function LoteProfile() {

  const { id } = useParams();

  const [lote, setLote] = useState(null);
  const [tab, setTab] = useState(0);


  useEffect(() => {

    async function cargar() {

      const datos =
        await obtenerResumenLote(id);

      setLote(datos);

    }

    cargar();

  }, [id]);


  if (!lote) {

    return (

      <Layout>

        <Box
          display="flex"
          justifyContent="center"
          p={5}
        >

          <CircularProgress />

        </Box>

      </Layout>

    );

  }


  return (

    <Layout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        📦 {lote.nombre}
      </Typography>


      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >

        <Grid
          container
          spacing={3}
        >

          <Grid size={{ xs: 12, md: 4 }}>

            <Typography>

              <b>Tipo:</b> {lote.tipo}

            </Typography>

          </Grid>


          <Grid size={{ xs: 12, md: 4 }}>

            <Typography>

              <b>Estado:</b> {lote.estado}

            </Typography>

          </Grid>


          <Grid size={{ xs: 12, md: 4 }}>

            <Typography>

              <b>Capacidad:</b> {lote.capacidad}

            </Typography>

          </Grid>

        </Grid>

      </Paper>


      <Paper>

        <Tabs
          value={tab}
          onChange={(e, nuevo) =>
            setTab(nuevo)
          }
          variant="scrollable"
          scrollButtons="auto"
        >

          <Tab label="📋 RESUMEN" />

          <Tab label="🐄 ANIMALES" />

          <Tab label="⚖️ PESAJES" />

          <Tab label="💉 SANIDAD" />

          <Tab label="📈 ESTADÍSTICAS" />

          <Tab label="🌾 ALIMENTACIÓN" />

        </Tabs>

      </Paper>


      <Paper
        sx={{
          p: 4,
          mt: 3,
        }}
      >


        {/* =====================
            RESUMEN
        ===================== */}

        {tab === 0 && (

          <Box>

            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              📋 Resumen del lote
            </Typography>


            <Grid
              container
              spacing={3}
            >

              {/* ANIMALES */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    🐄 Animales

                  </Typography>

                  <Typography variant="h4">

                    {lote.cantidadAnimales}

                  </Typography>

                </Paper>

              </Grid>


              {/* PESO PROMEDIO */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    ⚖️ Peso promedio

                  </Typography>

                  <Typography variant="h4">

                    {Number(
                      lote.pesoPromedio
                    ).toLocaleString(
                      "es-AR"
                    )} kg

                  </Typography>

                </Paper>

              </Grid>


              {/* PESO TOTAL */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    🏋️ Peso total

                  </Typography>

                  <Typography variant="h4">

                    {Number(
                      lote.pesoTotal
                    ).toLocaleString(
                      "es-AR"
                    )} kg

                  </Typography>

                </Paper>

              </Grid>


              {/* TRATAMIENTOS */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    💉 Tratamientos registrados

                  </Typography>

                  <Typography variant="h4">

                    {lote.cantidadTratamientos}

                  </Typography>

                </Paper>

              </Grid>


              {/* ALIMENTACIONES */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    🌾 Registros de alimentación

                  </Typography>

                  <Typography variant="h4">

                    {lote.cantidadAlimentaciones}

                  </Typography>

                </Paper>

              </Grid>


              {/* ÚLTIMO ALIMENTO */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    🪣 Último alimento

                  </Typography>

                  <Typography variant="h5">

                    {lote.ultimaAlimentacion
                      ? lote.ultimaAlimentacion.alimento
                      : "-"}

                  </Typography>

                </Paper>

              </Grid>


              {/* ÚLTIMA ALIMENTACIÓN */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    📅 Última alimentación

                  </Typography>

                  <Typography variant="h5">

                    {lote.ultimaAlimentacion
                      ? lote.ultimaAlimentacion.fecha
                      : "-"}

                  </Typography>

                </Paper>

              </Grid>


              {/* ESTADO */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    🟢 Animales activos

                  </Typography>

                  <Typography variant="h4">

                    {lote.activos}

                  </Typography>

                </Paper>

              </Grid>


              {/* CATEGORÍAS */}

              <Grid size={{ xs: 12, md: 4 }}>

                <Paper sx={{ p: 2 }}>

                  <Typography variant="body2">

                    🐂 Categorías

                  </Typography>

                  <Typography variant="h4">

                    {lote.categoriasChart.length}

                  </Typography>

                </Paper>

              </Grid>

            </Grid>

          </Box>

        )}


        {/* =====================
            ANIMALES
        ===================== */}

        {tab === 1 && (

          <AnimalesTab
            animales={lote.animales}
          />

        )}


        {/* =====================
            PESAJES
        ===================== */}

        {tab === 2 && (

          <PesajesTab
            animales={lote.animales}
          />

        )}


        {/* =====================
            SANIDAD
        ===================== */}

        {tab === 3 && (

          <SanidadTab
            animales={lote.animales}
          />

        )}


        {/* =====================
            ESTADÍSTICAS
        ===================== */}

        {tab === 4 && (

          <EstadisticasTab
            animales={lote.animales}
          />

        )}


        {/* =====================
            ALIMENTACIÓN
        ===================== */}

        {tab === 5 && (

          <AlimentacionTab
            loteId={lote.id}
          />

        )}

      </Paper>

    </Layout>

  );

}