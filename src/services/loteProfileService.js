import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function obtenerResumenLote(loteId) {

  // Obtener lote
  const loteDoc = await getDoc(doc(db, "lotes", loteId));

  if (!loteDoc.exists()) {
    return null;
  }

  const lote = {
    id: loteDoc.id,
    ...loteDoc.data(),
  };

  // Obtener animales
  const snapshot = await getDocs(collection(db, "animales"));

  const animales = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((animal) => animal.loteId === loteId);

  const cantidadAnimales = animales.length;

  const animalesConPeso = animales.filter(
    (a) => Number(a.peso) > 0
  );

  const pesoTotal = animalesConPeso.reduce(
    (suma, animal) => suma + Number(animal.peso),
    0
  );

  const pesoPromedio =
    animalesConPeso.length > 0
      ? (pesoTotal / animalesConPeso.length).toFixed(1)
      : 0;

  // Sexo
  const machos = animales.filter(
    (a) => a.sexo === "Macho"
  ).length;

  const hembras = animales.filter(
    (a) => a.sexo === "Hembra"
  ).length;

  // Estado
  const activos = animales.filter(
    (a) => a.estado === "Activo"
  ).length;

  const vendidos = animales.filter(
    (a) => a.estado === "Vendido"
  ).length;

  const muertos = animales.filter(
    (a) => a.estado === "Muerto"
  ).length;

  // Categorías
  const categorias = {};

  animales.forEach((animal) => {

    const categoria = animal.categoria || "Sin categoría";

    categorias[categoria] =
      (categorias[categoria] || 0) + 1;

  });

  const categoriasChart = Object.entries(categorias).map(
    ([nombre, cantidad]) => ({
      nombre,
      cantidad,
    })
  );

  return {

    ...lote,

    cantidadAnimales,

    pesoPromedio,

    pesoTotal,

    animales,

    machos,

    hembras,

    activos,

    vendidos,

    muertos,

    categoriasChart,

  };

}