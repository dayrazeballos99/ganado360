import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const columnas = [
    {
      field: "rp",
      headerName: "RP Electrónico",
      width: 220,
      renderCell: (params) => (
        <span
          style={{
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          {params.value}
        </span>
      ),
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
      width: 100,
    },
    {
      field: "categoria",
      headerName: "Categoría",
      width: 140,
    },
    {
      field: "peso",
      headerName: "Peso",
      width: 110,
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
              onClick={() =>
                navigate(`/animal/${params.row.id}`)
              }
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
    <div style={{ height: 650, width: "100%" }}>
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