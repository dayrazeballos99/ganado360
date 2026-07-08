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

import {
  agregarAnimal,
  editarAnimal,
} from "../services/animalService";

import razas from "../data/razas";
import sexos from "../data/sexos";
import categorias from "../data/categorias";
import estados from "../data/estados";

const animalVacio = {
  rp: "",
  caravana: "",
  nombre: "",
  raza: "",
  sexo: "",
  categoria: "",
  estado: "Activo",
  fechaNacimiento: "",
  lote: "",
  peso: "",
  observaciones: "",
};

function AnimalDialog({
  open,
  onClose,
  onAnimalAdded,
  animalSeleccionado,
}) {

  const [animal, setAnimal] = useState(animalVacio);

  useEffect(() => {

    if (animalSeleccionado) {
      setAnimal(animalSeleccionado);
    } else {
      setAnimal(animalVacio);
    }

  }, [animalSeleccionado, open]);

  function cambiarValor(e) {

    setAnimal({
      ...animal,
      [e.target.name]: e.target.value,
    });

  }

  async function guardar() {

    if (!animal.rp && !animal.caravana) {
  alert("Debe ingresar al menos un identificador (RP o Caravana).");
  return;
}

    if (animal.id) {

      const { id, ...datos } = animal;

      await editarAnimal(id, datos);

    } else {

      await agregarAnimal(animal);

    }

    onAnimalAdded();

    onClose();

    setAnimal(animalVacio);

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        {animal.id ? "✏️ Editar Animal" : "🐄 Nuevo Animal"}
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
            <TextField
              fullWidth
              label="RP"
              name="rp"
              value={animal.rp}
              onChange={cambiarValor}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Caravana"
              name="caravana"
              value={animal.caravana}
              onChange={cambiarValor}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={animal.nombre}
              onChange={cambiarValor}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Raza"
              name="raza"
              value={animal.raza}
              onChange={cambiarValor}
            >
              {razas.map((raza) => (
                <MenuItem key={raza} value={raza}>
                  {raza}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Sexo"
              name="sexo"
              value={animal.sexo}
              onChange={cambiarValor}
            >
              {sexos.map((sexo) => (
                <MenuItem key={sexo} value={sexo}>
                  {sexo}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Categoría"
              name="categoria"
              value={animal.categoria}
              onChange={cambiarValor}
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria} value={categoria}>
                  {categoria}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Estado"
              name="estado"
              value={animal.estado}
              onChange={cambiarValor}
            >
              {estados.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de nacimiento"
              name="fechaNacimiento"
              value={animal.fechaNacimiento}
              onChange={cambiarValor}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Lote"
              name="lote"
              value={animal.lote}
              onChange={cambiarValor}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Peso (kg)"
              name="peso"
              value={animal.peso}
              onChange={cambiarValor}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Observaciones"
              name="observaciones"
              value={animal.observaciones}
              onChange={cambiarValor}
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
          {animal.id ? "Actualizar" : "Guardar"}
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default AnimalDialog;