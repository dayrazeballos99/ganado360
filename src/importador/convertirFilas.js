export default function convertirFilas(
  filas,
  mapeo,
  tipoArchivo = "INGRESO"
) {

  const datos = [];

  for (let i = 1; i < filas.length; i++) {

    const fila = filas[i];

    switch (tipoArchivo) {

      // ==================================
      // INGRESO DE ANIMALES
      // ==================================

      case "INGRESO":

        datos.push({

          rp: fila[mapeo.rp] || "",

          caravana: fila[mapeo.caravana] || "",

          nombre: fila[mapeo.nombre] || "",

          raza: fila[mapeo.raza] || "",

          sexo: fila[mapeo.sexo] || "",

          categoria: fila[mapeo.categoria] || "",

          loteId: "",

          peso:
            fila[mapeo.peso] !== undefined &&
            fila[mapeo.peso] !== ""
              ? Number(
                  String(fila[mapeo.peso])
                    .replace(",", ".")
                    .trim()
                )
              : null,

          estado:
            fila[mapeo.estado] || "Activo",

        });

        break;

      // ==================================
      // PESAJES
      // ==================================

      case "PESAJES":

        datos.push({

          rp: fila[mapeo.rp] || "",

          caravana:
            fila[mapeo.caravana] || "",

          fecha:
            fila[mapeo.fecha] || "",

          hora:
            fila[mapeo.hora] || "",

          peso:
            fila[mapeo.peso] !== undefined &&
            fila[mapeo.peso] !== ""
              ? Number(
                  String(fila[mapeo.peso])
                    .replace(",", ".")
                    .trim()
                )
              : null,

        });

        break;

      default:

        break;

    }

  }

  return datos;

}