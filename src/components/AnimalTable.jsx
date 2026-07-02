import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AnimalTable({ animales, onDelete }) {
  const columnas = [
    {
      field: "rp",
      headerName: "RP",
      width: 90,
    },
    {
      field: "caravana",
      headerName: "Caravana",
      width: 140,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 180,
    },
    {
      field: "raza",
      headerName: "Raza",
      width: 140,
    },
    {
      field: "sexo",
      headerName: "Sexo",
      width: 120,
    },
    {
      field: "peso",
      headerName: "Peso (kg)",
      width: 120,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => onDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={animales}
        columns={columnas}
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default AnimalTable;