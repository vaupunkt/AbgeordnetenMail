import { CopyAll, Send } from "@mui/icons-material";
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
import { useEffect, useState } from "react";

const firstPassage = [
  "Ich schreibe Ihnen*, um meine Bedenken hinsichtlich der Alternative für Deutschland (AfD) zum Ausdruck zu bringen. Als Bürger*in dieses Landes bin ich besorgt über die Auswirkungen, die diese Partei auf unsere Gesellschaft hat. Ihre politischen Positionen und Rhetorik haben zu einer zunehmenden Polarisierung und Spaltung in unserer Gesellschaft geführt.",
  "Ich schreibe Ihnen*, um meine Sorgen über die Alternative für Deutschland (AfD) zu teilen. Als Einwohner*in dieses Landes bin ich alarmiert über die Auswirkungen, die diese Partei auf unser gesellschaftliches Gefüge hat. Ihre politischen Ansichten und ihre Rhetorik haben zu einer verstärkten Polarisierung und Spaltung in unserer Gemeinschaft beigetragen.",
  "Ich schreibe Ihnen*, um meine innere Unruhe über die Alternative für Deutschland (AfD) zu äußern. Als Bewohner*in dieses Landes bin ich beunruhigt über die Folgen, die diese Partei auf unser gesellschaftliches Zusammenleben hat. Ihre politischen Standpunkte und ihre Sprache haben zu einer wachsenden Polarisierung und Zersplitterung in unserer Gesellschaft geführt.",
];
const secondPassage = [
  "Es ist wichtig, dass wir als Gesellschaft eine offene und ehrliche Diskussion über die Rolle der AfD in unserer Politik führen. Ich bitte Sie* daher, das Thema eines Verbotsverfahrens gegen die AfD im Bundestag zur Diskussion zu stellen. Es ist von entscheidender Bedeutung, dass wir die Auswirkungen ihrer Politik auf unsere Demokratie und unsere Gesellschaft gründlich untersuchen.",
  "Es ist von Bedeutung, dass wir als Gemeinschaft eine offene und aufrichtige Debatte über die Rolle der AfD in unserer Politik führen. Ich bitte Sie* daher, das Thema eines Verbotsverfahrens gegen die AfD im Bundestag zur Debatte zu stellen. Es ist von größter Wichtigkeit, dass wir die Konsequenzen ihrer Politik auf unsere Demokratie und unsere Gemeinschaft gründlich prüfen.",
  "Es ist wesentlich, dass wir als Gesellschaft einen offenen und ehrlichen Dialog über die Rolle der AfD in unserer Politik haben. Ich bitte Sie* daher, das Thema eines Verbotsverfahrens gegen die AfD im Bundestag zur Erörterung zu bringen. Es ist von größter Bedeutung, dass wir die Auswirkungen ihrer Politik auf unsere Demokratie und unsere Gesellschaft eingehend analysieren.",
];
const thirdPassage = [
  "Hier sind drei Argumente, die meiner Meinung nach für ein Verbot der AfD sprechen:",
  "Hier sind drei Argumente, die meiner Ansicht nach für ein Verbot der AfD sprechen:",
  "Hier sind drei Gründe, die meiner Meinung nach für ein Verbot der AfD sprechen:",
];
const fourthPassage = [
  "Gefährdung der Demokratie: Die AfD hat wiederholt Positionen vertreten, die den Grundprinzipien unserer Demokratie widersprechen. Dies untergräbt das Vertrauen in unsere demokratischen Institutionen und gefährdet die Stabilität unserer Gesellschaft.",
  "Bedrohung der Demokratie: Die AfD hat wiederholt Positionen eingenommen, die den Grundwerten unserer Demokratie zuwiderlaufen. Dies untergräbt das Vertrauen in unsere demokratischen Institutionen und bedroht die Stabilität unserer Gemeinschaft.",
  "Gefahr für die Demokratie: Die AfD hat wiederholt Standpunkte vertreten, die den Grundprinzipien unserer Demokratie entgegenstehen. Dies schwächt das Vertrauen in unsere demokratischen Institutionen und gefährdet die Stabilität unserer Gesellschaft.",
];
const fithPassage = [
  "Förderung von Hass und Intoleranz: Die AfD hat wiederholt rassistische, queerfeindliche, fremdenfeindliche und islamfeindliche Äußerungen getätigt. Diese Rhetorik trägt zu einer Atmosphäre der Angst und Unsicherheit bei.",
  "Anstachelung von Hass und Intoleranz: Die AfD hat wiederholt rassistische, queerfeindliche, fremdenfeindliche und islamfeindliche Aussagen gemacht. Diese Rhetorik trägt zu einer Atmosphäre der Furcht und Unsicherheit bei.",
  "Schüren von Hass und Intoleranz: Die AfD hat wiederholt rassistische, queerfeindliche, fremdenfeindliche und islamfeindliche Bemerkungen gemacht. Diese Rhetorik trägt zu einer Atmosphäre der Angst und Unsicherheit bei.",
];
const sixthPassage = [
  "Untergrabung des sozialen Zusammenhalts: Die Politik der AfD trägt zur Spaltung unserer Gesellschaft bei. Anstatt den sozialen Zusammenhalt zu fördern, schürt die Partei Konflikte und fördert die Entfremdung zwischen verschiedenen Gruppen in unserer Gesellschaft.",
  "Schwächung des sozialen Zusammenhalts: Die AfD-Politik führt zur Zersplitterung unserer Gemeinschaft. Statt den sozialen Zusammenhalt zu stärken, provoziert die Partei Auseinandersetzungen und fördert die Entfremdung zwischen verschiedenen gesellschaftlichen Gruppen.",
  "Zerstörung des sozialen Zusammenhalts: Die Politik der AfD trägt zur Spaltung unserer Gesellschaft bei. Anstatt den sozialen Zusammenhalt zu stärken, schürt die Partei Konflikte und fördert die Entfremdung zwischen verschiedenen Gruppen in unserer Gesellschaft.",
];
const seventhPassage = [
  "Ich möchte mich in diesem Land sicher und wohl fühlen. Aber die Aktivitäten und die Rhetorik der AfD schaffen eine Atmosphäre in der sich Menschen mit und ohne Migrationshintergrund unsicher fühlen. Ich bitte Sie* daher, diese Angelegenheit ernst zu nehmen und Maßnahmen zu ergreifen, um unsere Gesellschaft zu schützen und unser Grundgesetz zu verteidigen.",
  "Ich strebe danach, mich in diesem Land sicher und geborgen zu fühlen. Doch die Handlungen und die Rhetorik der AfD erzeugen eine Atmosphäre, in der sich Menschen, unabhängig von ihrem Migrationshintergrund, unsicher fühlen. Ich bitte Sie* daher, diese Angelegenheit ernst zu nehmen und Maßnahmen zu ergreifen, um unsere Gesellschaft zu schützen und unser Grundgesetz zu verteidigen.",
  "Ich wünsche mir, in diesem Land sicher und unbesorgt zu leben. Aber die Aktivitäten und die Rhetorik der AfD erzeugen eine Atmosphäre der Unsicherheit für Menschen mit und ohne Migrationshintergrund. Ich bitte Sie* daher, diese Angelegenheit ernst zu nehmen und Maßnahmen zu ergreifen, um unsere Gesellschaft zu schützen und unser Grundgesetz zu verteidigen.",
];

