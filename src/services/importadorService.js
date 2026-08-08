import {
  agregarPesaje,
  existePesaje,
} from "./pesajeService";

import {
  actualizarPesoActual,
  actualizarLoteAnimal,
} from "./animalService";

export async function importarPesajes(
  detalle,
  loteId
)
 {

  let importados = 0;
  let duplicados = 0;
  let errores = 0;

  for (const registro of detalle) {

    try {

      // Solo importar registros válidos
      if (registro.estado !== "ok") {
        continue;
      }

      // Verificar si el pesaje ya existe
      const yaExiste = await existePesaje(
        registro.animal.id,
        registro.fecha,
        registro.peso
      );

      if (yaExiste) {
        duplicados++;
        continue;
      }

      // Guardar el nuevo pesaje
      await agregarPesaje(
        registro.animal.id,
        {
          fecha: registro.fecha,
          peso: registro.peso,
        }
      );

      // Actualizar el peso actual
      await actualizarPesoActual(
  registro.animal.id,
  registro.peso
);

if (loteId) {

  await actualizarLoteAnimal(
    registro.animal.id,
    loteId
  );

}

      importados++;

    } catch (error) {

      console.error("Error importando pesaje:", error);
      errores++;

    }

  }

  return {
    importados,
    duplicados,
    errores,
  };

}