import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

import {
  obtenerLotes,
  agregarLote,
} from "../services/loteService";

import LoteDialog from "../components/lotes/LoteDialog";

export default function Lotes() {

  const navigate = useNavigate();

  const [lotes, setLotes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    cargarLotes();
  }, []);

  async function cargarLotes() {

    const datos = await obtenerLotes();

    setLotes(datos);

  }

  async function guardarLote(lote) {

    await agregarLote({
      ...lote,
      fechaCreacion: new Date().toISOString().slice(0, 10),
      cantidadAnimales: 0,
      pesoPromedio: 0,
      pesoTotal: 0,
      gmdPromedio: 0,
      activo: true,
    });

    setDialogOpen(false);

    cargarLotes();

  }

  return (

    <Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >

        <Typography variant="h4">
          📦 Lotes
        </Typography>

        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          Nuevo lote
        </Button>

      </Stack>

      {lotes.length === 0 ? (

        <Paper sx={{ p: 4 }}>

          <Typography>
            Todavía no existen lotes.
          </Typography>

        </Paper>

      ) : (

        lotes.map((lote) => (

          <Paper
            key={lote.id}
            sx={{ p: 2, mb: 2 }}
          >

            <Typography variant="h6">
              {lote.nombre}
            </Typography>

            <Typography>
              Tipo: {lote.tipo}
            </Typography>

            <Typography>
              Estado: {lote.estado}
            </Typography>

            <Typography>
              Capacidad: {lote.capacidad || "-"} animales
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate(`/lote/${lote.id}`)}
            >
              📊 Ver estadísticas
            </Button>

          </Paper>

        ))

      )}

      <LoteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onGuardar={guardarLote}
      />

    </Box>

  );

}