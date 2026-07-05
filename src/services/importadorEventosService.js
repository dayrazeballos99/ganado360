export function detectarTipoEvento(nombreArchivo) {

  const nombre = nombreArchivo.toLowerCase();

  if (nombre.includes("ingreso")) {
    return "Ingreso";
  }

  if (nombre.includes("salida")) {
    return "Salida";
  }

  if (nombre.includes("venta")) {
    return "Venta";
  }

  if (nombre.includes("pesaje")) {
    return "Pesaje";
  }

  return "Desconocido";

}