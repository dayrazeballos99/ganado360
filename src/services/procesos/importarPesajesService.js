import {
  obtenerAnimalPorCaravana,
  obtenerAnimalPorRP,
  actualizarPesoActual,
} from "../animalService";

import {
  agregarPesaje,
} from "../pesajeService";

export async function importarPesajes(registros) {

  let importados = 0;

  let noEncontrados = 0;

  for (const registro of registros) {

    let animal = null;

    // Buscar primero por caravana (IDE)
    if (registro.caravana) {

      animal = await obtenerAnimalPorCaravana(
        registro.caravana
      );

    }

    // Si no existe, buscar por RP
    if (!animal && registro.rp) {

      animal = await obtenerAnimalPorRP(
        registro.rp
      );

    }

    if (!animal) {

      noEncontrados++;

      continue;

    }

    await agregarPesaje(animal.id, {

      fecha:
        registro.fecha ||
        new Date().toISOString().slice(0, 10),

      peso: Number(registro.peso),

      tipo: "Importado",

    });

    await actualizarPesoActual(
      animal.id,
      Number(registro.peso)
    );

    importados++;

  }

  return {

    importados,

    noEncontrados,

  };

}