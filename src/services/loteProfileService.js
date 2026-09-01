import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


export async function obtenerResumenLote(loteId) {

  // =========================
  // OBTENER LOTE
  // =========================

  const loteDoc = await getDoc(
    doc(db, "lotes", loteId)
  );

  if (!loteDoc.exists()) {
    return null;
  }

  const lote = {
    id: loteDoc.id,
    ...loteDoc.data(),
  };


  // =========================
  // OBTENER ANIMALES
  // =========================

  const snapshot = await getDocs(
    collection(db, "animales")
  );

  const animales = snapshot.docs
    .map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }))
    .filter(
      (animal) => animal.loteId === loteId
    );


  const cantidadAnimales = animales.length;


  // =========================
  // PESOS
  // =========================

  const animalesConPeso = animales.filter(
    (animal) =>
      Number(animal.peso) > 0
  );


  const pesoTotal = animalesConPeso.reduce(
    (suma, animal) =>
      suma + Number(animal.peso),
    0
  );


  const pesoPromedio =
    animalesConPeso.length > 0
      ? (
          pesoTotal /
          animalesConPeso.length
        ).toFixed(1)
      : 0;


  // =========================
  // SEXO
  // =========================

  const machos = animales.filter(
    (animal) =>
      animal.sexo === "Macho"
  ).length;


  const hembras = animales.filter(
    (animal) =>
      animal.sexo === "Hembra"
  ).length;


  // =========================
  // ESTADO
  // =========================

  const activos = animales.filter(
    (animal) =>
      animal.estado === "Activo"
  ).length;


  const vendidos = animales.filter(
    (animal) =>
      animal.estado === "Vendido"
  ).length;


  const muertos = animales.filter(
    (animal) =>
      animal.estado === "Muerto"
  ).length;


  // =========================
  // CATEGORÍAS
  // =========================

  const categorias = {};

  animales.forEach((animal) => {

    const categoria =
      animal.categoria ||
      "Sin categoría";

    categorias[categoria] =
      (categorias[categoria] || 0) + 1;

  });


  const categoriasChart =
    Object.entries(categorias).map(
      ([nombre, cantidad]) => ({
        nombre,
        cantidad,
      })
    );


  // =========================
  // SANIDAD
  // =========================

  let cantidadTratamientos = 0;

  for (const animal of animales) {

    const sanidadSnapshot =
      await getDocs(
        collection(
          db,
          "animales",
          animal.id,
          "sanidad"
        )
      );

    cantidadTratamientos +=
      sanidadSnapshot.docs.length;

  }


  // =========================
  // ALIMENTACIÓN
  // =========================

  const alimentacionRef =
    collection(
      db,
      "lotes",
      loteId,
      "alimentacion"
    );


  const alimentacionSnapshot =
    await getDocs(alimentacionRef);


  const alimentaciones =
    alimentacionSnapshot.docs.map(
      (documento) => ({
        id: documento.id,
        ...documento.data(),
      })
    );


  const cantidadAlimentaciones =
    alimentaciones.length;


  // Ordenamos para encontrar
  // la alimentación más reciente

  alimentaciones.sort(
    (a, b) =>
      new Date(b.fecha) -
      new Date(a.fecha)
  );


  const ultimaAlimentacion =
    alimentaciones.length > 0
      ? alimentaciones[0]
      : null;


  // =========================
  // RETORNAR RESUMEN
  // =========================

  return {

    ...lote,

    // Animales
    cantidadAnimales,
    animales,

    // Pesos
    pesoPromedio,
    pesoTotal,

    // Sexo
    machos,
    hembras,

    // Estado
    activos,
    vendidos,
    muertos,

    // Categorías
    categoriasChart,

    // Sanidad
    cantidadTratamientos,

    // Alimentación
    cantidadAlimentaciones,
    ultimaAlimentacion,

  };

}