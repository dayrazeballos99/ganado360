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
} from "@mui/material";

function ImportExcelDialog({
  open,
  onClose,
  encabezados = [],
  mapeo = {},
  filas = [],
  onImportar,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>

      <DialogTitle>
        📥 Importar Animales
      </DialogTitle>

      <DialogContent>

        <Typography sx={{ mb: 2 }}>
          Ganado360 detectó automáticamente estas columnas:
        </Typography>

        {Object.entries(mapeo).map(([campo, indice]) => (
          <Chip
            key={campo}
            label={`${encabezados[indice]} ➜ ${campo}`}
            color="success"
            sx={{ mr: 1, mb: 1 }}
          />
        ))}

        <Typography sx={{ mt: 3, mb: 2 }}>
          Vista previa del archivo
        </Typography>

        <Table size="small">

          <TableHead>

            <TableRow>
              {encabezados.map((h, i) => (
                <TableCell key={i}>
                  <b>{h}</b>
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
          Importar
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ImportExcelDialog;