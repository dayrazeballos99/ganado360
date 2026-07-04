import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function obtenerResumenDashboard() {

  const snapshot = await getDocs(collection(db, "animales"));

  const animales = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Totales
  const activos = animales.filter(
    (a) => a.estado === "Activo"
  ).length;

  const vendidos = animales.filter(
    (a) => a.estado === "Vendido"
  ).length;

  const muertos = animales.filter(
    (a) => a.estado === "Muerto"
  ).length;

  // Sexo
  const machos = animales.filter(
    (a) => a.sexo === "Macho"
  ).length;

  const hembras = animales.filter(
    (a) => a.sexo === "Hembra"
  ).length;

  // Categorías
  const terneros = animales.filter(
    (a) => a.categoria === "Ternero"
  ).length;

  const vacas = animales.filter(
    (a) => a.categoria === "Vaca"
  ).length;

  const toros = animales.filter(
    (a) => a.categoria === "Toro"
  ).length;

  // Alertas
  const animalesSinPeso = animales.filter(
    (a) => !a.peso || Number(a.peso) <= 0
  ).length;

  // Peso promedio
  const animalesConPeso = animales.filter(
    (a) => a.peso && Number(a.peso) > 0
  );

  const pesoPromedio =
    animalesConPeso.length > 0
      ? (
          animalesConPeso.reduce(
            (suma, animal) => suma + Number(animal.peso),
            0
          ) / animalesConPeso.length
        ).toFixed(1)
      : 0;

  return {
    total: animales.length,
    activos,
    vendidos,
    muertos,

    machos,
    hembras,

    terneros,
    vacas,
    toros,

    alertas: animalesSinPeso,

    pesoPromedio,
  };

}