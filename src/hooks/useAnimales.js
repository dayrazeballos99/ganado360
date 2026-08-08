import { useEffect, useState } from "react";

import { obtenerAnimales } from "../services/animalService";
import { obtenerLotes } from "../services/loteService";

export default function useAnimales() {

  const [animales, setAnimales] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    cargar();

  }, []);

  async function cargar() {

    setCargando(true);

    const [
      animalesDB,
      lotesDB,
    ] = await Promise.all([
      obtenerAnimales(),
      obtenerLotes(),
    ]);

    const mapaLotes = {};

    lotesDB.forEach((lote) => {

      mapaLotes[lote.id] = lote.nombre;

    });

    const animalesCompletos = animalesDB.map((animal) => ({

      ...animal,

      loteNombre:
        mapaLotes[animal.loteId] || "-",

    }));

    setAnimales(animalesCompletos);

    setCargando(false);

  }

  return {

    animales,
    cargando,
    recargar: cargar,

  };

}