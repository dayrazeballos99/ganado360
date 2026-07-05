import SanidadTab from "../components/animal/tabs/SanidadTab";
import PesajesTab from "../components/animal/tabs/PesajesTab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import AnimalHeader from "../components/animal/AnimalHeader";
import AnimalSummary from "../components/animal/AnimalSummary";

import { obtenerAnimalPorId } from "../services/animalService";

import {
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";

function AnimalProfile() {

  const { id } = useParams();

  const [animal, setAnimal] = useState(null);

  const [tab, setTab] = useState(0);

  useEffect(() => {

    async function cargarAnimal() {

      const datos = await obtenerAnimalPorId(id);

      setAnimal(datos);

    }

    cargarAnimal();

  }, [id]);

  return (

    <Layout>

      <AnimalHeader animal={animal} />

      <AnimalSummary animal={animal} />

      <Paper>

        <Tabs
          value={tab}
          onChange={(e, nuevo) => setTab(nuevo)}
          variant="scrollable"
          scrollButtons="auto"
        >

          <Tab label="📋 Datos" />
          <Tab label="⚖️ Pesajes" />
          <Tab label="💉 Sanidad" />
          <Tab label="🌾 Alimentación" />
          <Tab label="🐄 Reproducción" />
          <Tab label="🚚 Movimientos" />
          <Tab label="📜 Historial" />
          <Tab label="💰 Comercial" />
          <Tab label="📊 Estadísticas" />

        </Tabs>

      </Paper>

      <Paper sx={{ p:4, mt:3 }}>
        {tab === 0 && (

  <Grid container spacing={3}>

    <Grid item xs={12} md={6}>
      <Paper sx={{ p:2 }}>

        <Typography variant="h6" gutterBottom>
          📋 Identificación
        </Typography>

        <Typography><b>RP:</b> {animal?.rp || "-"}</Typography>
        <Typography><b>Caravana:</b> {animal?.caravana || "-"}</Typography>
        <Typography><b>Nombre:</b> {animal?.nombre || "-"}</Typography>
        <Typography><b>Estado:</b> {animal?.estado || "-"}</Typography>

      </Paper>
    </Grid>

    <Grid item xs={12} md={6}>
      <Paper sx={{ p:2 }}>

        <Typography variant="h6" gutterBottom>
          🐄 Datos Generales
        </Typography>

        <Typography><b>Raza:</b> {animal?.raza || "-"}</Typography>
        <Typography><b>Sexo:</b> {animal?.sexo || "-"}</Typography>
        <Typography><b>Categoría:</b> {animal?.categoria || "-"}</Typography>
        <Typography><b>Lote:</b> {animal?.lote || "-"}</Typography>
        <Typography><b>Peso:</b> {animal?.peso || "-"} kg</Typography>

      </Paper>
    </Grid>

    <Grid item xs={12}>
      <Paper sx={{ p:2 }}>

        <Typography variant="h6" gutterBottom>
          📝 Observaciones
        </Typography>

        <Typography>
          {animal?.observaciones || "Sin observaciones."}
        </Typography>

      </Paper>
    </Grid>

  </Grid>

)}

{tab === 1 && (
  <PesajesTab animal={animal} />
)}

{tab === 2 && (
  <SanidadTab animal={animal} />
)}

{tab === 3 && (
  <Typography>Próximamente Alimentación.</Typography>
)}
{tab === 4 && (
  <Typography>Próximamente Reproducción.</Typography>
)}

{tab === 5 && (
  <Typography>Próximamente Movimientos.</Typography>
)}
{tab === 6 && (
  <Typography>
    Próximamente Historial.
  </Typography>
)}
{tab === 7 && (
  <Typography>Próximamente Comercial.</Typography>
)}

{tab === 8 && (
  <Typography>Próximamente Estadísticas.</Typography>
)}

      </Paper>

    </Layout>

  );

}

export default AnimalProfile;