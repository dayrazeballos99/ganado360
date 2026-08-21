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

  XLSX.utils.book_append_sheet(
    libro,
    hoja,
    "Animales"
  );

  XLSX.writeFile(
    libro,
    "Animales.xlsx"
  );
}


// Convierte una fecha de Excel a YYYY-MM-DD
function convertirFechaExcel(valor) {

  // Si ya es una fecha real
  if (valor instanceof Date) {

    const año = valor.getFullYear();
    const mes = String(
      valor.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
      valor.getDate()
    ).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  }


  // Si Excel entrega un número serial
  if (
    typeof valor === "number" &&
    Number.isFinite(valor)
  ) {

    const fecha =
      XLSX.SSF.parse_date_code(valor);

    if (!fecha) {
      return valor;
    }

    const año = fecha.y;

    const mes = String(
      fecha.m
    ).padStart(2, "0");

    const dia = String(
      fecha.d
    ).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
  }


  // Si ya viene como texto
  if (typeof valor === "string") {

    const texto = valor.trim();

    if (!texto) {
      return "";
    }

    // dd/mm/yyyy
    const partes = texto.split("/");

    if (partes.length === 3) {

      const dia = partes[0].padStart(2, "0");
      const mes = partes[1].padStart(2, "0");
      const año = partes[2];

      if (
        año.length === 4 &&
        !isNaN(Number(dia)) &&
        !isNaN(Number(mes)) &&
        !isNaN(Number(año))
      ) {

        return `${año}-${mes}-${dia}`;
      }
    }

    // Si ya viene en formato YYYY-MM-DD
    if (
      /^\d{4}-\d{2}-\d{2}$/.test(texto)
    ) {
      return texto;
    }

    return texto;
  }


  return valor;
}


export function importarExcel(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();


    reader.onload = (e) => {

      try {

        const data =
          new Uint8Array(
            e.target.result
          );


        const workbook =
          XLSX.read(data, {
            type: "array",
            cellDates: true,
          });


        const hoja =
          workbook.Sheets[
            workbook.SheetNames[0]
          ];


        const datos =
          XLSX.utils.sheet_to_json(
            hoja
          );


        const encabezados =
          Object.keys(
            datos[0] || {}
          );


        const columnas =
          detectarColumnas(
            encabezados
          );


        // Convertir automáticamente
        // la columna de fecha
        if (columnas.fecha) {

          datos.forEach((fila) => {

            const valor =
              fila[columnas.fecha];

            fila[columnas.fecha] =
              convertirFechaExcel(
                valor
              );

          });

        }


        resolve({
          datos,
          columnas,
        });

      } catch (error) {

        reject(error);

      }

    };


    reader.onerror = () => {

      reject(
        new Error(
          "No se pudo leer el archivo Excel."
        )
      );

    };


    reader.readAsArrayBuffer(file);

  });

}