import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import {
  obtenerPesajes,
} from "../../../services/pesajeService";

import {
  obtenerTratamientos,
} from "../../../services/sanidadService";

import {
  obtenerAlimentacionesAnimal,
} from "../../../services/alimentacionService";

import {
  obtenerEventosReproductivos,
} from "../../../services/reproduccionService";


function HistorialTab({ animal }) {

  const [historial, setHistorial] = useState([]);


  useEffect(() => {

    async function cargarHistorial() {

      if (!animal) return;

      const [
        pesajes,
        tratamientos,
        alimentaciones,
        reproduccion,
      ] = await Promise.all([

        obtenerPesajes(animal.id),

        obtenerTratamientos(animal.id),

        obtenerAlimentacionesAnimal(animal.id),

        obtenerEventosReproductivos(animal.id),

      ]);


      const eventos = [

        ...pesajes.map((pesaje) => ({
          id: `pesaje-${pesaje.id}`,
          fecha: pesaje.fecha,
          tipo: "pesaje",
          icono: "⚖️",
          titulo: "Pesaje",
          descripcion:
            `${pesaje.peso} kg`,
        })),


        ...tratamientos.map((tratamiento) => ({
          id: `sanidad-${tratamiento.id}`,
          fecha: tratamiento.fecha,
          tipo: "sanidad",
          icono: "💉",
          titulo:
            tratamiento.tipo || "Tratamiento sanitario",
          descripcion:
            tratamiento.producto || "",
        })),


        ...alimentaciones.map((alimentacion) => ({
          id: `alimentacion-${alimentacion.id}`,
          fecha: alimentacion.fecha,
          tipo: "alimentacion",
          icono: "🌾",
          titulo: "Alimentación",
          descripcion:
            alimentacion.tipo || "",
        })),


        ...reproduccion.map((evento) => ({
          id: `reproduccion-${evento.id}`,
          fecha: evento.fecha,
          tipo: "reproduccion",
          icono: "🐄",
          titulo:
            evento.tipo || "Evento reproductivo",
          descripcion:
            evento.metodo || "",
        })),

      ];


      eventos.sort((a, b) => {

        return (
          new Date(b.fecha) -
          new Date(a.fecha)
        );

      });


      setHistorial(eventos);

    }


    cargarHistorial();

  }, [animal]);


  if (!animal) {

    return null;

  }


  return (

    <Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        📜 Historial del animal
      </Typography>


      {historial.length === 0 ? (

        <Paper
          sx={{
            p: 4,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h6"
          >
            Todavía no hay movimientos registrados
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Los pesajes, tratamientos,
            alimentaciones y eventos reproductivos
            aparecerán automáticamente aquí.
          </Typography>

        </Paper>

      ) : (

        <Paper sx={{ p: 3 }}>

          {historial.map(
            (evento, index) => (

              <Box
                key={evento.id}
              >

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                  }}
                >

                  <Typography
                    sx={{
                      fontSize: 28,
                    }}
                  >
                    {evento.icono}
                  </Typography>


                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >

                    <Typography
                      fontWeight="bold"
                    >
                      {evento.titulo}
                    </Typography>


                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {evento.descripcion}
                    </Typography>

                  </Box>


                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {evento.fecha}
                  </Typography>

                </Box>


                {index <
                  historial.length - 1 && (
                    <Divider />
                  )}

              </Box>

            )
          )}

        </Paper>

      )}

    </Box>

  );

}


export default HistorialTab;