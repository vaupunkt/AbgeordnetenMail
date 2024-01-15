import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  NativeSelect,
  Switch,
  Typography,
} from "@mui/material";
import Head from "next/head";
import * as React from "react";
import { useState } from "react";
import ConstituencyAutocomplete, {
  constituencyOption,
} from "@/components/ConstituencyAutocomplete";
import MemberAutocomplete, {
  createEmail,
  memberList,
} from "@/components/MemberAutocomplete";
import members from "../data/btw21_members.json" assert { type: "json" };
import constituencies from "../data/btw21_constituencies.json" assert { type: "json" };
import MemberCard from "@/components/MemberCard";
import Letter from "@/components/Letter";
import Footer from "@/components/Footer";
import MoreInformation from "@/components/MoreInformation";

export default function Home() {
  const [searchOption, setSearchOption] = useState<string>("member");
  const [searchConstituency, setSearchConstituency] = useState<string>("");
  const [searchMember, setSearchMember] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [selectedMember, setSelectedMember] = useState<memberList[]>([]);
  const [afdFilter, setAfdFilter] = useState<boolean>(true);

  const handleSearchOption = (event: React.BaseSyntheticEvent) => {
    setSearchConstituency("");
    setSearchMember([]);
    setSelectedMember([]);
    setSearchOption(event.target.value);
  };

  const handleSearchValue = (value: any) => {
    if (searchOption === "member") {
      setSearchMember(value);
      setSelectedMember(memberDisplay);
    } else {
      setSearchConstituency(value);
      setSelectedMember([]);
    }
  };

  const handleMemberSelection = (member: memberList) => {
    const isMemberSelected = selectedMember.find(
      (item) => item.id === member.id
    );
    isMemberSelected
      ? setSelectedMember(
          selectedMember.filter((item) => item.id !== member.id)
        )
      : setSelectedMember([...selectedMember, member]);
  };

  const constituencyOptions: constituencyOption[] = constituencies.map(
    (constituency, index) => ({
      id: index,
      constituency_country_id: Number(constituency["Land"]),
      constituency_id: Number(constituency["Wahlkreis"]),
      constituency_name: constituency["Gemeinde Name"],
    })
  );

  const memberList: memberList[] = members
    .map((member, index) => ({
      id: index,
      name: member["Vornamen"] + " " + member["Nachname"],
      email: createEmail(member),
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
    }))
    .filter((member) => afdFilter === false || member.party !== "AfD");

  const memberDisplay: memberList[] =
    searchMember.length > 0
      ? searchMember.flatMap((member) =>
          memberList.filter((memberItem) => memberItem.id === member.id)
        )
      : [];

  const constituencyMainDisplay: memberList[] = memberList
    .filter(
      (member) =>
        member.constituency.constituency_id +
          " - " +
          member.constituency.constituency_name ===
        searchConstituency
    )
    .filter((member) => afdFilter === false || member.party !== "AfD");

  const constituencyAdditionalDisplay: memberList[] = memberList
    .filter(
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
    )
    .filter((member) => afdFilter === false || member.party !== "AfD");

  const mailAdresses: string = selectedMember
    .map((member) => member.email)
    .join(",");

  return (
    <>
      <Head>
        <title>Schreibe deine*n Abgeordnet*innen</title>
        <meta
          name='description'
          content='Send an e-mail about your thoughts on the AFD ban to member of the German Bundestag'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>📬</text></svg>'
        />
      </Head>
      <Container
        maxWidth={false}
        sx={{
          overflow: "auto",
          paddingRight: "0px !important",
          paddingLeft: "0px !important",
          maxWidth: "100%",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
        aria-label='Main Container'>
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
            padding: "0 10px",
            margin: "auto",
          }}>
          <FormControl sx={{ textAlign: "center", maxWidth: "300px" }}>
            <NativeSelect
              id='selectSearchOption'
              defaultValue='member'
              onChange={(event) => handleSearchOption(event)}>
              <option value={"member"}>Namen</option>
              <option value={"community"}>Gemeinde / Wahlkreis</option>
            </NativeSelect>
          </FormControl>
          <FormControlLabel
            control={<Switch onChange={() => setAfdFilter(!afdFilter)} />}
            label='mit AFD'
          />
        </Box>
        <Box sx={{ width: "100%", padding: "0 10px" }}>
          {searchOption === "community" ? (
            <ConstituencyAutocomplete handleSearchValue={handleSearchValue} />
          ) : searchOption === "member" ? (
            <MemberAutocomplete
              memberList={memberList}
              handleSearchValue={handleSearchValue}
            />
          ) : null}
        </Box>
      </Container>
      <Container
        id='memberCardContainer'
        maxWidth={false}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "100vw",
          justifyContent: "center",
        }}>
        {constituencyMainDisplay.length > 0 ? (
          <Typography
            variant='h5'
            component='div'
            sx={{ width: "100vw", textAlign: "center" }}>
            Direktmandat:
          </Typography>
        ) : null}
        {searchOption === "community" && constituencyMainDisplay
          ? constituencyMainDisplay.map((member) => (
              <MemberCard
                handleMemberSelection={handleMemberSelection}
                key={member.id}>
                {member}
              </MemberCard>
            ))
          : null}
        {searchOption === "member" && memberDisplay
          ? memberDisplay.map((member) => (
              <MemberCard
                handleMemberSelection={handleMemberSelection}
                key={member.id}>
                {member}
              </MemberCard>
            ))
          : null}
        {constituencyAdditionalDisplay.length > 0 ? (
          <Typography
            variant='h5'
            component='div'
            sx={{ width: "100vw", textAlign: "center" }}>
            Vielleicht interessieren sich auch andere Abgeordneten aus der
            Landesliste für deine Nachricht:
          </Typography>
        ) : null}
        {searchOption === "community" && constituencyAdditionalDisplay
          ? constituencyAdditionalDisplay.map((member) => (
              <MemberCard
                handleMemberSelection={handleMemberSelection}
                key={member.id}>
                {member}
              </MemberCard>
            ))
          : null}
      </Container>
      <Container
        id='letterContainer'
        sx={{ maxWidth: "900px", margin: "40px auto" }}
        maxWidth={false}>
        <Letter mailAdresses={mailAdresses} />
      </Container>
      <Container
        maxWidth={false}
        sx={{
          minWidth: "200px",
          maxWidth: "900px",
          margin: "40px auto",
        }}>
        <MoreInformation />
      </Container>
      <Container
        maxWidth={false}
        sx={{
          boxShadow: "0 0 2px 5px #dcdcdc",
          backgroundColor: "#dcdcdc",
          width: "100%",
          padding: "10px",
          margin: 0,
        }}>
        <Footer></Footer>
      </Container>
    </>
  );
}
