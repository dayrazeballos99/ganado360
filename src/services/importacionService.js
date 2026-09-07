import {
  buscarAnimalPorIdentificador,
  agregarAnimal,
} from "./animalService";


// ========================================
// ANALIZAR IMPORTACIÓN DE PESAJES
// ========================================

export async function analizarPesajes(
  datos,
  columnas
) {

  let encontrados = 0;
  let noEncontrados = 0;
  let errores = 0;

  const detalle = [];


  for (
    let i = 0;
    i < datos.length;
    i++
  ) {

    const fila = datos[i];


    try {

      let animal = null;
      let identificador = "";


      const posiblesIdentificadores = [

        columnas.rp,

        columnas.caravana,

        columnas.identificador,

      ];


      for (
        const columna
        of posiblesIdentificadores
      ) {

        if (!columna) continue;


        const valor =
          fila[columna];


        if (
          valor === undefined ||
          valor === null ||
          valor === ""
        ) {
          continue;
        }


        identificador =
          String(valor);


        animal =
          await buscarAnimalPorIdentificador(
            identificador
          );


        if (animal) break;

      }


      if (animal) {

        encontrados++;


        detalle.push({

          fila: i + 1,

          estado: "ok",

          identificador,

          animal,

          peso:
            columnas.peso
              ? fila[
                  columnas.peso
                ]
              : "",

          fecha:
            columnas.fecha
              ? fila[
                  columnas.fecha
                ]
              : "",

          mensaje:
            "Se importará",

        });

      } else {

        noEncontrados++;


        detalle.push({

          fila: i + 1,

          estado: "error",

          identificador,

          animal: null,

          peso:
            columnas.peso
              ? fila[
                  columnas.peso
                ]
              : "",

          fecha:
            columnas.fecha
              ? fila[
                  columnas.fecha
                ]
              : "",

          mensaje:
            "Animal no encontrado",

        });

      }

    } catch (error) {

      console.error(error);

      errores++;


      detalle.push({

        fila: i + 1,

        estado: "error",

        identificador: "",

        animal: null,

        peso: "",

        fecha: "",

        mensaje:
          "Error al analizar",

      });

    }

  }


  return {

    total:
      datos.length,

    encontrados,

    noEncontrados,

    errores,

    detalle,

  };

}


// ========================================
// ANALIZAR IMPORTACIÓN DE ANIMALES
// ========================================

export async function analizarAnimales(
  datos,
  columnas
) {

  let validos = 0;
  let duplicados = 0;
  let errores = 0;

  const detalle = [];


  for (
    let i = 0;
    i < datos.length;
    i++
  ) {

    const fila = datos[i];


    try {

      const rp =
        columnas.rp
          ? fila[columnas.rp]
          : "";


      const caravana =
        columnas.caravana
          ? fila[
              columnas.caravana
            ]
          : "";


      const identificador =
        columnas.identificador
          ? fila[
              columnas.identificador
            ]
          : "";


      // El animal debe tener
      // al menos un identificador

      if (
        !rp &&
        !caravana &&
        !identificador
      ) {

        errores++;


        detalle.push({

          fila: i + 1,

          estado: "error",

          rp: "",

          caravana: "",

          identificador: "",

          mensaje:
            "El animal no tiene identificador",

        });


        continue;

      }


      // Buscar si ya existe

      let animalExistente =
        null;


      // Buscar por RP

      if (rp) {

        animalExistente =
          await buscarAnimalPorIdentificador(
            String(rp)
          );

      }


      // Buscar por caravana

      if (
        !animalExistente &&
        caravana
      ) {

        animalExistente =
          await buscarAnimalPorIdentificador(
            String(caravana)
          );

      }


      // Buscar por identificador genérico
      // Por ejemplo: IDE

      if (
        !animalExistente &&
        identificador
      ) {

        animalExistente =
          await buscarAnimalPorIdentificador(
            String(identificador)
          );

      }


      // Si ya existe

      if (animalExistente) {

        duplicados++;


        detalle.push({

          fila: i + 1,

          estado: "duplicado",

          rp:
            rp
              ? String(rp)
              : "",

          caravana:
            caravana
              ? String(caravana)
              : "",

          identificador:
            identificador
              ? String(identificador)
              : "",

          mensaje:
            "Animal ya existe",

        });


        continue;

      }


      // Animal válido

      validos++;


      detalle.push({

        fila: i + 1,

        estado: "ok",

        rp:
          rp
            ? String(rp)
            : "",

        caravana:
          caravana
            ? String(caravana)
            : "",

        identificador:
          identificador
            ? String(identificador)
            : "",

        mensaje:
          "Listo para importar",

      });

    } catch (error) {

      console.error(error);

      errores++;


      detalle.push({

        fila: i + 1,

        estado: "error",

        rp: "",

        caravana: "",

        identificador: "",

        mensaje:
          "Error al analizar",

      });

    }

  }


  return {

    total:
      datos.length,

    validos,

    duplicados,

    errores,

    detalle,

  };

}


