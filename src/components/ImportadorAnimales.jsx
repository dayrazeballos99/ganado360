import { useEffect, useState } from "react";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { importarExcel } from "../utils/excel";

import {
  analizarAnimales,
  importarAnimales,
} from "../services/importacionService";

import {
  obtenerLotes,
  agregarLote,
} from "../services/loteService";


function ImportadorAnimales() {

  const [datos, setDatos] = useState([]);

  const [columnas, setColumnas] =
    useState({});

  const [analisis, setAnalisis] =
    useState(null);

  const [resultado, setResultado] =
    useState(null);

  const [cargando, setCargando] =
    useState(false);

  const [
    abrirConfirmacion,
    setAbrirConfirmacion,
  ] = useState(false);


  // ========================================
  // LOTES
  // ========================================

  const [lotes, setLotes] =
    useState([]);

  const [tipoDestino, setTipoDestino] =
    useState("sinLote");

  const [loteId, setLoteId] =
    useState("");

  const [nombreNuevoLote, setNombreNuevoLote] =
    useState("");


  useEffect(() => {

    async function cargarLotes() {

      try {

        const lista =
          await obtenerLotes();

        setLotes(lista);

      } catch (error) {

        console.error(
          "Error cargando lotes:",
          error
        );

      }

    }

    cargarLotes();

  }, []);


  // ========================================
  // LEER EXCEL
  // ========================================

  async function leerExcel(e) {

    const archivo =
      e.target.files[0];

    if (!archivo) return;


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

      setResultado(
        null
      );


      setAnalisis({

        filas:
          res.datos.length,

        tieneRP:
          !!res.columnas.rp,

        tieneCaravana:
          !!res.columnas.caravana,

        tieneNombre:
          !!res.columnas.nombre,

        tieneRaza:
          !!res.columnas.raza,

        tieneSexo:
          !!res.columnas.sexo,

        tieneCategoria:
          !!res.columnas.categoria,

      });

    } catch (error) {

      console.error(error);

      alert(
        "No se pudo leer el archivo Excel."
      );

    }

  }


  // ========================================
  // ANALIZAR ANIMALES
  // ========================================

  async function analizar() {

    setCargando(true);


    try {

      const resumen =
        await analizarAnimales(
          datos,
          columnas
        );


      setResultado(
        resumen
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ocurrió un error al analizar el archivo."
      );

    }


    setCargando(false);

  }


  // ========================================
  // IMPORTAR ANIMALES
  // ========================================

  async function confirmarImportacion() {

    if (!resultado) return;


    setCargando(true);

    setAbrirConfirmacion(false);


    try {

      let loteDestinoId = "";


      // -------------------------------
      // SIN LOTE
      // -------------------------------

      if (
        tipoDestino === "sinLote"
      ) {

        loteDestinoId = "";

      }


      // -------------------------------
      // LOTE EXISTENTE
      // -------------------------------

      if (
        tipoDestino === "existente"
      ) {

        if (!loteId) {

          alert(
            "Seleccioná un lote."
          );

          setCargando(false);

          return;

        }

        loteDestinoId =
          loteId;

      }


      // -------------------------------
      // CREAR NUEVO LOTE
      // -------------------------------

      if (
        tipoDestino === "nuevo"
      ) {

        if (
          !nombreNuevoLote.trim()
        ) {

          alert(
            "Ingresá un nombre para el nuevo lote."
          );

          setCargando(false);

          return;

        }


        const nuevoLote =
          await agregarLote({

            nombre:
              nombreNuevoLote.trim(),

          });


        loteDestinoId =
          nuevoLote.id;

      }


      // -------------------------------
      // IMPORTAR ANIMALES
      // -------------------------------

      const respuesta =
        await importarAnimales(
          datos,
          columnas,
          resultado.detalle,
          loteDestinoId
        );


      alert(

        `Importación finalizada.\n\n` +

        `🐄 Animales importados: ` +
        `${respuesta.importados}\n` +

        `❌ Errores: ` +
        `${respuesta.errores}`

      );


      // -------------------------------
      // LIMPIAR TODO
      // -------------------------------

      setDatos([]);

      setColumnas({});

      setAnalisis(null);

      setResultado(null);

      setLoteId("");

      setNombreNuevoLote("");

      setTipoDestino("sinLote");


      // Actualizamos los lotes
      // por si se creó uno nuevo

      const listaActualizada =
        await obtenerLotes();

      setLotes(
        listaActualizada
      );


    } catch (error) {

      console.error(error);

      alert(
        "Ocurrió un error durante la importación."
      );

    }


    setCargando(false);

  }


  return (

    <>

      {/* ====================================
          SELECCIONAR ARCHIVO
      ===================================== */}

      <Button
        variant="contained"
        component="label"
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
          ANALISIS DEL ARCHIVO
      ===================================== */}

      {analisis && (

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

            ✔ Registros encontrados:{" "}

            <strong>
              {analisis.filas}
            </strong>

          </Typography>


          <Typography>

            {analisis.tieneRP ||
            analisis.tieneCaravana
              ? "✔"
              : "❌"}{" "}

            Identificador
            {" "}
            (RP o Caravana)

          </Typography>


          <Typography>

            {analisis.tieneNombre
              ? "✔"
              : "⚠️"}{" "}

            Nombre

          </Typography>


          <Typography>

            {analisis.tieneRaza
              ? "✔"
              : "⚠️"}{" "}

            Raza

          </Typography>


          <Typography>

            {analisis.tieneSexo
              ? "✔"
              : "⚠️"}{" "}

            Sexo

          </Typography>


          <Typography>

            {analisis.tieneCategoria
              ? "✔"
              : "⚠️"}{" "}

            Categoría

          </Typography>


          <Divider
            sx={{
              my: 2,
            }}
          />


          <Button
            variant="contained"
            color="secondary"
            onClick={analizar}
            disabled={
              cargando ||
              datos.length === 0
            }
          >

            {cargando
              ? "Analizando..."
              : "🔍 Analizar animales"}

          </Button>

        </Paper>

      )}


      {/* ====================================
          RESULTADO DEL ANALISIS
      ===================================== */}

      {resultado && (

        <>

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

              📄 Total registros:{" "}

              <strong>
                {resultado.total}
              </strong>

            </Typography>


            <Typography>

              ✅ Animales listos para importar:{" "}

              <strong>
                {resultado.validos}
              </strong>

            </Typography>


            <Typography>

              ⚠️ Animales duplicados:{" "}

              <strong>
                {resultado.duplicados}
              </strong>

            </Typography>


            <Typography>

              ❌ Errores:{" "}

              <strong>
                {resultado.errores}
              </strong>

            </Typography>

          </Paper>


          {/* ====================================
              DESTINO DE LOS ANIMALES
          ===================================== */}

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
              📍 Destino de los animales
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mb: 2,
              }}
            >
              Elegí dónde querés asignar los animales
              que se van a importar.
            </Typography>


            <FormControl>

              <RadioGroup
                value={tipoDestino}
                onChange={(e) =>
                  setTipoDestino(
                    e.target.value
                  )
                }
              >

                <FormControlLabel
                  value="sinLote"
                  control={<Radio />}
                  label="Sin asignar a un lote"
                />


                <FormControlLabel
                  value="existente"
                  control={<Radio />}
                  label="Asignar a un lote existente"
                />


                <FormControlLabel
                  value="nuevo"
                  control={<Radio />}
                  label="Crear un nuevo lote"
                />

              </RadioGroup>

            </FormControl>


            {/* LOTE EXISTENTE */}

            {tipoDestino ===
              "existente" && (

              <FormControl
                fullWidth
                sx={{
                  mt: 2,
                }}
              >

                <InputLabel>
                  Seleccionar lote
                </InputLabel>


                <Select
                  value={loteId}
                  label="Seleccionar lote"
                  onChange={(e) =>
                    setLoteId(
                      e.target.value
                    )
                  }
                >

                  {lotes.map(
                    (lote) => (

                      <MenuItem
                        key={lote.id}
                        value={lote.id}
                      >

                        {lote.nombre}

                      </MenuItem>

                    )
                  )}

                </Select>

              </FormControl>

            )}


            {/* NUEVO LOTE */}

            {tipoDestino ===
              "nuevo" && (

              <TextField
                fullWidth
                sx={{
                  mt: 2,
                }}
                label="Nombre del nuevo lote"
                value={nombreNuevoLote}
                onChange={(e) =>
                  setNombreNuevoLote(
                    e.target.value
                  )
                }
              />

            )}

          </Paper>


          {/* ====================================
              DETALLE
          ===================================== */}

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
                    RP
                  </TableCell>

                  <TableCell>
                    Caravana
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
                  (fila) => (

                    <TableRow
                      key={fila.fila}
                    >

                      <TableCell>
                        {fila.fila}
                      </TableCell>


                      <TableCell>
                        {fila.rp || "-"}
                      </TableCell>


                      <TableCell>
                        {fila.caravana || "-"}
                      </TableCell>


                      <TableCell>

                        {fila.estado === "ok"
                          ? "✅ Listo"
                          : fila.estado ===
                            "duplicado"
                          ? "⚠️ Duplicado"
                          : "❌ Error"}

                      </TableCell>


                      <TableCell>
                        {fila.mensaje}
                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>


            <Button
              variant="contained"
              color="success"
              sx={{
                mt: 3,
              }}
              disabled={
                cargando ||
                resultado.validos === 0
              }
              onClick={() =>
                setAbrirConfirmacion(
                  true
                )
              }
            >

              🚀 Importar animales

            </Button>

          </Paper>

        </>

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


      {/* ====================================
          CONFIRMACION
      ===================================== */}

      <Dialog
        open={abrirConfirmacion}
        onClose={() =>
          setAbrirConfirmacion(
            false
          )
        }
      >

        <DialogTitle>
          ⚠️ Confirmar importación
        </DialogTitle>


        <DialogContent>

          <DialogContentText>

            Se importarán{" "}

            <strong>
              {resultado?.validos || 0}
            </strong>{" "}

            animales nuevos.

            <br />
            <br />

            Los animales duplicados
            y las filas con errores
            serán omitidos.

            <br />
            <br />

            ¿Desea continuar?

          </DialogContentText>

        </DialogContent>


        <DialogActions>

          <Button
            onClick={() =>
              setAbrirConfirmacion(
                false
              )
            }
          >
            Cancelar
          </Button>


          <Button
            color="success"
            variant="contained"
            onClick={
              confirmarImportacion
            }
          >

            🚀 Importar

          </Button>

        </DialogActions>

      </Dialog>

    </>

  );

}

export default ImportadorAnimales;