import { DataGrid } from "@mui/x-data-grid";

import {
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MovimientosTable({
  movimientos,
  onEdit,
  onDelete,
}) {
 console.log("TABLA:", movimientos);
  const columnas = [

    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
    },

    {
      field: "rp",
      headerName: "RP",
      width: 180,
    },

    {
      field: "tipo",
      headerName: "Tipo",
      width: 170,
    },

    {
      field: "origen",
      headerName: "Origen",
      width: 180,
    },

    {
      field: "destino",
      headerName: "Destino",
      width: 180,
    },

    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 1,
    },

    {
      field: "acciones",
      headerName: "Acciones",
      width: 130,
      sortable: false,

      renderCell: (params) => (

        <>

          <Tooltip title="Editar">

            <IconButton
              color="primary"
              onClick={() => onEdit(params.row)}
            >
              <EditIcon />
            </IconButton>

          </Tooltip>

          <Tooltip title="Eliminar">

            <IconButton
              color="error"
              onClick={() => onDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>

          </Tooltip>

        </>

      ),

    },

  ];
console.log(movimientos[0]);
  return (

    <div
      style={{
        height: 650,
        width: "100%",
      }}
    >

      <DataGrid
  rows={movimientos}
  columns={columnas}
  getRowId={(row) => row.id}
  disableRowSelectionOnClick
  pageSizeOptions={[10, 20, 50]}
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 10,
      },
    },
  }}
/>

    </div>

  );

}

export default MovimientosTable;