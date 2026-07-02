import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import AnimalDialog from "../components/AnimalDialog";
import AnimalTable from "../components/AnimalTable";

import {
  obtenerAnimales,
  eliminarAnimal,
} from "../services/animalService";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Animals() {
  const [animales, setAnimales] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  async function cargarAnimales() {
    const datos = await obtenerAnimales();
    setAnimales(datos);
  }

  useEffect(() => {
    cargarAnimales();
  }, []);

  async function borrarAnimal(animal) {
    const confirmar = window.confirm(
      `¿Eliminar el animal ${animal.nombre || animal.rp}?`
    );

    if (!confirmar) return;

    await eliminarAnimal(animal.id);

    cargarAnimales();
  }

  const animalesFiltrados = animales.filter((animal) => {
    const texto = buscar.toLowerCase();

    return (
      animal.rp?.toLowerCase().includes(texto) ||
      animal.caravana?.toLowerCase().includes(texto) ||
      animal.nombre?.toLowerCase().includes(texto)
    );
  });

  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          🐄 Gestión de Animales
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          + Nuevo Animal
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar por RP, Caravana o Nombre..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
      </Paper>

      <AnimalTable
        animales={animalesFiltrados}
        onDelete={borrarAnimal}
      />

      <AnimalDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAnimalAdded={cargarAnimales}
      />
    </Layout>
  );
}

export default Animals;