const eigthPassage = [
  "Ich bin mir bewusst, dass das Verbot einer Partei ein radikaler Schritt ist, der nicht ohne gründliche Überlegung getroffen werden sollte. Angesichts der gegenwärtigen Situation halte ich es jedoch für notwendig, diese Möglichkeit ernsthaft zu prüfen. Ich danke Ihnen* für Ihre Aufmerksamkeit und hoffe auf Ihr* Verständnis für die Dringlichkeit dieser Angelegenheit.",
  "Mir ist klar, dass ein Parteiverbot ein schwerwiegender Eingriff ist und nicht unüberlegt erfolgen sollte. Dennoch bin ich der Ansicht, dass wir angesichts der aktuellen Lage diese Option ernsthaft in Erwägung ziehen und prüfen müssen. Ich danke Ihnen* für Ihre Aufmerksamkeit und hoffe, dass Sie* die Bedeutung dieser Angelegenheit erkennen.",
  "Ich erkenne an, dass das Verbot einer Partei ein drastischer Schritt ist, der nicht leichtfertig unternommen werden sollte. Aber ich bin der Meinung, dass es angesichts der aktuellen Umstände notwendig ist, diese Option ernsthaft zu prüfen. Ich danke Ihnen* für Ihre Aufmerksamkeit und hoffe, dass Sie* die Wichtigkeit dieser Angelegenheit verstehen.",
];
const passages = [
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
  const [emailText, setEmailText] = useState<string[]>([]);

  useEffect(() => {
    const newEmailText: string[] = [];
    for (let i = 0; i < passages.length; i++) {
      let randomIndex = Math.floor(Math.random() * 2);
      newEmailText.push(passages[i][randomIndex]);
    }
    setEmailText(newEmailText);
  }, []);

  const emailBody = emailText
    ? formOfAdress + "\n\n" + emailText.join("\n\n")
    : "";
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
          {emailText[0]}
        </Typography>
        <Typography variant='body1' align='justify'>
          {emailText[1]}
        </Typography>
        <Typography variant='body1' align='justify'>
          {emailText[2]}
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
                {emailText[3]}
              </Typography>
            </li>

            <li>
              <Typography variant='body1' align='justify'>
                {emailText[4]}
              </Typography>
            </li>
            <li>
              <Typography variant='body1' align='justify'>
                {emailText[5]}
              </Typography>
            </li>
          </ol>
        </Box>
        <Typography variant='body1' align='justify'>
          {emailText[6]}
        </Typography>
        <Typography variant='body1' align='justify'>
          {emailText[7]}
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
