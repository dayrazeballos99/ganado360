import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { animalColumns } from "../tables/animalColumns.jsx";

function AnimalTable({
  animales,
  onDelete,
  onEdit,
}) {

  const navigate = useNavigate();

  return (
    <div
      style={{
        height: 650,
        width: "100%",
      }}
    >
      <DataGrid
        rows={animales}
        columns={animalColumns(
          navigate,
          onEdit,
          onDelete
        )}
        pageSizeOptions={[
          10,
          20,
          50,
          100,
        ]}
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