import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  obtenerRegistrosComerciales,
  agregarRegistroComercial,
  editarRegistroComercial,
  eliminarRegistroComercial,
} from "../../../services/comercialService";


function ComercialTab({ animal }) {

  const [registros, setRegistros] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [registroEditando, setRegistroEditando] =
    useState(null);

  const [formulario, setFormulario] = useState({
    fecha: "",
    tipo: "Venta",
    peso: "",
    precioKg: "",
    comprador: "",
    observaciones: "",
  });


  async function cargarRegistros() {

    if (!animal) return;

    const datos =
      await obtenerRegistrosComerciales(
        animal.id
      );

    setRegistros(datos);

  }


  useEffect(() => {

    cargarRegistros();

  }, [animal]);


  function abrirNuevoRegistro() {

    setRegistroEditando(null);

    setFormulario({
      fecha: "",
      tipo: "Venta",
      peso: animal?.peso || "",
      precioKg: "",
      comprador: "",
      observaciones: "",
    });

    setMostrarFormulario(true);

  }


  function editarRegistro(registro) {

    setRegistroEditando(registro);

    setFormulario({
      fecha: registro.fecha || "",
      tipo: registro.tipo || "Venta",
      peso: registro.peso || "",
      precioKg: registro.precioKg || "",
      comprador: registro.comprador || "",
      observaciones:
        registro.observaciones || "",
    });

    setMostrarFormulario(true);

  }


  async function guardarRegistro() {

    const peso =
      Number(formulario.peso) || 0;

    const precioKg =
      Number(formulario.precioKg) || 0;

    const importe =
      peso * precioKg;

    const datos = {
      ...formulario,
      peso,
      precioKg,
      importe,
    };


    if (registroEditando) {

      await editarRegistroComercial(
        animal.id,
        registroEditando.id,
        datos
      );

    } else {

      await agregarRegistroComercial(
        animal.id,
        datos
      );

    }


    setMostrarFormulario(false);

    setRegistroEditando(null);

    cargarRegistros();

  }


  async function eliminarRegistro(registro) {

    const confirmar =
      window.confirm(
        "¿Eliminar este registro comercial?"
      );

    if (!confirmar) return;


    await eliminarRegistroComercial(
      animal.id,
      registro.id
    );

    cargarRegistros();

  }


  return (

    <Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          💰 Historial Comercial
        </Typography>


        <Button
          variant="contained"
          onClick={abrirNuevoRegistro}
        >
          Registrar operación
        </Button>

      </Box>


      {mostrarFormulario && (

        <Paper
          sx={{
            p: 3,
            mb: 3,
          }}
        >

          <Typography
            variant="h6"
            gutterBottom
          >

            {registroEditando
              ? "Editar operación"
              : "Nueva operación"}

          </Typography>


          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 2,
              mt: 2,
            }}
          >

            <input
              type="date"
              value={formulario.fecha}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  fecha: e.target.value,
                })
              }
            />


            <select
              value={formulario.tipo}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  tipo: e.target.value,
                })
              }
            >

              <option value="Venta">
                Venta
              </option>

              <option value="Compra">
                Compra
              </option>

              <option value="Otro">
                Otro
              </option>

            </select>


            <input
              type="number"
              placeholder="Peso (kg)"
              value={formulario.peso}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  peso: e.target.value,
                })
              }
            />


            <input
              type="number"
              placeholder="Precio por kg"
              value={formulario.precioKg}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  precioKg: e.target.value,
                })
              }
            />


            <input
              placeholder="Comprador / vendedor"
              value={formulario.comprador}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  comprador: e.target.value,
                })
              }
            />


            <input
              placeholder="Observaciones"
              value={formulario.observaciones}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  observaciones:
                    e.target.value,
                })
              }
            />

          </Box>


          <Box
            display="flex"
            gap={2}
            justifyContent="flex-end"
            mt={3}
          >

            <Button
              onClick={() =>
                setMostrarFormulario(false)
              }
            >
              Cancelar
            </Button>


            <Button
              variant="contained"
              onClick={guardarRegistro}
            >
              Guardar
            </Button>

          </Box>

        </Paper>

      )}


      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Fecha
              </TableCell>

              <TableCell>
                Tipo
              </TableCell>

              <TableCell>
                Peso
              </TableCell>

              <TableCell>
                Precio/kg
              </TableCell>

              <TableCell>
                Importe
              </TableCell>

              <TableCell>
                Comprador / Vendedor
              </TableCell>

              <TableCell align="center">
                Acciones
              </TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {registros.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={7}
                  align="center"
                >
                  No hay operaciones registradas.
                </TableCell>

              </TableRow>

            ) : (

              registros.map((registro) => (

                <TableRow
                  key={registro.id}
                  hover
                >

                  <TableCell>
                    {registro.fecha}
                  </TableCell>

                  <TableCell>
                    {registro.tipo}
                  </TableCell>

                  <TableCell>
                    {registro.peso} kg
                  </TableCell>

                  <TableCell>
                    ${registro.precioKg}
                  </TableCell>

                  <TableCell>
                    ${registro.importe}
                  </TableCell>

                  <TableCell>
                    {registro.comprador || "-"}
                  </TableCell>


                  <TableCell align="center">

                    <IconButton
                      color="primary"
                      onClick={() =>
                        editarRegistro(registro)
                      }
                    >
                      <EditIcon />
                    </IconButton>


                    <IconButton
                      color="error"
                      onClick={() =>
                        eliminarRegistro(registro)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </Paper>

    </Box>

  );

}


export default ComercialTab;