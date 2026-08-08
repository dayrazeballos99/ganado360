import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import MovimientosTable from "../components/MovimientosTable";
import MovimientoDialog from "../components/MovimientoDialog";

import {
  obtenerTodosLosMovimientos,
  agregarMovimiento,
  editarMovimiento as editarMovimientoService,
  eliminarMovimiento as eliminarMovimientoService,
} from "../services/movimientoService";

import {
  actualizarLoteAnimal,
  actualizarEstadoAnimal,
} from "../services/animalService";

import {
  Typography,
  Grid,
  Paper,
  TextField,
  Stack,
  Button,
  Box,
} from "@mui/material";

function Movements() {
  console.log("ENTRÉ A MOVEMENTS");
  const [movimientos, setMovimientos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [movimientoEditar, setMovimientoEditar] = useState(null);

  useEffect(() => {
    cargarMovimientos();
  }, []);

  async function cargarMovimientos() {

  console.log("CARGANDO MOVIMIENTOS");

  try {

    const datos = await obtenerTodosLosMovimientos();

    console.log("Movimientos obtenidos:", datos);

    setMovimientos(datos);

  } catch (error) {

    console.error(error);

  }

}

  async function guardarMovimiento(datos) {
    const { animal, movimiento } = datos;

    if (movimientoEditar) {

  await editarMovimientoService(
  movimientoEditar.animalId,
  movimientoEditar.id,
  movimiento
);

} else {

  await agregarMovimiento(
    animal.id,
    movimiento
  );

}

    if (movimiento.tipo === "Cambio de lote") {
      await actualizarLoteAnimal(
        animal.id,
        movimiento.destino
      );
    }

    if (movimiento.tipo === "Venta") {
      await actualizarEstadoAnimal(
        animal.id,
        "Vendido"
      );
    }

    if (movimiento.tipo === "Muerte") {
      await actualizarEstadoAnimal(
        animal.id,
        "Muerto"
      );
    }

    setOpenDialog(false);
    setMovimientoEditar(null);

    cargarMovimientos();
  }

  function abrirEdicion(movimiento) {
    setMovimientoEditar(movimiento);
    setOpenDialog(true);
  }

  async function eliminarMovimiento(movimiento) {

  if (!window.confirm("¿Eliminar este movimiento?")) return;

  await eliminarMovimientoService(
    movimiento.animalId,
    movimiento.id
  );

  cargarMovimientos();

}

  const movimientosFiltrados = movimientos.filter((m) => {
    const texto = buscar.toLowerCase();

    return (
      (m.rp || "").toLowerCase().includes(texto) ||
      (m.nombre || "").toLowerCase().includes(texto) ||
      (m.tipo || "").toLowerCase().includes(texto)
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
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          🚚 Movimientos
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setMovimientoEditar(null);
            setOpenDialog(true);
          }}
        >
          + Registrar movimiento
        </Button>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            titulo="Total"
            valor={movimientos.length}
            icono="📋"
            color="#1976d2"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            titulo="Ingresos"
            valor={
              movimientos.filter(
                (m) => m.tipo === "Ingreso"
              ).length
            }
            icono="🟢"
            color="#2e7d32"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            titulo="Ventas"
            valor={
              movimientos.filter(
                (m) => m.tipo === "Venta"
              ).length
            }
            icono="💰"
            color="#ed6c02"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            titulo="Cambios de lote"
            valor={
              movimientos.filter(
                (m) => m.tipo === "Cambio de lote"
              ).length
            }
            icono="🚚"
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row">
          <TextField
            fullWidth
            label="Buscar por RP, Nombre o Tipo"
            value={buscar}
            onChange={(e) =>
              setBuscar(e.target.value)
            }
          />
        </Stack>
      </Paper>

      <MovimientosTable
  movimientos={movimientosFiltrados}
  onEdit={abrirEdicion}
  onDelete={eliminarMovimiento}
/>

      <MovimientoDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setMovimientoEditar(null);
        }}
        onGuardar={guardarMovimiento}
        movimientoInicial={movimientoEditar}
        mostrarAnimal={true}
      />
    </Layout>
  );
}

export default Movements;