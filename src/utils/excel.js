import * as XLSX from "xlsx";

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

      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      resolve(json);
    };

    reader.readAsArrayBuffer(file);
  });
}