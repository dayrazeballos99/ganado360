import { detectarTipoEvento } from "../services/importadorEventosService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Alert,
  Box,
  Paper,
} from "@mui/material";

function ImportExcelDialog({
  open,
  onClose,
  encabezados = [],
  filas = [],
  mapeo = {},
  resumen = {},
  onImportar,
}) {
  const columnasDetectadas = Object.keys(mapeo).length;
  const totalColumnas = encabezados.length;
const tipoEvento = detectarTipoEvento(
  encabezados[0] || ""
);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>
        📥 Importador Inteligente de Excel
      </DialogTitle>

      <DialogContent>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Paper sx={{ p: 2, mb: 3 }}>

  <Typography variant="h6" gutterBottom>
    📊 Resumen del archivo
  </Typography>

  <Typography>
    🐄 Animales: <b>{resumen.cantidad || 0}</b>
  </Typography>

  <Typography>
    ⚖️ Peso promedio: <b>{resumen.pesoPromedio || 0} kg</b>
  </Typography>

  <Typography>
    ⬇ Peso mínimo: <b>{resumen.pesoMinimo || 0} kg</b>
  </Typography>

  <Typography>
    ⬆ Peso máximo: <b>{resumen.pesoMaximo || 0} kg</b>
  </Typography>

</Paper>
          Se encontraron <b>{filas.length - 1}</b> registros.
        </Alert>

        <Typography variant="h6" gutterBottom>
          Columnas detectadas
        </Typography>

        <Box sx={{ mb: 3 }}>
          {Object.entries(mapeo).map(([campo, indice]) => (
            <Chip
              key={campo}
              color="success"
              label={`${encabezados[indice]} → ${campo}`}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>

        {columnasDetectadas < totalColumnas && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Algunas columnas no fueron reconocidas automáticamente.
            En la próxima versión podrán asignarse manualmente.
          </Alert>
        )}

        <Typography variant="h6" gutterBottom>
          Vista previa
        </Typography>

        <Table size="small">

          <TableHead>

            <TableRow>

              {encabezados.map((columna, index) => (
                <TableCell key={index}>
                  <b>{columna}</b>
                </TableCell>
              ))}

            </TableRow>

          </TableHead>

          <TableBody>

            {filas.slice(1, 6).map((fila, index) => (

              <TableRow key={index}>

                {fila.map((valor, i) => (

                  <TableCell key={i}>
                    {valor}
                  </TableCell>

                ))}

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onImportar}
        >
          🚀 Importar
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ImportExcelDialog;