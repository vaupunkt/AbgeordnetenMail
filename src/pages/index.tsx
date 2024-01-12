import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import ConstituencyAutocomplete, {
  constituencyOption,
} from "@/components/ConstituencyAutocomplete";
import MemberAutocomplete, {
  memberList,
} from "@/components/MemberAutocomplete";
import members from "../data/btw21_members.json" assert { type: "json" };
import constituencies from "../data/btw21_constituencies.json" assert { type: "json" };
import MemberCard from "@/components/MemberCard";

const firstPassage = "Sehr geehrter Bundestagsabgeordneter,";
const secondPassage =
  "Ich schreibe Ihnen, um meine Bedenken hinsichtlich der Alternative für Deutschland (AfD) zum Ausdruck zu bringen. Als Bürger dieses Landes bin ich besorgt über die Auswirkungen, die diese Partei auf unsere Gesellschaft hat. Ihre politischen Positionen und Rhetorik haben zu einer zunehmenden Polarisierung und Spaltung in unserer Gesellschaft geführt.";
const thirdPassage =
  "Es ist wichtig, dass wir als Gesellschaft eine offene und ehrliche Diskussion über die Rolle der AfD in unserer Politik führen. Ich bitte Sie daher, das Thema eines Verbotsverfahrens gegen die AfD im Bundestag zur Diskussion zu stellen. Es ist von entscheidender Bedeutung, dass wir die Auswirkungen ihrer Politik auf unsere Demokratie und unsere Gesellschaft gründlich untersuchen.";
const fourthPassage =
  "Hier sind drei Argumente, die meiner Meinung nach für ein Verbot der AfD sprechen:";
const fithPassage =
  "Gefährdung der Demokratie: Die AfD hat wiederholt Positionen vertreten, die den Grundprinzipien unserer Demokratie widersprechen. Dies untergräbt das Vertrauen in unsere demokratischen Institutionen und gefährdet die Stabilität unserer Gesellschaft.";
const sixthPassage =
  "Förderung von Hass und Intoleranz: Die AfD hat wiederholt rassistische, fremdenfeindliche und islamfeindliche Äußerungen getätigt. Diese Rhetorik fördert Hass und Intoleranz und trägt zu einer Atmosphäre der Angst und Unsicherheit bei.";
const seventhPassage =
  "Untergrabung des sozialen Zusammenhalts: Die Politik der AfD trägt zur Spaltung unserer Gesellschaft bei. Anstatt den sozialen Zusammenhalt zu fördern, schürt die Partei Konflikte und fördert die Entfremdung zwischen verschiedenen Gruppen in unserer Gesellschaft.";
const eigthPassage =
  "Ich möchte mich in diesem Land sicher und wohl fühlen. Aber die Aktivitäten und die Rhetorik der AfD schaffen eine Atmosphäre der Unsicherheit und Angst. Ich bitte Sie daher, diese Angelegenheit ernst zu nehmen und Maßnahmen zu ergreifen, um unsere Gesellschaft zu schützen.";
const ninthPassage =
  "Ich verstehe, dass ein Parteiverbot ein drastischer Schritt ist und nicht leichtfertig unternommen werden sollte. Aber ich glaube, dass es angesichts der aktuellen Umstände notwendig ist, diese Option ernsthaft in Betracht zu ziehen. Ich danke Ihnen für Ihre Aufmerksamkeit und hoffe, dass Sie diese Angelegenheit ernst nehmen.";
const emailText = [
  firstPassage,
  secondPassage,
  thirdPassage,
  fourthPassage,
  fithPassage,
  sixthPassage,
  seventhPassage,
  eigthPassage,
  ninthPassage,
];

