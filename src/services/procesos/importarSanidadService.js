import {
  obtenerAnimalPorCaravana,
  obtenerAnimalPorRP,
} from "../animalService";

import {
  agregarTratamiento,
} from "../sanidadService";

export async function importarSanidad(registros) {

  let importados = 0;

  let noEncontrados = 0;

  for (const registro of registros) {

    let animal = null;

    // Buscar primero por caravana
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

    await agregarTratamiento(
      animal.id,
      {
        fecha:
          registro.fecha ||
          new Date().toISOString().slice(0, 10),

        tipo: registro.tipo,

        producto: registro.producto,

        laboratorio: registro.laboratorio,

        dosis: registro.dosis,

        unidad: registro.unidad,

        via: registro.via,

        responsable: registro.responsable,

        veterinario: registro.veterinario,

        diagnostico: registro.diagnostico,

        proximaDosis: registro.proximaDosis,

        retiro: registro.retiro,

        observaciones: registro.observaciones,
      }
    );

    importados++;

  }

  return {

    importados,

    noEncontrados,

  };

}