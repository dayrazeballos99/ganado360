export default function detectarTipoArchivo(encabezados = []) {

  const columnas = encabezados.map((c) =>
    String(c).toLowerCase().trim()
  );

  // ==========================
  // PESAJES (primero)
  // ==========================

  if (
    (columnas.includes("ide") ||
      columnas.includes("eid") ||
      columnas.includes("rfid")) &&
    columnas.includes("peso")
  ) {
    return "PESAJES";
  }

  // ==========================
  // SANIDAD
  // ==========================

  if (
    columnas.includes("tratamiento") ||
    columnas.includes("medicamento") ||
    columnas.includes("droga")
  ) {
    return "SANIDAD";
  }

  // ==========================
  // TOROS
  // ==========================

  if (
    columnas.includes("circunferencia escrotal")
  ) {
    return "TOROS";
  }

  // ==========================
  // INGRESO
  // ==========================

  if (
    columnas.includes("rp") &&
    columnas.includes("peso")
  ) {
    return "INGRESO";
  }

  return "DESCONOCIDO";

}