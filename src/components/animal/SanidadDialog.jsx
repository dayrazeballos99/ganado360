import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import tiposTratamiento from "../../data/tiposTratamiento";
import viasAplicacion from "../../data/viasAplicacion";

const tratamientoVacio = {
  fecha: "",
  tipo: "",
  producto: "",
  laboratorio: "",
  dosis: "",
  unidad: "ml",
  via: "",
  responsable: "",
  veterinario: "",
  diagnostico: "",
  proximaDosis: "",
  retiro: "",
  observaciones: "",
};

function SanidadDialog({
  open,
  onClose,
  onGuardar,
  tratamientoInicial = null,
}) {
  const [tratamiento, setTratamiento] = useState(tratamientoVacio);

  useEffect(() => {
    if (open) {
      setTratamiento(
        tratamientoInicial
          ? { ...tratamientoVacio, ...tratamientoInicial }
          : tratamientoVacio
      );
    }
  }, [open, tratamientoInicial]);

  function cambiar(e) {
    setTratamiento({
      ...tratamiento,
      [e.target.name]: e.target.value,
    });
  }

  function guardar() {
    if (!tratamiento.fecha || !tratamiento.tipo) {
      alert("La fecha y el tipo son obligatorios.");
      return;
    }

    onGuardar(tratamiento);

    setTratamiento(tratamientoVacio);

    onClose();
  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
  {tratamientoInicial
    ? "✏️ Editar Tratamiento"
    : "💉 Registrar Tratamiento"}
</DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      type="date"
      label="Fecha"
      name="fecha"
      value={tratamiento.fecha}
      onChange={cambiar}
      InputLabelProps={{ shrink: true }}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      select
      fullWidth
      label="Tipo"
      name="tipo"
      value={tratamiento.tipo}
      onChange={cambiar}
    >
      {tiposTratamiento.map((tipo) => (
        <MenuItem key={tipo} value={tipo}>
          {tipo}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Producto"
      name="producto"
      value={tratamiento.producto}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Laboratorio"
      name="laboratorio"
      value={tratamiento.laboratorio}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={6} md={3}>
    <TextField
      fullWidth
      type="number"
      label="Dosis"
      name="dosis"
      value={tratamiento.dosis}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={6} md={3}>
    <TextField
      fullWidth
      label="Unidad"
      name="unidad"
      value={tratamiento.unidad}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      select
      fullWidth
      label="Vía de aplicación"
      name="via"
      value={tratamiento.via}
      onChange={cambiar}
    >
      {viasAplicacion.map((via) => (
        <MenuItem key={via} value={via}>
          {via}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Veterinario"
      name="veterinario"
      value={tratamiento.veterinario}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Responsable"
      name="responsable"
      value={tratamiento.responsable}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Diagnóstico"
      name="diagnostico"
      value={tratamiento.diagnostico}
      onChange={cambiar}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      type="date"
      label="Próxima dosis"
      name="proximaDosis"
      value={tratamiento.proximaDosis}
      onChange={cambiar}
      InputLabelProps={{ shrink: true }}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <TextField
      fullWidth
      label="Período de retiro"
      name="retiro"
      value={tratamiento.retiro}
      onChange={cambiar}
      placeholder="Ej: 21 días"
    />
  </Grid>

  <Grid item xs={12}>
    <TextField
      fullWidth
      multiline
      minRows={3}
      label="Observaciones"
      name="observaciones"
      value={tratamiento.observaciones}
      onChange={cambiar}
    />
  </Grid>

</Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={guardar}
        >
          Guardar
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default SanidadDialog;