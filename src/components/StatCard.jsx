import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({
  titulo,
  valor,
  icono,
  color,
  subtitulo,
}) {

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {titulo}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {valor}
            </Typography>
            {subtitulo && (

  <Typography
    variant="body2"
    color="text.secondary"
    mt={1}
  >
    {subtitulo}
  </Typography>

)}
          </Box>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 30,
            }}
          >
            {icono}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;