// ========================================
// IMPORTAR ANIMALES A FIREBASE
// ========================================

export async function importarAnimales(
  datos,
  columnas,
  detalle,
  loteId = ""
) {

  let importados = 0;
  let errores = 0;


  // Solo importamos
  // las filas válidas

  const filasValidas =
    detalle.filter(
      (fila) =>
        fila.estado === "ok"
    );


  for (
    const filaAnalizada
    of filasValidas
  ) {

    try {

      const fila =
        datos[
          filaAnalizada.fila - 1
        ];


      const animal = {

        rp:
          columnas.rp &&
          fila[
            columnas.rp
          ] !== undefined &&
          fila[
            columnas.rp
          ] !== null
            ? String(
                fila[
                  columnas.rp
                ]
              )
            : "",


        caravana:
          columnas.caravana &&
          fila[
            columnas.caravana
          ] !== undefined &&
          fila[
            columnas.caravana
          ] !== null
            ? String(
                fila[
                  columnas.caravana
                ]
              )
            : "",


        // Identificador genérico
        // Por ejemplo: columna IDE

        identificador:
          columnas.identificador &&
          fila[
            columnas.identificador
          ] !== undefined &&
          fila[
            columnas.identificador
          ] !== null
            ? String(
                fila[
                  columnas.identificador
                ]
              )
            : "",


        nombre:
          columnas.nombre &&
          fila[
            columnas.nombre
          ] !== undefined &&
          fila[
            columnas.nombre
          ] !== null
            ? String(
                fila[
                  columnas.nombre
                ]
              )
            : "",


        raza:
          columnas.raza &&
          fila[
            columnas.raza
          ] !== undefined &&
          fila[
            columnas.raza
          ] !== null
            ? String(
                fila[
                  columnas.raza
                ]
              )
            : "",


        sexo:
          columnas.sexo &&
          fila[
            columnas.sexo
          ] !== undefined &&
          fila[
            columnas.sexo
          ] !== null
            ? String(
                fila[
                  columnas.sexo
                ]
              )
            : "",


        categoria:
          columnas.categoria &&
          fila[
            columnas.categoria
          ] !== undefined &&
          fila[
            columnas.categoria
          ] !== null
            ? String(
                fila[
                  columnas.categoria
                ]
              )
            : "",


        estado:
          columnas.estado &&
          fila[
            columnas.estado
          ] !== undefined &&
          fila[
            columnas.estado
          ] !== null
            ? String(
                fila[
                  columnas.estado
                ]
              )
            : "Activo",


        observaciones:
          columnas.observaciones &&
          fila[
            columnas.observaciones
          ] !== undefined &&
          fila[
            columnas.observaciones
          ] !== null
            ? String(
                fila[
                  columnas.observaciones
                ]
              )
            : "",


        // Lote elegido durante
        // la importación

        loteId,

      };


      await agregarAnimal(
        animal
      );


      importados++;

    } catch (error) {

      console.error(
        "Error importando animal:",
        error
      );

      errores++;

    }

  }


  return {

    importados,

    errores,

  };

}