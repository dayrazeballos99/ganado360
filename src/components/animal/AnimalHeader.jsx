import { Box, Typography } from "@mui/material";

function AnimalHeader({ animal }) {
  return (
    <Box mb={3}>

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        🐄 {animal?.nombre || "Sin nombre"}
      </Typography>

      <Typography color="text.secondary">
        RP: {animal?.rp || "-"} | Caravana: {animal?.caravana || "-"}
      </Typography>

      <Typography
        color={animal?.estado === "Activo" ? "green" : "red"}
        fontWeight="bold"
        mt={1}
      >
        {animal?.estado || "-"}
      </Typography>

    </Box>
  );
}

export default AnimalHeader;