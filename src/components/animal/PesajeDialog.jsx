import {
  useEffect,
  useState,
} from "react";

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


function PesajeDialog({
  open,
  onClose,
  onGuardar,
  pesajeInicial = null,
}) {

  const [pesaje, setPesaje] =
    useState({
      fecha: "",
      tipo: "Control",
      peso: "",
      responsable: "",
      observaciones: "",
    });


  useEffect(() => {

    if (pesajeInicial) {

      setPesaje({
        fecha:
          pesajeInicial.fecha || "",

        tipo:
          pesajeInicial.tipo ||
          "Control",

        peso:
          pesajeInicial.peso || "",

        responsable:
          pesajeInicial.responsable ||
          "",

        observaciones:
          pesajeInicial.observaciones ||
          "",
      });

    } else {

      setPesaje({
        fecha: "",
        tipo: "Control",
        peso: "",
        responsable: "",
        observaciones: "",
      });

    }

  }, [
    pesajeInicial,
    open,
  ]);


  function cambiar(e) {

    setPesaje({
      ...pesaje,
      [e.target.name]:
        e.target.value,
    });

  }


  function guardar() {

    if (
      !pesaje.fecha ||
      !pesaje.peso
    ) {

      alert(
        "La fecha y el peso son obligatorios."
      );

      return;
    }


    onGuardar(pesaje);

  }


  const modoEdicion =
    Boolean(pesajeInicial);


  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>

        {modoEdicion
          ? "✏️ Editar Pesaje"
          : "⚖️ Nuevo Pesaje"}

      </DialogTitle>


      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              type="date"
              name="fecha"
              label="Fecha"
              InputLabelProps={{
                shrink: true,
              }}
              value={pesaje.fecha}
              onChange={cambiar}
            />

          </Grid>


          <Grid size={{ xs: 12 }}>

            <TextField
              select
              fullWidth
              name="tipo"
              label="Tipo de pesaje"
              value={pesaje.tipo}
              onChange={cambiar}
            >

              {tiposPesaje.map(
                (tipo) => (

                  <MenuItem
                    key={tipo}
                    value={tipo}
                  >
                    {tipo}
                  </MenuItem>

                )
              )}

            </TextField>

          </Grid>


          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              type="number"
              name="peso"
              label="Peso (kg)"
              value={pesaje.peso}
              onChange={cambiar}
              inputProps={{
                min: 0,
              }}
            />

          </Grid>


          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              name="responsable"
              label="Responsable"
              value={
                pesaje.responsable
              }
              onChange={cambiar}
            />

          </Grid>


          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              multiline
              rows={3}
              name="observaciones"
              label="Observaciones"
              value={
                pesaje.observaciones
              }
              onChange={cambiar}
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
          {modoEdicion
            ? "Guardar cambios"
            : "Guardar"}
        </Button>

      </DialogActions>

    </Dialog>

  );
}


export default PesajeDialog;