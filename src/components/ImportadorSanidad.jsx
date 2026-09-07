import { useState } from "react";

import {
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

import { importarExcel } from "../utils/excel";

import {
  buscarAnimalPorIdentificador,
} from "../services/animalService";

import {
  agregarTratamiento,
} from "../services/sanidadService";


function ImportadorSanidad() {

  const [datos, setDatos] =
    useState([]);

  const [columnas, setColumnas] =
    useState({});

  const [cargando, setCargando] =
    useState(false);

  const [analizando, setAnalizando] =
    useState(false);

  const [resultado, setResultado] =
    useState(null);


  // ========================================
  // LEER EXCEL
  // ========================================

  async function leerExcel(e) {

    const archivo =
      e.target.files[0];

    if (!archivo) return;


    setCargando(true);

    setResultado(null);


    try {

      const res =
        await importarExcel(
          archivo
        );


      setColumnas(
        res.columnas
      );


      setDatos(
        res.datos
      );


    } catch (error) {

      console.error(error);

      alert(
        "No se pudo leer el archivo Excel."
      );

    }


    setCargando(false);

  }


  // ========================================
  // ANALIZAR EVENTOS SANITARIOS
  // ========================================

  async function analizarSanidad() {

    if (!datos.length) return;


    setAnalizando(true);


    let encontrados = 0;

    let noEncontrados = 0;

    let errores = 0;


    const detalle = [];


    for (
      let i = 0;
      i < datos.length;
      i++
    ) {

      const fila =
        datos[i];


      try {

        let animal =
          null;

        let identificador =
          "";


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

            fila:
              i + 1,

            estado:
              "ok",

            identificador,

            animal,

            fecha:
              columnas.fecha
                ? fila[
                    columnas.fecha
                  ]
                : "",

            tipo:
              columnas.tipo
                ? fila[
                    columnas.tipo
                  ]
                : "",

            producto:
              columnas.producto
                ? fila[
                    columnas.producto
                  ]
                : "",

            dosis:
              columnas.dosis
                ? fila[
                    columnas.dosis
                  ]
                : "",

            veterinario:
              columnas.veterinario
                ? fila[
                    columnas.veterinario
                  ]
                : "",

            mensaje:
              "Listo para importar",

          });


        } else {

          noEncontrados++;


          detalle.push({

            fila:
              i + 1,

            estado:
              "error",

            identificador,

            animal:
              null,

            fecha:
              columnas.fecha
                ? fila[
                    columnas.fecha
                  ]
                : "",

            tipo:
              columnas.tipo
                ? fila[
                    columnas.tipo
                  ]
                : "",

            producto:
              columnas.producto
                ? fila[
                    columnas.producto
                  ]
                : "",

            dosis:
              columnas.dosis
                ? fila[
                    columnas.dosis
                  ]
                : "",

            veterinario:
              columnas.veterinario
                ? fila[
                    columnas.veterinario
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

          fila:
            i + 1,

          estado:
            "error",

          identificador:
            "",

          animal:
            null,

          fecha:
            "",

          tipo:
            "",

          producto:
            "",

          dosis:
            "",

          veterinario:
            "",

          mensaje:
            "Error al analizar",

        });

      }

    }


    setResultado({

      total:
        datos.length,

      encontrados,

      noEncontrados,

      errores,

      detalle,

    });


    setAnalizando(false);

  }


  // ========================================
  // IMPORTAR EVENTOS SANITARIOS
  // ========================================

  async function importarSanidad() {

    if (!resultado) return;


    const registrosValidos =
      resultado.detalle.filter(
        (registro) =>
          registro.estado === "ok"
      );


    if (
      registrosValidos.length === 0
    ) {

      alert(
        "No hay registros válidos para importar."
      );

      return;

    }


    setCargando(true);


    let importados = 0;

    let errores = 0;


    for (
      const registro
      of registrosValidos
    ) {

      try {

        await agregarTratamiento(

          registro.animal.id,

          {

            fecha:
              registro.fecha
                ? String(
                    registro.fecha
                  )
                : "",


            tipo:
              registro.tipo
                ? String(
                    registro.tipo
                  )
                : "",


            producto:
              registro.producto
                ? String(
                    registro.producto
                  )
                : "",


            dosis:
              registro.dosis
                ? String(
                    registro.dosis
                  )
                : "",


            veterinario:
              registro.veterinario
                ? String(
                    registro.veterinario
                  )
                : "",


            importado:
              true,

          }

        );


        importados++;


      } catch (error) {

        console.error(
          "Error importando evento sanitario:",
          error
        );


        errores++;

      }

    }


    setCargando(false);


    alert(
      "Importación finalizada.\n\n" +
      "💉 Eventos importados: " +
      importados +
      "\n" +
      "❌ Errores: " +
      errores
    );

  }


  return (

    <>


      {/* ====================================
          SELECCIONAR ARCHIVO
      ===================================== */}

      <Button
        variant="contained"
        component="label"
        disabled={
          cargando ||
          analizando
        }
      >

        📂 Seleccionar Excel

        <input
          hidden
          type="file"
          accept=".xlsx,.xls"
          onChange={leerExcel}
        />

      </Button>


      {/* ====================================
          COLUMNAS DETECTADAS
      ===================================== */}

      {Object.keys(columnas).length > 0 && (

        <Paper
          sx={{
            mt: 2,
            p: 2,
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            📋 Columnas detectadas
          </Typography>


          {Object.entries(
            columnas
          ).map(
            ([campo, columna]) => (

              <Typography
                key={campo}
              >

                <strong>
                  {campo}:
                </strong>{" "}

                {columna}

              </Typography>

            )
          )}

        </Paper>

      )}


      {/* ====================================
          ANÁLISIS INICIAL
      ===================================== */}

      {datos.length > 0 && (

        <Paper
          sx={{
            mt: 2,
            p: 2,
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            🔎 Análisis del archivo
          </Typography>


          <Typography>

            📄 Registros encontrados:{" "}

            <strong>
              {datos.length}
            </strong>

          </Typography>


          <Typography>

            {columnas.rp ||
            columnas.caravana ||
            columnas.identificador
              ? "✔"
              : "❌"}{" "}

            Identificador del animal

          </Typography>


          <Typography>

            {columnas.fecha
              ? "✔"
              : "⚠️"}{" "}

            Fecha

          </Typography>


          <Typography>

            {columnas.tipo
              ? "✔"
              : "⚠️"}{" "}

            Tipo de evento

          </Typography>


          <Typography>

            {columnas.producto
              ? "✔"
              : "⚠️"}{" "}

            Producto / vacuna / tratamiento

          </Typography>


          <Divider
            sx={{
              my: 2,
            }}
          />


          {!resultado && (

            <Button
              variant="contained"
              onClick={analizarSanidad}
              disabled={analizando}
            >

              {analizando
                ? "ANALIZANDO..."
                : "🔎 ANALIZAR SANIDAD"}

            </Button>

          )}


          {resultado && (

            <Typography
              color="text.secondary"
            >

              Análisis terminado.
              Revisá los resultados antes
              de importar.

            </Typography>

          )}

        </Paper>

      )}


      {/* ====================================
          RESULTADO DEL ANÁLISIS
      ===================================== */}

      {resultado && (

        <Paper
          sx={{
            mt: 2,
            p: 2,
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            📊 Resultado del análisis
          </Typography>


          <Typography>

            📄 Total de registros:{" "}

            <strong>
              {resultado.total}
            </strong>

          </Typography>


          <Typography>

            ✅ Eventos listos para importar:{" "}

            <strong>
              {resultado.encontrados}
            </strong>

          </Typography>


          <Typography>

            ⚠️ Animales no encontrados:{" "}

            <strong>
              {resultado.noEncontrados}
            </strong>

          </Typography>


          <Typography>

            ❌ Errores:{" "}

            <strong>
              {resultado.errores}
            </strong>

          </Typography>

        </Paper>

      )}


      {/* ====================================
          DETALLE DE IMPORTACIÓN
      ===================================== */}

      {resultado && (

        <Paper
          sx={{
            mt: 2,
            p: 2,
            overflowX: "auto",
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            📋 Detalle de la importación
          </Typography>


          <Table
            size="small"
          >

            <TableHead>

              <TableRow>

                <TableCell>
                  Fila
                </TableCell>

                <TableCell>
                  Identificador
                </TableCell>

                <TableCell>
                  Animal
                </TableCell>

                <TableCell>
                  Producto
                </TableCell>

                <TableCell>
                  Estado
                </TableCell>

                <TableCell>
                  Mensaje
                </TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {resultado.detalle.map(
                (registro) => (

                  <TableRow
                    key={registro.fila}
                  >

                    <TableCell>

                      {registro.fila}

                    </TableCell>


                    <TableCell>

                      {registro.identificador}

                    </TableCell>


                    <TableCell>

                      {registro.animal
                        ? (
                            registro.animal.rp ||
                            registro.animal.caravana ||
                            registro.animal.nombre ||
                            registro.animal.id
                          )
                        : "-"}

                    </TableCell>


                    <TableCell>

                      {registro.producto}

                    </TableCell>


                    <TableCell>

                      {registro.estado === "ok"
                        ? "✅ Listo"
                        : "❌ Error"}

                    </TableCell>


                    <TableCell>

                      {registro.mensaje}

                    </TableCell>

                  </TableRow>

                )
              )}

            </TableBody>

          </Table>


          <Button
            variant="contained"
            sx={{
              mt: 2,
            }}
            onClick={importarSanidad}
            disabled={
              cargando ||
              resultado.encontrados === 0
            }
          >

            {cargando
              ? "IMPORTANDO..."
              : "💉 IMPORTAR SANIDAD"}

          </Button>

        </Paper>

      )}


      {/* ====================================
          VISTA PREVIA DEL EXCEL
      ===================================== */}

      {datos.length > 0 && (

        <Paper
          sx={{
            mt: 3,
            p: 2,
            overflowX: "auto",
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >
            👀 Vista previa del archivo
          </Typography>


          <Table
            size="small"
          >

            <TableHead>

              <TableRow>

                {Object.keys(
                  datos[0]
                ).map(
                  (columna) => (

                    <TableCell
                      key={columna}
                    >

                      {columna}

                    </TableCell>

                  )
                )}

              </TableRow>

            </TableHead>


            <TableBody>

              {datos
                .slice(0, 10)
                .map(
                  (fila, i) => (

                    <TableRow
                      key={i}
                    >

                      {Object.values(
                        fila
                      ).map(
                        (valor, j) => (

                          <TableCell
                            key={j}
                          >

                            {valor !== undefined &&
                            valor !== null
                              ? String(valor)
                              : ""}

                          </TableCell>

                        )
                      )}

                    </TableRow>

                  )
                )}

            </TableBody>

          </Table>

        </Paper>

      )}

    </>

  );

}


export default ImportadorSanidad;