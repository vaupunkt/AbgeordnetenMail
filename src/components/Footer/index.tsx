/* eslint-disable react/no-unescaped-entities */
import { Box, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "30px",
        paddingBottom: "30px",
        gap: "30px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
      <Box sx={{ width: "50%" }}>
        <Typography variant='h6' align='justify'>
          Impressum (Angaben gemäß § 5 TMG)
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          Veliko Kardziev
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          Neureutherstr. 4
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          80799 München
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          E-Mail: mail@velikokardziev.de
        </Typography>
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography variant='body2' align='justify'>
          Diese Webseite steht nicht in Verbindung mit der Petition{" "}
          <a href='https://innn.it/afdverbot'>
            "Prüft ein AFD Verbot" auf https://innn.it/afdverbot
          </a>{" "}
          sondern ist ein reines Zusatzangebot, erstellt mit öffentlich
          zugänglichen Daten:
        </Typography>
        <Typography variant='caption'>
          (c) Die Bundeswahlleiterin, Wiesbaden 2024 Datenlizenz Deutschland –
          Namensnennung – Version 2.0 (https://www.govdata.de/dl-de/by-2-0)
        </Typography>
        <Typography variant='caption'>
          Ergebnisse der Wahlbezirksstatistik zur Bundestagswahl 2021 Endgültig
          gewählte Bewerberinnen und Bewerber bei der Wahl zum 20. Deutschen
          Bundestag (26. September 2021) sowie Mitgliedschaftsverluste und
          berufene Listennachfolgen - Stand:08.01.2024
        </Typography>
      </Box>
    </Box>
  );
}
