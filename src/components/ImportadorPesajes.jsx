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
} from "@mui/material";

import { importarExcel } from "../utils/excel";
import { analizarPesajes } from "../services/importacionService";
import { importarPesajes } from "../services/importadorService";

import {
  obtenerLotes,
  obtenerLotePorId,
} from "../services/loteService";

import ResultadoImportacionTable from "../components/importador/ResultadoImportacionTable";

function ImportadorPesajes() {

  const [datos, setDatos] = useState([]);
  const [columnas, setColumnas] = useState({});
  const [analisis, setAnalisis] = useState(null);
  const [resultado, setResultado] = useState(null);

  const [cargando, setCargando] = useState(false);

  const [abrirConfirmacion, setAbrirConfirmacion] =
    useState(false);

  const [lotes, setLotes] = useState([]);

  const [loteSeleccionado, setLoteSeleccionado] =
    useState("");

  const [loteInfo, setLoteInfo] =
    useState(null);

  useEffect(() => {

    async function cargarLotes() {

      const datos =
        await obtenerLotes();

      setLotes(datos);

    }

    cargarLotes();

  }, []);

  useEffect(() => {

    async function cargarInfoLote() {

      if (!loteSeleccionado) {

        setLoteInfo(null);

        return;

      }

      const lote =
        await obtenerLotePorId(
          loteSeleccionado
        );

      setLoteInfo(lote);

    }

    cargarInfoLote();

  }, [loteSeleccionado]);

  async function leerExcel(e) {

    const archivo =
      e.target.files[0];

    if (!archivo) return;

    const res =
      await importarExcel(
        archivo
      );

    setColumnas(res.columnas);

    setDatos(res.datos);

    setResultado(null);

    setAnalisis({

      filas: res.datos.length,

      tieneRP:
        !!res.columnas.rp,

      tieneCaravana:
        !!res.columnas.caravana,

      tienePeso:
        !!res.columnas.peso,

      tieneFecha:
        !!res.columnas.fecha,

    });

  }

  async function analizar() {

    setCargando(true);

    const resumen =
      await analizarPesajes(
        datos,
        columnas
      );

    setResultado(resumen);

    setCargando(false);

  }

  async function confirmarImportacion() {

    if (!loteSeleccionado) {

  alert(
    "Debe seleccionar un lote antes de importar."
  );

  return;

}

    setCargando(true);

    try {
console.log("DETALLE:", resultado.detalle);
      const resumen =
  await importarPesajes(
    resultado.detalle,
    loteSeleccionado
  );

      alert(
  `Importación finalizada.\n\n` +
  `✅ Importados: ${resumen.importados}\n` +
  `🟡 Duplicados: ${resumen.duplicados}\n` +
  `❌ Errores: ${resumen.errores}`
);

      setAbrirConfirmacion(false);

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
      <Button
        variant="contained"
        component="label"
      >
        Seleccionar Excel

        <input
          hidden
          type="file"
          accept=".xlsx,.xls"
          onChange={leerExcel}
        />
      </Button>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          📁 Destino de la importación
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Lote</InputLabel>

          <Select
  value={loteSeleccionado || ""}
  label="Lote"
  displayEmpty
  onChange={(e) =>
    setLoteSeleccionado(e.target.value)
  }
>
  <MenuItem value="">
    <em>Seleccione un lote</em>
  </MenuItem>

  {lotes.map((lote) => (
    <MenuItem
      key={lote.id}
      value={lote.id}
    >
      {lote.nombre}
    </MenuItem>
  ))}
</Select>
        </FormControl>

        {loteInfo && (
          <Paper
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#f5f5f5",
            }}
          >
            <Typography variant="subtitle1">
              📁 Lote seleccionado
            </Typography>

            <Typography>
              <strong>Nombre:</strong>{" "}
              {loteInfo.nombre}
            </Typography>

            <Typography>
              <strong>ID:</strong>{" "}
              {loteInfo.id}
            </Typography>
          </Paper>
        )}
      </Paper>

      {Object.keys(columnas).length > 0 && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            Columnas detectadas
          </Typography>

          {Object.entries(columnas).map(
            ([campo, columna]) => (
              <Typography key={campo}>
                <strong>{campo}:</strong>{" "}
                {columna}
              </Typography>
            )
          )}
        </Paper>
      )}

      {analisis && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            Análisis del archivo
          </Typography>

          <Typography>
            ✔ Registros encontrados:{" "}
            <strong>
              {analisis.filas}
            </strong>
          </Typography>

          <Typography>
            {analisis.tienePeso
              ? "✔"
              : "❌"}{" "}
            Peso
          </Typography>

          <Typography>
            {analisis.tieneFecha
              ? "✔"
              : "❌"}{" "}
            Fecha
          </Typography>

          <Typography>
            {analisis.tieneRP
              ? "✔ RP detectado"
              : analisis.tieneCaravana
              ? "✔ Caravana detectada"
              : "❌ No se encontró RP ni Caravana"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            color="secondary"
            onClick={analizar}
            disabled={cargando}
          >
            {cargando
              ? "Analizando..."
              : "🔍 Analizar animales"}
          </Button>
        </Paper>
      )}

      {resultado && (
        <>
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Resultado del análisis
            </Typography>

            <Typography>
              📄 Total registros:{" "}
              <strong>
                {resultado.total}
              </strong>
            </Typography>

            <Typography>
              ✅ Animales encontrados:{" "}
              <strong>
                {resultado.encontrados}
              </strong>
            </Typography>

            <Typography>
              ⚠ Animales no encontrados:{" "}
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

          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Detalle de la importación
            </Typography>

            <ResultadoImportacionTable
              detalle={resultado.detalle}
            />

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={() =>
                setAbrirConfirmacion(true)
              }
            >
              🚀 Importar pesajes
            </Button>
          </Paper>
        </>
      )}

      {datos.length > 0 && (
        <Paper sx={{ mt: 3, p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            Vista previa
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                {Object.keys(datos[0]).map(
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
                .map((fila, i) => (
                  <TableRow key={i}>
                    {Object.values(fila).map(
                      (valor, j) => (
                        <TableCell
                          key={j}
                        >
                          {String(valor)}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Dialog
        open={abrirConfirmacion}
        onClose={() =>
          setAbrirConfirmacion(false)
        }
      >
        <DialogTitle>
          Confirmar importación
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Se importarán{" "}
            <strong>
              {resultado?.encontrados}
            </strong>{" "}
            pesajes.

            <br />
            <br />

            Los animales no encontrados
            serán omitidos.

            <br />
            <br />

            ¿Desea continuar?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setAbrirConfirmacion(false)
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
            Importar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ImportadorPesajes;