export default function convertirFilas(filas, mapeo) {

  const animales = [];

  for (let i = 1; i < filas.length; i++) {

    const fila = filas[i];

    animales.push({

      rp: fila[mapeo.rp] || "",

      caravana: fila[mapeo.caravana] || "",

      nombre: fila[mapeo.nombre] || "",

      raza: fila[mapeo.raza] || "",

      sexo: fila[mapeo.sexo] || "",

      categoria: fila[mapeo.categoria] || "",

      lote: fila[mapeo.lote] || "",

      peso: fila[mapeo.peso] || "",

      estado: fila[mapeo.estado] || "Activo",

    });

  }

  return animales;

}