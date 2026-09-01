import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";


function ReproduccionDialog({
  open,
  eventoInicial,
  onClose,
  onGuardar,
}) {

  const [evento, setEvento] = useState({
    fecha: "",
    tipo: "",
    reproductor: "",
    metodo: "",
    proximoControl: "",
    observaciones: "",
  });


  useEffect(() => {

    if (eventoInicial) {

      setEvento({
        fecha: eventoInicial.fecha || "",
        tipo: eventoInicial.tipo || "",
        reproductor:
          eventoInicial.reproductor || "",
        metodo:
          eventoInicial.metodo || "",
        proximoControl:
          eventoInicial.proximoControl || "",
        observaciones:
          eventoInicial.observaciones || "",
      });

    } else {

      setEvento({
        fecha: "",
        tipo: "",
        reproductor: "",
        metodo: "",
        proximoControl: "",
        observaciones: "",
      });

    }

  }, [eventoInicial, open]);


  function cambiar(campo, valor) {

    setEvento({
      ...evento,
      [campo]: valor,
    });

  }


  function guardar() {

    if (!evento.fecha || !evento.tipo) {
      return;
    }

    onGuardar(evento);

  }


  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        🐄 Registrar evento reproductivo
      </DialogTitle>


      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="Fecha"
              type="date"
              value={evento.fecha}
              onChange={(e) =>
                cambiar(
                  "fecha",
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

          </Grid>


          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              select
              fullWidth
              label="Tipo de evento"
              value={evento.tipo}
              onChange={(e) =>
                cambiar(
                  "tipo",
                  e.target.value
                )
              }
              required
            >

              <MenuItem value="Servicio">
                Servicio
              </MenuItem>

              <MenuItem value="Inseminación">
                Inseminación
              </MenuItem>

              <MenuItem value="Diagnóstico de preñez">
                Diagnóstico de preñez
              </MenuItem>

              <MenuItem value="Parto">
                Parto
              </MenuItem>

              <MenuItem value="Aborto">
                Aborto
              </MenuItem>

              <MenuItem value="Otro">
                Otro
              </MenuItem>

            </TextField>

          </Grid>


          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="Toro / reproductor"
              value={evento.reproductor}
              onChange={(e) =>
                cambiar(
                  "reproductor",
                  e.target.value
                )
              }
            />

          </Grid>


          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              select
              fullWidth
              label="Método"
              value={evento.metodo}
              onChange={(e) =>
                cambiar(
                  "metodo",
                  e.target.value
                )
              }
            >

              <MenuItem value="">
                No especificado
              </MenuItem>

              <MenuItem value="Monta natural">
                Monta natural
              </MenuItem>

              <MenuItem value="Inseminación artificial">
                Inseminación artificial
              </MenuItem>

              <MenuItem value="Transferencia embrionaria">
                Transferencia embrionaria
              </MenuItem>

            </TextField>

          </Grid>


          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="Próximo control"
              type="date"
              value={evento.proximoControl}
              onChange={(e) =>
                cambiar(
                  "proximoControl",
                  e.target.value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

          </Grid>


          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Observaciones"
              value={evento.observaciones}
              onChange={(e) =>
                cambiar(
                  "observaciones",
                  e.target.value
                )
              }
            />

          </Grid>

        </Grid>

      </DialogContent>


      <DialogActions>

        <Button
          onClick={onClose}
        >
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


export default ReproduccionDialog;