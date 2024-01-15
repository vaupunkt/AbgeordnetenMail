import { Box, Typography } from "@mui/material";

export default function Title() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "100px",
        marginBottom: "100px",
        width: "100%",
        padding: "10px",
      }}
      aria-label='Header Box'>
      <Typography
        variant='h2'
        component='div'
        sx={{ width: "100%", margin: "auto", textAlign: "center" }}
        aria-label='Page Title'>
        AFD Verbot jetzt?
      </Typography>
      <Typography
        variant='h3'
        component='div'
        sx={{ textAlign: "center" }}
        aria-label='Subtitle'>
        Schreibe deine*n Abgeordnet*innen
      </Typography>
    </Box>
  );
}
