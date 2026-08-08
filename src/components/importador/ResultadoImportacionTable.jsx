import { DataGrid } from "@mui/x-data-grid";

function ResultadoImportacionTable({ detalle }) {
  const columnas = [
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
      renderCell: (params) =>
        params.value === "ok" ? "🟢" : "🔴",
    },

    {
      field: "identificador",
      headerName: "Identificador",
      width: 220,
    },

    {
      field: "peso",
      headerName: "Peso",
      width: 120,
    },

    {
      field: "fecha",
      headerName: "Fecha",
      width: 150,
    },

    {
      field: "mensaje",
      headerName: "Resultado",
      flex: 1,
    },
  ];

  return (
    <div
      style={{
        height: 500,
        width: "100%",
      }}
    >
      <DataGrid
        rows={detalle.map((fila, index) => ({
          id: index,
          ...fila,
        }))}
        columns={columnas}
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

export default ResultadoImportacionTable;