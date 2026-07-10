import { useEffect, useState } from "react";

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

const tiposMovimiento = [
  "Ingreso",
  "Cambio de lote",
  "Compra",
  "Venta",
  "Traslado",
  "Muerte",
];

function MovimientoDialog({
  open,
  onClose,
  onGuardar,
  movimientoInicial,
}) {

  const [movimiento, setMovimiento] = useState({
    fecha: "",
    tipo: "",
    origen: "",
    destino: "",
    observaciones: "",
  });

  useEffect(() => {

    if (movimientoInicial) {

      setMovimiento(movimientoInicial);

    } else {

      setMovimiento({
        fecha: "",
        tipo: "",
        origen: "",
        destino: "",
        observaciones: "",
      });

    }

  }, [movimientoInicial, open]);

  function cambiar(e) {

    setMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
    });

  }

  function guardar() {

    if (!movimiento.fecha || !movimiento.tipo) {

      alert("La fecha y el tipo son obligatorios.");

      return;

    }

    onGuardar(movimiento);

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        🚚 Registrar Movimiento
      </DialogTitle>

      <DialogContent>

        <Grid
  container
  spacing={2}
  sx={{ mt: 1 }}
>

          <Grid size={12}>

            <TextField
              fullWidth
              type="date"
              label="Fecha"
              name="fecha"
              value={movimiento.fecha}
              onChange={cambiar}
              InputLabelProps={{ shrink: true }}
            />

          </Grid>

          <Grid size={12}>

            <TextField
              select
              fullWidth
              label="Tipo"
              name="tipo"
              value={movimiento.tipo}
              onChange={cambiar}
            >

              {tiposMovimiento.map((tipo) => (

                <MenuItem
                  key={tipo}
                  value={tipo}
                >
                  {tipo}
                </MenuItem>

              ))}

            </TextField>

          </Grid>

          <Grid size={12}>

            <TextField
              fullWidth
              label="Origen"
              name="origen"
              value={movimiento.origen}
              onChange={cambiar}
            />

          </Grid>

          <Grid size={12}>

            <TextField
              fullWidth
              label="Destino"
              name="destino"
              value={movimiento.destino}
              onChange={cambiar}
            />

          </Grid>

          <Grid size={12}>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Observaciones"
              name="observaciones"
              value={movimiento.observaciones}
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

export default MovimientoDialog;