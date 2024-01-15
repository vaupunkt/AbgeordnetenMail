import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

export default function MoreInformation() {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1-content'
          id='panel1-header'>
          Wozu das ganze?
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1'>
            Meine Idee war es, eine Plattform zu schaffen, die es Bürger*innen
            ermöglicht, ihre Vertreter*innen im Bundestag auf einfache Weise zu
            erreichen und sie über das Verbot der AfD zu informieren. Es gibt
            bereits eine <a href='https://innn.it/afdverbot'>Petition</a>, die
            sich für ein Verbot der AfD einsetzt und bisher mehr als 600.000
            Unterschriften gesammeln konnte. Diese Website soll als zusätzliches
            Angebot dienen, um die Botschaft weiter zu verbreiten und mehr
            Menschen zu erreichen. Sie ermöglicht den Nutzer*innen,
            Bundestagsmitglieder nach Namen oder Wahlkreis zu suchen und ihnen
            eine vorformulierte E-Mail über das AfD-Verbot zu senden. Auf diese
            Weise hoffe ich, einen Beitrag zur politischen Diskussion zu
            leisten.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel2-content'
          id='panel2-header'>
          Wie funktioniert das?
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body1'>
            Die Nutzung dieser Website ist total einfach und sicher. Du wählst
            erst die Suchoption “Namen” oder “Gemeinde / Wahlkreis” aus. Dann
            gibst du den Namen des Mitglieds oder den Namen des Wahlkreises ein,
            den du suchst. Aus der Ergebnisliste wählst du die Mitglieder aus,
            die du kontaktieren möchtest, und klickst auf den Button “Schreibe
            deinen Abgeordneten*innen”, um den Brief zu senden.
          </Typography>
          <Typography variant='body1'>
            Ein wichtiger Aspekt dieser Website ist der Datenschutz. Es werden
            keine persönlichen Daten auf der Website gesammelt. Wenn du auf den
            &quot;Absenden&quot; Button klickst, wird alles direkt an dein
            eigenes E-Mail-Programm weitergeleitet durch einen mailTo-Link. Das
            bedeutet, dass deine E-Mail-Adresse und der Inhalt der E-Mail nur in
            deinem eigenen E-Mail-Programm gespeichert werden und nicht auf der
            Website. So kannst du sicher sein, dass deine persönlichen Daten
            geschützt sind.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
