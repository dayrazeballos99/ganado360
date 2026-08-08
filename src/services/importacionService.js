import { buscarAnimalPorIdentificador } from "./animalService";

export async function analizarPesajes(datos, columnas) {
  let encontrados = 0;
  let noEncontrados = 0;
  let errores = 0;

  const detalle = [];

  for (let i = 0; i < datos.length; i++) {
    const fila = datos[i];

    try {
      let animal = null;
      let identificador = "";

      // Buscar usando cualquier identificador disponible

const posiblesIdentificadores = [
  columnas.rp,
  columnas.caravana,
  columnas.identificador,
];

for (const columna of posiblesIdentificadores) {
  if (!columna) continue;

  const valor = fila[columna];

  if (!valor) continue;

  identificador = valor;

  animal = await buscarAnimalPorIdentificador(valor);

  if (animal) break;
}

      if (animal) {
        encontrados++;

        detalle.push({
          fila: i + 1,
          estado: "ok",
          identificador,
          animal,
          peso: columnas.peso
            ? fila[columnas.peso]
            : "",
          fecha: columnas.fecha
            ? fila[columnas.fecha]
            : "",
          mensaje: "Se importará",
        });

      } else {

        noEncontrados++;

        detalle.push({
          fila: i + 1,
          estado: "error",
          identificador,
          animal: null,
          peso: columnas.peso
            ? fila[columnas.peso]
            : "",
          fecha: columnas.fecha
            ? fila[columnas.fecha]
            : "",
          mensaje: "Animal no encontrado",
        });

      }

    } catch (error) {

      console.error(error);

      errores++;

      detalle.push({
        fila: i + 1,
        estado: "error",
        identificador: "",
        animal: null,
        peso: "",
        fecha: "",
        mensaje: "Error al analizar",
      });

    }
  }

  return {
    total: datos.length,
    encontrados,
    noEncontrados,
    errores,
    detalle,
  };
}