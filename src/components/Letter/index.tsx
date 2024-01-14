import { FileCopy, Send } from "@material-ui/icons";
import { CopyAll } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  NativeSelect,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const firstPassage =
  "Ich schreibe Ihnen*, um meine Bedenken hinsichtlich der Alternative für Deutschland (AfD) zum Ausdruck zu bringen. Als Bürger*in dieses Landes bin ich besorgt über die Auswirkungen, die diese Partei auf unsere Gesellschaft hat. Ihre politischen Positionen und Rhetorik haben zu einer zunehmenden Polarisierung und Spaltung in unserer Gesellschaft geführt.";
const secondPassage =
  "Es ist wichtig, dass wir als Gesellschaft eine offene und ehrliche Diskussion über die Rolle der AfD in unserer Politik führen. Ich bitte Sie* daher, das Thema eines Verbotsverfahrens gegen die AfD im Bundestag zur Diskussion zu stellen. Es ist von entscheidender Bedeutung, dass wir die Auswirkungen ihrer Politik auf unsere Demokratie und unsere Gesellschaft gründlich untersuchen.";
const thirdPassage =
  "Hier sind drei Argumente, die meiner Meinung nach für ein Verbot der AfD sprechen:";
const fourthPassage =
  "Gefährdung der Demokratie: Die AfD hat wiederholt Positionen vertreten, die den Grundprinzipien unserer Demokratie widersprechen. Dies untergräbt das Vertrauen in unsere demokratischen Institutionen und gefährdet die Stabilität unserer Gesellschaft.";
const fithPassage =
  "Förderung von Hass und Intoleranz: Die AfD hat wiederholt rassistische, queerfeindliche, fremdenfeindliche und islamfeindliche Äußerungen getätigt. Diese Rhetorik trägt zu einer Atmosphäre der Angst und Unsicherheit bei.";
const sixthPassage =
  "Untergrabung des sozialen Zusammenhalts: Die Politik der AfD trägt zur Spaltung unserer Gesellschaft bei. Anstatt den sozialen Zusammenhalt zu fördern, schürt die Partei Konflikte und fördert die Entfremdung zwischen verschiedenen Gruppen in unserer Gesellschaft.";
const seventhPassage =
  "Ich möchte mich in diesem Land sicher und wohl fühlen. Aber die Aktivitäten und die Rhetorik der AfD schaffen eine Atmosphäre in der sich Menschen mit und ohne Migrationshintergrund unsicher fühlen. Ich bitte Sie* daher, diese Angelegenheit ernst zu nehmen und Maßnahmen zu ergreifen, um unsere Gesellschaft zu schützen und unser Grundgesetz zu verteidigen.";
const eigthPassage =
  "Ich verstehe, dass ein Parteiverbot ein drastischer Schritt ist und nicht leichtfertig unternommen werden sollte. Aber ich glaube, dass es angesichts der aktuellen Umstände notwendig ist, diese Option ernsthaft in Betracht zu ziehen und zu prüfen. Ich danke Ihnen* für Ihre Aufmerksamkeit und hoffe, dass Sie* diese Angelegenheit ernst nehmen.";
const emailText = [
  firstPassage,
  secondPassage,
  thirdPassage,
  fourthPassage,
  fithPassage,
  sixthPassage,
  seventhPassage,
  eigthPassage,
];

export default function Letter({ mailAdresses }: { mailAdresses: string }) {
  const [greetingsName, setSetGreetingsName] = useState<string>("");
  const [formOfAdress, setFormOfAdress] = useState<string>(
    "Sehr geehrte*r Bundestagsabgeordnete*r"
  );
  const emailBody = formOfAdress + "\n\n" + emailText.join("\n\n");
  const greetings = "Mit freundlichen Grüßen";
  const mailtoString = `mailto:${mailAdresses}?subject=Meine Bedenken hinsichtlich der AfD&body=${encodeURIComponent(
    emailBody
  )}%0D%0A%0D%0A${greetings},%0D%0A${greetingsName}`;

  return (
    <Paper
      sx={{
        minWidth: "200px",
        padding: "50px",
        margin: "auto",
      }}
      elevation={5}
      square={false}>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: 0,
          margin: 0,
          maxWidth: "100%",
          height: "600px",
          overflow: "auto",
        }}>
        <Typography variant='subtitle2' component='div' sx={{}}>
          Betreff: Meine Bedenken hinsichtlich der AfD
        </Typography>
        <FormControl>
          <NativeSelect
            onChange={(event) => setFormOfAdress(event.target.value)}>
            <option>Sehr geehrte*r Bundestagsabgeordnete*r</option>
            <option>Liebe*r Bundestagsabgeordneter</option>
            <option>Sehr geehrter Damen und Herren</option>
          </NativeSelect>
        </FormControl>
        <Typography variant='body1' align='justify'>
          {firstPassage}
        </Typography>
        <Typography variant='body1' align='justify'>
          {secondPassage}
        </Typography>
        <Typography variant='body1' align='justify'>
          {thirdPassage}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "30px",
          }}>
          <ol>
            <li>
              <Typography variant='body1' align='justify'>
                {fourthPassage}
              </Typography>
            </li>

            <li>
              <Typography variant='body1' align='justify'>
                {fithPassage}
              </Typography>
            </li>
            <li>
              <Typography variant='body1' align='justify'>
                {sixthPassage}
              </Typography>
            </li>
          </ol>
        </Box>
        <Typography variant='body1' align='justify'>
          {seventhPassage}
        </Typography>
        <Typography variant='body1' align='justify'>
          {eigthPassage}
        </Typography>
        <Typography variant='body1' align='justify'>
          {greetings}
        </Typography>
        <TextField
          variant='standard'
          onChange={(event) => setSetGreetingsName(event.target.value)}
          label='Dein Name'
          sx={{ width: "50%" }}></TextField>
      </Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "30px",
          pt: "40px",
        }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            gap: "10px",
          }}>
          <Button
            variant='outlined'
            disabled={mailAdresses === ""}
            endIcon={<CopyAll />}
            onClick={() => {
              navigator.clipboard.writeText(mailAdresses);
            }}>
            Nur Mail-Adressen kopieren
          </Button>
          <Button
            variant='outlined'
            endIcon={<CopyAll />}
            onClick={() => {
              navigator.clipboard.writeText(emailBody + "\n\n" + greetings);
            }}>
            Nur Text kopieren
          </Button>
        </Box>
        <a href={mailtoString}>
          <Button
            sx={{}}
            variant='contained'
            endIcon={<Send />}
            disabled={mailAdresses === ""}>
            Absenden
          </Button>
        </a>
      </Box>
    </Paper>
  );
}
