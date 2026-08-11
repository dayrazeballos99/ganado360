import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function obtenerResumenDashboard(loteId = "") {

  // =========================
  // LEER ANIMALES
  // =========================

  const snapshot = await getDocs(
    collection(db, "animales")
  );

  const animales = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));


  // =========================
  // FILTRAR POR LOTE
  // =========================

  const animalesFiltrados = loteId
    ? animales.filter(
        (animal) => animal.loteId === loteId
      )
    : animales;


  // =========================
  // LEER LOTES
  // =========================

  const snapshotLotes = await getDocs(
    collection(db, "lotes")
  );

  const lotes = snapshotLotes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));


  // =========================
  // ESTADOS
  // =========================

  const activos =
    animalesFiltrados.filter(
      (a) => a.estado === "Activo"
    ).length;

  const vendidos =
    animalesFiltrados.filter(
      (a) => a.estado === "Vendido"
    ).length;

  const muertos =
    animalesFiltrados.filter(
      (a) => a.estado === "Muerto"
    ).length;


  // =========================
  // SEXO
  // =========================

  const machos =
    animalesFiltrados.filter(
      (a) => a.sexo === "Macho"
    ).length;

  const hembras =
    animalesFiltrados.filter(
      (a) => a.sexo === "Hembra"
    ).length;


  // =========================
  // CATEGORÍAS
  // =========================

  const terneros =
    animalesFiltrados.filter(
      (a) => a.categoria === "Ternero"
    ).length;

  const vacas =
    animalesFiltrados.filter(
      (a) => a.categoria === "Vaca"
    ).length;

  const toros =
    animalesFiltrados.filter(
      (a) => a.categoria === "Toro"
    ).length;


  // =========================
  // ALERTAS
  // =========================

  const animalesSinPeso =
    animalesFiltrados.filter(
      (a) =>
        !a.peso ||
        Number(a.peso) <= 0
    ).length;


  // =========================
  // ANIMALES CON PESO
  // =========================

  const animalesConPeso =
    animalesFiltrados.filter(
      (a) =>
        a.peso &&
        Number(a.peso) > 0
    );


  // =========================
  // PESO PROMEDIO
  // =========================

  const pesoPromedio =
    animalesConPeso.length > 0
      ? (
          animalesConPeso.reduce(
            (suma, animal) =>
              suma + Number(animal.peso),
            0
          ) /
          animalesConPeso.length
        ).toFixed(1)
      : 0;


  // =========================
  // PESO TOTAL
  // =========================

  const pesoTotal =
    animalesConPeso.reduce(
      (suma, animal) =>
        suma + Number(animal.peso),
      0
    );


  // =========================
  // ANIMALES POR LOTE
  // =========================

  const lotesMap = {};

  animalesFiltrados.forEach((animal) => {

    if (!animal.loteId) return;

    if (!lotesMap[animal.loteId]) {
      lotesMap[animal.loteId] = 0;
    }

    lotesMap[animal.loteId]++;

  });


  const animalesPorLote =
    Object.entries(lotesMap).map(
      ([loteId, cantidad]) => {

        const lote =
          lotes.find(
            (l) => l.id === loteId
          );

        return {
          nombre:
            lote?.nombre ||
            "Sin nombre",
          cantidad,
        };

      }
    );


  // =========================
  // PESO PROMEDIO POR LOTE
  // =========================

  const pesoPorLoteMap = {};


  animalesFiltrados.forEach((animal) => {

    if (!animal.loteId) return;

    const peso =
      Number(animal.peso);


    if (
      !Number.isFinite(peso) ||
      peso <= 0
    ) {
      return;
    }


    if (!pesoPorLoteMap[animal.loteId]) {

      pesoPorLoteMap[animal.loteId] = {
        suma: 0,
        cantidad: 0,
      };

    }


    pesoPorLoteMap[animal.loteId].suma +=
      peso;

    pesoPorLoteMap[animal.loteId].cantidad +=
      1;

  });


  const pesoPorLote =
    Object.entries(
      pesoPorLoteMap
    ).map(
      ([loteId, datos]) => {

        const lote =
          lotes.find(
            (l) => l.id === loteId
          );


        const promedio =
          datos.suma /
          datos.cantidad;


        return {
          nombre:
            lote?.nombre ||
            "Sin nombre",

          pesoPromedio:
            Number(
              promedio.toFixed(1)
            ),
        };

      }
    );


  // =========================
  // DISTRIBUCIÓN DE PESOS
  // =========================

  const rangosPeso = [
    {
      nombre: "Menos de 300 kg",
      minimo: 0,
      maximo: 299.99,
    },
    {
      nombre: "300-350 kg",
      minimo: 300,
      maximo: 350,
    },
    {
      nombre: "351-400 kg",
      minimo: 351,
      maximo: 400,
    },
    {
      nombre: "401-450 kg",
      minimo: 401,
      maximo: 450,
    },
    {
      nombre: "451-500 kg",
      minimo: 451,
      maximo: 500,
    },
    {
      nombre: "501-550 kg",
      minimo: 501,
      maximo: 550,
    },
    {
      nombre: "551+ kg",
      minimo: 551,
      maximo: Infinity,
    },
  ];


  const pesoDistribucion =
    rangosPeso.map((rango) => {

      const cantidad =
        animalesConPeso.filter(
          (animal) => {

            const peso =
              Number(animal.peso);

            return (
              peso >= rango.minimo &&
              peso <= rango.maximo
            );

          }
        ).length;


      return {
  rango: rango.nombre,
  cantidad,
};

    });


  // =========================
  // CANTIDAD DE LOTES
  // =========================

  const cantidadLotes =
    lotes.length;


  // =========================
  // RESULTADO
  // =========================

  return {

    total:
      animalesFiltrados.length,

    activos,

    vendidos,

    muertos,

    machos,

    hembras,

    terneros,

    vacas,

    toros,

    alertas:
      animalesSinPeso,

    pesoPromedio,

    pesoTotal,

    cantidadLotes,

    animalesPorLote,

    pesoPorLote,

    pesoDistribucion,

  };

}