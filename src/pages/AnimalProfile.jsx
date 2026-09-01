import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import AnimalHeader from "../components/animal/AnimalHeader";
import AnimalSummary from "../components/animal/AnimalSummary";

import PesajesTab from "../components/animal/tabs/PesajesTab";
import SanidadTab from "../components/animal/tabs/SanidadTab";
import AlimentacionTab from "../components/animal/tabs/AlimentacionTab";
import ReproduccionTab from "../components/animal/tabs/ReproduccionTab";
import HistorialTab from "../components/animal/tabs/HistorialTab";
import ComercialTab from "../components/animal/tabs/ComercialTab";
import AnimalEstadisticasTab from "../components/animal/tabs/AnimalEstadisticasTab";

import {
  obtenerAnimalPorId,
  editarAnimal,
} from "../services/animalService";

import {
  obtenerLotes,
} from "../services/loteService";

import {
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


function AnimalProfile() {

  const { id } = useParams();

  const [animal, setAnimal] = useState(null);

  const [tab, setTab] = useState(0);

  const [lotes, setLotes] = useState([]);


  useEffect(() => {

    async function cargarAnimal() {

      const datos =
        await obtenerAnimalPorId(id);

      setAnimal(datos);

      const listaLotes =
        await obtenerLotes();

      setLotes(listaLotes);

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
          onChange={(e, nuevo) =>
            setTab(nuevo)
          }
          variant="scrollable"
          scrollButtons="auto"
        >

          <Tab label="📋 Datos" />
          <Tab label="⚖️ Pesajes" />
          <Tab label="💉 Sanidad" />
          <Tab label="🌾 Alimentación" />
          <Tab label="🐄 Reproducción" />
          <Tab label="📜 Historial" />
          <Tab label="💰 Comercial" />
          <Tab label="📊 Estadísticas" />

        </Tabs>

      </Paper>


      <Paper
        sx={{
          p: 4,
          mt: 3,
        }}
      >

        {tab === 0 && (

          <Grid
            container
            spacing={3}
          >

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Paper sx={{ p: 2 }}>

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  📋 Identificación
                </Typography>

                <Typography>
                  <b>RP:</b>{" "}
                  {animal?.rp || "-"}
                </Typography>

                <Typography>
                  <b>Caravana:</b>{" "}
                  {animal?.caravana || "-"}
                </Typography>

                <Typography>
                  <b>Nombre:</b>{" "}
                  {animal?.nombre || "-"}
                </Typography>

                <Typography>
                  <b>Estado:</b>{" "}
                  {animal?.estado || "-"}
                </Typography>

              </Paper>

            </Grid>


            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >

              <Paper sx={{ p: 2 }}>

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  🐄 Datos Generales
                </Typography>

                <Typography>
                  <b>Raza:</b>{" "}
                  {animal?.raza || "-"}
                </Typography>

                <Typography>
                  <b>Sexo:</b>{" "}
                  {animal?.sexo || "-"}
                </Typography>

                <Typography>
                  <b>Categoría:</b>{" "}
                  {animal?.categoria || "-"}
                </Typography>


                <FormControl
                  fullWidth
                  sx={{ mt: 2 }}
                >

                  <InputLabel>
                    Lote
                  </InputLabel>

                  <Select
                    value={
                      animal?.loteId || ""
                    }
                    label="Lote"
                    onChange={async (e) => {

                      const nuevoLoteId =
                        e.target.value;

                      const actualizado = {
                        ...animal,
                        loteId: nuevoLoteId,
                      };

                      setAnimal(actualizado);

                      await editarAnimal(
                        animal.id,
                        {
                          loteId:
                            nuevoLoteId,
                        }
                      );

                    }}
                  >

                    <MenuItem value="">
                      Sin lote
                    </MenuItem>


                    {lotes.map((lote) => (

                      <MenuItem
                        key={lote.id}
                        value={lote.id}
                      >
                        {lote.nombre}
                      </MenuItem>

                    ))}

                  </Select>

                </FormControl>

              </Paper>

            </Grid>


            <Grid size={{ xs: 12 }}>

              <Paper sx={{ p: 2 }}>

                <Typography
                  variant="h6"
                  gutterBottom
                >
                  📝 Observaciones
                </Typography>

                <Typography>
                  {animal?.observaciones ||
                    "Sin observaciones."}
                </Typography>

              </Paper>

            </Grid>

          </Grid>

        )}


        {tab === 1 && (

          <PesajesTab
            animal={animal}
          />

        )}


        {tab === 2 && (

          <SanidadTab
            animal={animal}
          />

        )}


        {tab === 3 && (

          <AlimentacionTab
            animal={animal}
          />

        )}


        {tab === 4 && (

          <ReproduccionTab
            animal={animal}
          />

        )}


        {tab === 5 && (

          <HistorialTab
            animal={animal}
          />

        )}


        {tab === 6 && (

  <ComercialTab
    animal={animal}
  />

)}


        {tab === 7 && (

          <AnimalEstadisticasTab
            animal={animal}
          />

        )}

      </Paper>

    </Layout>

  );

}


export default AnimalProfile;