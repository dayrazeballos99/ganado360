import { useState } from "react";

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

const tiposPesaje = [
  "Nacimiento",
  "Destete",
  "Recría",
  "Ingreso a Feedlot",
  "Control",
  "Pre Servicio",
  "Pre Parto",
  "Venta",
  "Faena",
  "Otro",
];

function PesajeDialog({ open, onClose, onGuardar }) {

  const [pesaje, setPesaje] = useState({
    fecha: "",
    tipo: "Control",
    peso: "",
    responsable: "",
    observaciones: "",
  });

  function cambiar(e) {

    setPesaje({
      ...pesaje,
      [e.target.name]: e.target.value,
    });

  }

  function guardar() {

    if (!pesaje.fecha || !pesaje.peso) {
      alert("La fecha y el peso son obligatorios.");
      return;
    }

    onGuardar(pesaje);

    setPesaje({
      fecha: "",
      tipo: "Control",
      peso: "",
      responsable: "",
      observaciones: "",
    });

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        ⚖️ Nuevo Pesaje
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt:1 }}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              name="fecha"
              label="Fecha"
              InputLabelProps={{ shrink:true }}
              value={pesaje.fecha}
              onChange={cambiar}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              name="tipo"
              label="Tipo de pesaje"
              value={pesaje.tipo}
              onChange={cambiar}
            >
              {tiposPesaje.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              name="peso"
              label="Peso (kg)"
              value={pesaje.peso}
              onChange={cambiar}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="responsable"
              label="Responsable"
              value={pesaje.responsable}
              onChange={cambiar}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="observaciones"
              label="Observaciones"
              value={pesaje.observaciones}
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

export default PesajeDialog;