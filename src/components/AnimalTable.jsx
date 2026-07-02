import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AnimalTable({
  animales,
  onDelete,
  onEdit,
  onView,
}) {
  const columnas = [
    {
      field: "rp",
      headerName: "RP",
      width: 90,
    },
    {
      field: "caravana",
      headerName: "Caravana",
      width: 130,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 170,
    },
    {
      field: "raza",
      headerName: "Raza",
      width: 140,
    },
    {
      field: "sexo",
      headerName: "Sexo",
      width: 110,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      width: 130,
    },
    {
      field: "peso",
      headerName: "Peso",
      width: 100,
      renderCell: (params) =>
        params.value ? `${params.value} kg` : "",
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 170,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver ficha">
            <IconButton
              color="info"
              onClick={() => onView?.(params.row)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar">
            <IconButton
              color="primary"
              onClick={() => onEdit?.(params.row)}
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

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={animales}
        columns={columnas}
        pageSizeOptions={[10, 20, 50, 100]}
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