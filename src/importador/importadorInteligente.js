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

  const encabezados = filas[0];

  const mapeo = mapearColumnas(encabezados);

  const animales = convertirFilas(filas, mapeo);

  return {
    encabezados,
    filas,
    mapeo,
    animales,
  };

}