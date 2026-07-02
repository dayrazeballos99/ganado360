import diccionario from "./detectarColumnas";

function normalizar(texto) {
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function mapearColumnas(encabezados) {
  const resultado = {};

  encabezados.forEach((columna, indice) => {
    const nombre = normalizar(columna);

    Object.entries(diccionario).forEach(([campo, sinonimos]) => {
      const encontrado = sinonimos.some((s) =>
        nombre.includes(normalizar(s))
      );

      if (encontrado) {
        resultado[campo] = indice;
      }
    });
  });

  return resultado;
}