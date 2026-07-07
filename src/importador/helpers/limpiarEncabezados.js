export default function limpiarEncabezados(encabezados = []) {
  return encabezados.map((texto) => {
    if (texto == null) return "";

    return String(texto)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  });
}