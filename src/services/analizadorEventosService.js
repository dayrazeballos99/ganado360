import { detectarTipoEvento } from "./importadorEventosService";

export function analizarEvento(nombreArchivo, filas = []) {

  const tipo = detectarTipoEvento(nombreArchivo);

  return {

    tipo,

    nombreArchivo,

    cantidad: filas.length > 0 ? filas.length - 1 : 0,

    fecha: null,

    errores: [],

    advertencias: [],

  };

}