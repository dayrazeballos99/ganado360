export default function detectarTipoArchivo(encabezados = []) {

  const columnas = encabezados.map((c) =>
    String(c).toLowerCase().trim()
  );

  // PESAJES (Gallagher)
  if (
    columnas.includes("peso") &&
    (columnas.includes("rp") ||
      columnas.includes("caravana"))
  ) {
    return "PESAJES";
  }

  // SANIDAD
  if (
    columnas.includes("producto") ||
    columnas.includes("medicamento") ||
    columnas.includes("vacuna") ||
    columnas.includes("tratamiento")
  ) {
    return "SANIDAD";
  }

  // INGRESO
  return "INGRESO";

}