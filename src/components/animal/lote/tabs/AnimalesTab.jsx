import { useMemo, useState } from "react";

import {
  Box,
  TextField,
  Typography,
} from "@mui/material";

import AnimalTable from "../../../AnimalTable";

export default function AnimalesTab({ animales }) {

  const [buscar, setBuscar] = useState("");

  const animalesFiltrados = useMemo(() => {

    const texto = buscar.toLowerCase();

    return animales.filter((animal) =>

      String(animal.rp || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(animal.caravana || "")
        .toLowerCase()
        .includes(texto)

      ||

      String(animal.nombre || "")
        .toLowerCase()
        .includes(texto)

    );

  }, [animales, buscar]);

  return (

    <Box>

      <TextField
        fullWidth
        label="🔍 Buscar por RP, Caravana o Nombre"
        value={buscar}
        onChange={(e) =>
          setBuscar(e.target.value)
        }
        sx={{ mb: 3 }}
      />

      <Typography sx={{ mb: 2 }}>

        Animales encontrados:{" "}
        <b>{animalesFiltrados.length}</b>

      </Typography>

      <AnimalTable
        animales={animalesFiltrados}
        onDelete={() => {}}
        onEdit={() => {}}
        onView={() => {}}
      />

    </Box>

  );

}