import { importarIngreso } from "../services/procesos/importarIngresoService";
import { importarPesajes } from "../services/procesos/importarPesajesService";

export async function ejecutarProceso(tipoArchivo, datos) {

  switch (tipoArchivo) {

    case "INGRESO":
      return await importarIngreso(datos.animales);

    case "PESAJES":
      return await importarPesajes(datos.animales);

    case "SANIDAD":
      console.log("Proceso de sanidad pendiente.");
      return;

    case "SALIDA":
      console.log("Proceso de salida pendiente.");
      return;

    default:
      throw new Error(
        "Tipo de archivo no reconocido."
      );

  }

}