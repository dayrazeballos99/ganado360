import { useEffect, useRef, useState } from "react";

import Layout from "../components/Layout";
import AnimalDialog from "../components/AnimalDialog";
import AnimalTable from "../components/AnimalTable";
import ImportExcelDialog from "../components/ImportExcelDialog";

import {
  obtenerAnimales,
  eliminarAnimal,
} from "../services/animalService";

import { exportarExcel } from "../utils/excel";
import { exportarPDF } from "../utils/pdf";

import { analizarExcel } from "../importador/importadorInteligente";
import { importarIngreso } from "../services/procesos/importarIngresoService";
import { importarPesajes } from "../services/procesos/importarPesajesService";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

import { obtenerLotes } from "../services/loteService";

function Animals() {
  const [animales, setAnimales] = useState([]);
  const [buscar, setBuscar] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);

  const [previewExcel, setPreviewExcel] = useState({
    encabezados: [],
    filas: [],
    mapeo: {},
    animales: [],
    resumen: {},
    tipoArchivo: "",
    confianza: 0,
  });

  const [lotes, setLotes] = useState([]);
  const [loteSeleccionado, setLoteSeleccionado] = useState("");

  const inputFile = useRef();

  useEffect(() => {
    cargarAnimales();
    cargarLotes();
  }, []);

  async function cargarAnimales() {
    const datos = await obtenerAnimales();
    setAnimales(datos);
  }

  async function cargarLotes() {
    const datos = await obtenerLotes();
    setLotes(datos);
  }

  function nuevoAnimal() {
    setAnimalSeleccionado(null);
    setOpenDialog(true);
  }

  function editar(animal) {
    setAnimalSeleccionado(animal);
    setOpenDialog(true);
  }

  function ver(animal) {
    console.log(animal);
  }

  async function borrarAnimal(animal) {
    if (!window.confirm(`¿Eliminar ${animal.nombre || animal.rp}?`)) return;

    await eliminarAnimal(animal.id);

    cargarAnimales();
  }

  async function importar(event) {
    const archivo = event.target.files[0];

    if (!archivo) return;

    const resultado = await analizarExcel(archivo);

    setPreviewExcel(resultado);

    setOpenImport(true);
  }

  async function confirmarImportacion() {
    try {
      if (previewExcel.tipoArchivo === "INGRESO") {
        await importarIngreso(
          previewExcel.animales,
          loteSeleccionado
        );

        alert(
          `${previewExcel.animales.length} animales importados correctamente.`
        );

      } else if (previewExcel.tipoArchivo === "PESAJES") {

        const resultado = await importarPesajes(
          previewExcel.animales
        );

        alert(
          `Pesajes importados: ${resultado.importados}
No encontrados: ${resultado.noEncontrados}`
        );

      } else {

        alert(
          `Tipo de archivo "${previewExcel.tipoArchivo}" todavía no soportado.`
        );

        return;

      }

      setOpenImport(false);
      setLoteSeleccionado("");

      cargarAnimales();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }
  }

  const animalesFiltrados = animales.filter((animal) => {
    const texto = buscar.toLowerCase();

    return (
      animal.rp?.toLowerCase().includes(texto) ||
      animal.caravana?.toLowerCase().includes(texto) ||
      animal.nombre?.toLowerCase().includes(texto)
    );
  });

  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          🐄 Gestión de Animales
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => inputFile.current.click()}
          >
            📥 Importar Excel
          </Button>

          <input
            hidden
            type="file"
            ref={inputFile}
            accept=".xlsx,.xls"
            onChange={importar}
          />

          <Button
            variant="outlined"
            onClick={() => exportarExcel(animalesFiltrados)}
          >
            📤 Excel
          </Button>

          <Button
            variant="outlined"
            onClick={() => exportarPDF(animalesFiltrados)}
          >
            📄 PDF
          </Button>

          <Button
            variant="contained"
            onClick={nuevoAnimal}
          >
            + Nuevo Animal
          </Button>
        </Stack>
      </Box>


      <AnimalTable
        animales={animalesFiltrados}
        onDelete={borrarAnimal}
        onEdit={editar}
        onView={ver}
      />

      <AnimalDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAnimalAdded={cargarAnimales}
        animalSeleccionado={animalSeleccionado}
      />

      <ImportExcelDialog
  open={openImport}
  onClose={() => setOpenImport(false)}
  encabezados={previewExcel.encabezados}
  filas={previewExcel.filas}
  mapeo={previewExcel.mapeo}
  resumen={previewExcel.resumen}
  tipoArchivo={previewExcel.tipoArchivo}
  onImportar={confirmarImportacion}
  lotes={lotes}
  loteSeleccionado={loteSeleccionado}
  setLoteSeleccionado={setLoteSeleccionado}
/>
      
    </Layout>
  );
}

export default Animals;