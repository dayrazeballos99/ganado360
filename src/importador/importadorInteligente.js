import limpiarEncabezados from "./helpers/limpiarEncabezados";
import * as XLSX from "xlsx";
import mapearColumnas from "./mapearColumnas";
import convertirFilas from "./convertirFilas";

export async function analizarExcel(file) {

  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const filas = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
  });

  const encabezados = limpiarEncabezados(filas[0]);

console.log("Encabezados RAW:", encabezados);
console.log("Cantidad:", encabezados.length);
console.table(encabezados);

  const mapeo = mapearColumnas(encabezados);

  const animales = convertirFilas(filas, mapeo);

  const pesos = animales
  .map((a) => Number(a.peso))
  .filter((p) => !isNaN(p) && p > 0);

const resumen = {

  cantidad: animales.length,

  pesoPromedio: pesos.length
    ? (
        pesos.reduce((a, b) => a + b, 0) /
        pesos.length
      ).toFixed(1)
    : 0,

  pesoMinimo: pesos.length
    ? Math.min(...pesos)
    : 0,

  pesoMaximo: pesos.length
    ? Math.max(...pesos)
    : 0,

};
console.log(animales.slice(0, 10));
console.log("Encabezados:", encabezados);
console.log("Mapeo:", mapeo);
console.log("Primer animal:", animales[0]);
  return {

  encabezados,

  filas,

  mapeo,

  animales,

  resumen,

};

}