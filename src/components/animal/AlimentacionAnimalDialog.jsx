import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";

export default function AlimentacionAnimalDialog({
  open,
  alimentacionInicial,
  onClose,
  onGuardar,
}) {
  const [alimentacion, setAlimentacion] = useState({
    fecha: "",
    tipo: "",
    alimento: "",
    cantidad: "",
    unidad: "kg",
    responsable: "",
    observaciones: "",
  });

  useEffect(() => {
    if (alimentacionInicial) {
      setAlimentacion({
        fecha: alimentacionInicial.fecha || "",
        tipo: alimentacionInicial.tipo || "",
        alimento: alimentacionInicial.alimento || "",
        cantidad: alimentacionInicial.cantidad || "",
        unidad: alimentacionInicial.unidad || "kg",
        responsable: alimentacionInicial.responsable || "",
        observaciones:
          alimentacionInicial.observaciones || "",
      });
    } else {
      setAlimentacion({
        fecha: "",
        tipo: "",
        alimento: "",
        cantidad: "",
        unidad: "kg",
        responsable: "",
        observaciones: "",
      });
    }
  }, [alimentacionInicial, open]);

  function cambiarCampo(campo, valor) {
    setAlimentacion({
      ...alimentacion,
      [campo]: valor,
    });
  }

  function guardar() {
    if (
      !alimentacion.fecha ||
      !alimentacion.tipo ||
      !alimentacion.alimento
    ) {
      alert(
        "Completá al menos la fecha, el tipo y el alimento."
      );

      return;
    }

    onGuardar({
      ...alimentacion,
      cantidad:
        alimentacion.cantidad === ""
          ? 0
          : Number(alimentacion.cantidad),
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        🌾 {alimentacionInicial
          ? "Editar alimentación"
          : "Registrar alimentación"}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 0.5 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Fecha"
              type="date"
              value={alimentacion.fecha}
              onChange={(e) =>
                cambiarCampo(
                  "fecha",
                  e.target.value
                )
              }
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Tipo de alimentación"
              value={alimentacion.tipo}
              onChange={(e) =>
                cambiarCampo(
                  "tipo",
                  e.target.value
                )
              }
              fullWidth
              required
            >
              <MenuItem value="Forraje">
                Forraje
              </MenuItem>

              <MenuItem value="Balanceado">
                Balanceado
              </MenuItem>

              <MenuItem value="Grano">
                Grano
              </MenuItem>

              <MenuItem value="Suplemento">
                Suplemento
              </MenuItem>

              <MenuItem value="Otro">
                Otro
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Alimento / producto"
              value={alimentacion.alimento}
              onChange={(e) =>
                cambiarCampo(
                  "alimento",
                  e.target.value
                )
              }
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Cantidad"
              type="number"
              value={alimentacion.cantidad}
              onChange={(e) =>
                cambiarCampo(
                  "cantidad",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              label="Unidad"
              value={alimentacion.unidad}
              onChange={(e) =>
                cambiarCampo(
                  "unidad",
                  e.target.value
                )
              }
              fullWidth
            >
              <MenuItem value="kg">
                kg
              </MenuItem>

              <MenuItem value="g">
                g
              </MenuItem>

              <MenuItem value="litros">
                Litros
              </MenuItem>

              <MenuItem value="unidades">
                Unidades
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Responsable"
              value={alimentacion.responsable}
              onChange={(e) =>
                cambiarCampo(
                  "responsable",
                  e.target.value
                )
              }
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Observaciones"
              value={alimentacion.observaciones}
              onChange={(e) =>
                cambiarCampo(
                  "observaciones",
                  e.target.value
                )
              }
              fullWidth
              multiline
              rows={3}
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