import diccionario from "./detectarColumnas";

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function esEncabezadoBasura(nombre) {
  if (!nombre) return true;

  if (nombre.includes(";")) {
    const partes = nombre
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean);

    if (partes.length > 5) {
      return true;
    }
  }

  return false;
}

export default function mapearColumnas(encabezados) {

  const resultado = {};

  encabezados.forEach((columna, indice) => {

    const nombre = normalizar(columna);

    // ← NUEVO
    if (esEncabezadoBasura(nombre)) {
      return;
    }

    Object.entries(diccionario).forEach(([campo, sinonimos]) => {

      const exacto = sinonimos.some(
        s => nombre === normalizar(s)
      );

      if (exacto) {
        resultado[campo] = indice;
        return;
      }

      if (campo === "peso") return;

      const parcial = sinonimos.some(
        s => nombre.includes(normalizar(s))
      );

      if (parcial) {
        resultado[campo] = indice;
      }

    });

  });

  return resultado;
}