import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { obtenerAnimales } from "../services/animalService";

function AnimalAutocomplete({
  value,
  onChange,
  label = "Animal",
}) {
  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    cargarAnimales();
  }, []);

  async function cargarAnimales() {
    const datos = await obtenerAnimales();
    setAnimales(datos);
  }

  return (
    <Autocomplete
      options={animales}
      value={value}
      onChange={(event, nuevoValor) => onChange(nuevoValor)}
      getOptionLabel={(animal) =>
        `${animal.rp || ""} - ${animal.caravana || ""} - ${animal.nombre || ""}`
      }
      isOptionEqualToValue={(option, value) =>
        option.id === value?.id
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
        />
      )}
    />
  );
}

export default AnimalAutocomplete;