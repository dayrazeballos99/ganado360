import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

const loteInicial = {
  nombre: "",
  tipo: "Corral",
  capacidad: "",
  observaciones: "",
  estado: "Activo",
};

export default function LoteDialog({
  open,
  onClose,
  onGuardar,
  lote,
}) {

  const [datos, setDatos] = useState(loteInicial);

  useEffect(() => {
    if (lote) {
      setDatos(lote);
    } else {
      setDatos(loteInicial);
    }
  }, [lote]);

  function cambiar(e) {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  }

  function guardar() {
    onGuardar(datos);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        📦 Nuevo Lote
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 1 }}>

          <TextField
            label="Nombre"
            name="nombre"
            value={datos.nombre}
            onChange={cambiar}
            fullWidth
          />

          <TextField
            select
            label="Tipo"
            name="tipo"
            value={datos.tipo}
            onChange={cambiar}
            fullWidth
          >
            <MenuItem value="Corral">
              Corral
            </MenuItem>

            <MenuItem value="Pastura">
              Pastura
            </MenuItem>

            <MenuItem value="Hospital">
              Hospital
            </MenuItem>
          </TextField>

          <TextField
            label="Capacidad"
            name="capacidad"
            type="number"
            value={datos.capacidad}
            onChange={cambiar}
            fullWidth
          />

          <TextField
            label="Observaciones"
            name="observaciones"
            multiline
            rows={3}
            value={datos.observaciones}
            onChange={cambiar}
            fullWidth
          />

        </Stack>

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