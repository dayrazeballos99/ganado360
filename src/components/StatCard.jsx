import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function StatCard({
  titulo,
  valor,
  icono,
  color,
  subtitulo,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >

          {/* Información */}
          <Box sx={{ minWidth: 0 }}>

            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
              sx={{
                mb: 1,
              }}
            >
              {titulo}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  md: "2rem",
                },
                lineHeight: 1.1,
                color: "text.primary",
              }}
            >
              {valor}
            </Typography>

            {subtitulo && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  lineHeight: 1.4,
                }}
              >
                {subtitulo}
              </Typography>
            )}

          </Box>

          {/* Icono */}
          <Box
            sx={{
              width: 48,
              height: 48,
              minWidth: 48,
              borderRadius: 2.5,
              backgroundColor: color || "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 24,
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