export default function Home() {
  const [searchOption, setSearchOption] = useState<string>("");
  const [searchConstituency, setSearchConstituency] = useState<string>("");
  const [searchMember, setSearchMember] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const handleSearchOption = (event: SelectChangeEvent) => {
    setSearchConstituency("");
    setSearchMember([]);
    setSearchOption(event.target.value as string);
    console.log(event.target.value);
  };

  const handleSearchValue = (value: any) => {
    console.log("Value:", value);
    if (searchOption === "member") {
      setSearchMember(value);
      console.log("member:", value);
    } else {
      setSearchConstituency(value);
      console.log("constituency:", value);
    }
  };

  const constituencyOptions: constituencyOption[] = constituencies.map(
    (constituency, index) => ({
      id: index,
      constituency_country_id: Number(constituency["Land"]),
      constituency_id: Number(constituency["Wahlkreis"]),
      constituency_name: constituency["Gemeinde Name"],
    })
  );

  const memberList: memberList[] = members.map((member, index) => ({
    id: index,
    name: member["Vornamen"] + " " + member["Nachname"],
    constituency: {
      constituency_type: member["Gebietsart"],
      constituency_id: Number(member["Gebietsnummer"]),
      constituency_name: member["Gebietsname"],
    },
    party: member["Gruppenname"],
    party_long: member["GruppennameLang"],
    emoji:
      member["Gruppenname"] === ("CSU" || "CDU")
        ? "⚫️"
        : member["Gruppenname"] === "SPD"
        ? "🔴"
        : member["Gruppenname"] === "DIE LINKE"
        ? "🟣"
        : member["Gruppenname"] === "GRÜNE"
        ? "🟢"
        : member["Gruppenname"] === "FDP"
        ? "🟡"
        : member["Gruppenname"] === "AfD"
        ? "🔵"
        : "⚪️",
  }));
  const memberDisplay: memberList[] | null =
    searchMember.length > 0
      ? searchMember.flatMap((member) =>
          memberList.filter((memberItem) => memberItem.id === member.id)
        )
      : null;

  const constituencyMainDisplay: memberList[] | null = memberList.filter(
    (member) =>
      member.constituency.constituency_id +
        " - " +
        member.constituency.constituency_name ===
      searchConstituency
  );

  const constituencyAdditionalDisplay: memberList[] | null = memberList.filter(
    (member) =>
      member.constituency.constituency_type === "Land" &&
      member.constituency.constituency_id ===
        constituencyOptions.find(
          (constituency) =>
            constituency.constituency_id +
              " - " +
              constituency.constituency_name ===
            searchConstituency
        )?.constituency_country_id
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Container
          maxWidth={false}
          sx={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "50px",
            marginBottom: "50px",
          }}>
          <FormControl
            sx={{ width: "500px", textAlign: "center", margin: "auto" }}>
            <InputLabel id='selectSearchOption'>
              Suche deine*n Abgeordnete*n
            </InputLabel>
            <Select
              labelId='selectSearchOption'
              id='selectSearchOption'
              value={searchOption}
              onChange={(event) => handleSearchOption(event)}>
              <MenuItem value={"member"}>Namen</MenuItem>
              <MenuItem value={"community"}>Gemeinde / Wahlkreis</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ margin: "auto" }}>
            {searchOption === "community" ? (
              <ConstituencyAutocomplete handleSearchValue={handleSearchValue} />
            ) : searchOption === "member" ? (
              <MemberAutocomplete handleSearchValue={handleSearchValue} />
            ) : null}
          </Box>
        </Container>
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "100vw",
            justifyContent: "center",
          }}>
          {searchOption === "community" && constituencyMainDisplay
            ? constituencyMainDisplay.map((member) => (
                <MemberCard key={member.id}>{member}</MemberCard>
              ))
            : null}
          {searchOption === "member" && memberDisplay
            ? memberDisplay.map((member) => (
                <MemberCard key={member.id}>{member}</MemberCard>
              ))
            : null}
          {constituencyAdditionalDisplay.length > 0 ? (
            <Typography
              variant='h5'
              component='div'
              sx={{ width: "100vw", textAlign: "center" }}>
              Vielleicht interessieren sich auch diese Abgeordneten für deine
              Nachricht:
            </Typography>
          ) : null}
          {searchOption === "community" && constituencyAdditionalDisplay
            ? constituencyAdditionalDisplay.map((member) => (
                <MemberCard key={member.id}>{member}</MemberCard>
              ))
            : null}
        </Container>
        <Container maxWidth={false}>
          <Paper
            sx={{
              maxWidth: "800px",
              width: "70vw",
              minWidth: "200px",
              padding: "40px",
              margin: "auto",
            }}
            square={false}>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyItems: "center",
                flexDirection: "column",
              }}>
              <Typography
                variant='subtitle2'
                component='div'
                sx={{ paddingLeft: "30px" }}>
                Betreff:
              </Typography>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                <Typography>{firstPassage}</Typography>
                <Typography variant='body1' align='justify'>
                  {secondPassage}
                </Typography>
                <Typography variant='body1' align='justify'>
                  {thirdPassage}
                </Typography>
                <Typography variant='body1' align='justify'>
                  {fourthPassage}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "30px",
                  }}>
                  <ol>
                    <Typography variant='body1' align='justify'>
                      <li>{fithPassage}</li>
                    </Typography>
                    <Typography variant='body1' align='justify'>
                      <li>{sixthPassage}</li>
                    </Typography>
                    <Typography variant='body1' align='justify'>
                      <li>{seventhPassage}</li>
                    </Typography>
                  </ol>
                </Box>
                <Typography variant='body1' align='justify'>
                  {eigthPassage}
                </Typography>
                <Typography variant='body1' align='justify'>
                  {ninthPassage}
                </Typography>
              </Container>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}>
              <Button sx={{}} variant='contained'>
                Absenden
              </Button>
            </Box>
          </Paper>
        </Container>
      </main>
    </>
  );
}
