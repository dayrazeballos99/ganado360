import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function obtenerResumenDashboard(loteId = "") {

  // Leer animales
  const snapshot = await getDocs(collection(db, "animales"));

  const animales = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filtrar por lote
  const animalesFiltrados = loteId
    ? animales.filter((animal) => animal.loteId === loteId)
    : animales;

  // Leer lotes
  const snapshotLotes = await getDocs(collection(db, "lotes"));

  const lotes = snapshotLotes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Totales
  const activos = animalesFiltrados.filter(
    (a) => a.estado === "Activo"
  ).length;

  const vendidos = animalesFiltrados.filter(
    (a) => a.estado === "Vendido"
  ).length;

  const muertos = animalesFiltrados.filter(
    (a) => a.estado === "Muerto"
  ).length;

  // Sexo
  const machos = animalesFiltrados.filter(
    (a) => a.sexo === "Macho"
  ).length;

  const hembras = animalesFiltrados.filter(
    (a) => a.sexo === "Hembra"
  ).length;

  // Categorías
  const terneros = animalesFiltrados.filter(
    (a) => a.categoria === "Ternero"
  ).length;

  const vacas = animalesFiltrados.filter(
    (a) => a.categoria === "Vaca"
  ).length;

  const toros = animalesFiltrados.filter(
    (a) => a.categoria === "Toro"
  ).length;

  // Alertas
  const animalesSinPeso = animalesFiltrados.filter(
    (a) => !a.peso || Number(a.peso) <= 0
  ).length;

  // Animales con peso
  const animalesConPeso = animalesFiltrados.filter(
    (a) => a.peso && Number(a.peso) > 0
  );

  // Peso promedio
  const pesoPromedio =
    animalesConPeso.length > 0
      ? (
          animalesConPeso.reduce(
            (suma, animal) => suma + Number(animal.peso),
            0
          ) / animalesConPeso.length
        ).toFixed(1)
      : 0;

  // Peso total
  const pesoTotal = animalesConPeso.reduce(
    (suma, animal) => suma + Number(animal.peso),
    0
  );

  // Animales por lote
  const lotesMap = {};

  animalesFiltrados.forEach((animal) => {

    if (!animal.loteId) return;

    if (!lotesMap[animal.loteId]) {
      lotesMap[animal.loteId] = 0;
    }

    lotesMap[animal.loteId]++;
  });

  const animalesPorLote = Object.entries(lotesMap).map(
    ([loteId, cantidad]) => {

      const lote = lotes.find(
        (l) => l.id === loteId
      );

      return {
        nombre: lote?.nombre || "Sin nombre",
        cantidad,
      };
    }
  );

  // Cantidad de lotes
  const cantidadLotes = lotes.length;

  // Distribución de pesos
  const rangosPeso = [
    {
  rango: "Menos de 300 kg",
  min: 0,
  max: 299.99,
},
    {
      rango: "300-350 kg",
      min: 300,
      max: 350,
    },
    {
      rango: "351-400 kg",
      min: 351,
      max: 400,
    },
    {
      rango: "401-450 kg",
      min: 401,
      max: 450,
    },
    {
      rango: "451-500 kg",
      min: 451,
      max: 500,
    },
    {
      rango: "501-550 kg",
      min: 501,
      max: 550,
    },
    {
      rango: "551+ kg",
      min: 551,
      max: Infinity,
    },
  ];

  const pesoDistribucion = rangosPeso.map(
    ({ rango, min, max }) => {

      const cantidad = animalesConPeso.filter(
        (animal) => {

          const peso = Number(animal.peso);

          return peso >= min && peso <= max;
        }
      ).length;

      return {
        rango,
        cantidad,
      };
    }
  );

  return {
    total: animalesFiltrados.length,

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
    pesoTotal,

    cantidadLotes,

    animalesPorLote,

    pesoDistribucion,
  };
}