import * as XLSX from "xlsx";
import { detectarColumnas } from "../importador/detectarColumnas";

export function exportarExcel(animales) {
  const datos = animales.map((a) => ({
    RP: a.rp,
    Caravana: a.caravana,
    Nombre: a.nombre,
    Raza: a.raza,
    Sexo: a.sexo,
    Peso: a.peso,
    Estado: a.estado,
    Categoria: a.categoria,
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, "Animales");

  XLSX.writeFile(libro, "Animales.xlsx");
}

export function importarExcel(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const hoja = workbook.Sheets[workbook.SheetNames[0]];

      const datos = XLSX.utils.sheet_to_json(hoja);

      const columnas = detectarColumnas(
        Object.keys(datos[0] || {})
      );

      resolve({
        datos,
        columnas,
      });
    };

    reader.readAsArrayBuffer(file);
  });
}