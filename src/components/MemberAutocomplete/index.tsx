import { Checkbox, TextField } from "@mui/material";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import members from "../../data/btw21_members.json" assert { type: "json" };
import { CheckBox, CheckBoxOutlineBlankOutlined } from "@material-ui/icons";

export type memberList = {
  id: number;
  name: string;
  email: string;
  constituency: {
    constituency_type: string;
    constituency_id: number;
    constituency_name: string;
  };
  party: string;
  party_long: string;
  emoji: string;
};

const icon = <CheckBoxOutlineBlankOutlined fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

export default function MemberAutocomplete({
  handleSearchValue,
  afdFilter,
}: {
  handleSearchValue: (
    value: {
      id: number;
      name: string;
    }[]
  ) => void;
  afdFilter: boolean;
}) {
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

  const memberOptions = memberList
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .map((member) => ({
      id: member.id,
      name: member.emoji + " " + member.name,
    }));

  return (
    <Autocomplete
      sx={{ width: "50vw", margin: "auto" }}
      multiple
      id='checkboxes-tags-demo'
      options={memberOptions}
      disableCloseOnSelect
      disableListWrap
      limitTags={2}
      groupBy={(options) => options.name[3].toUpperCase()}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(event, value) => handleSearchValue(value)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label='Bundestagsabgeordnete'
        />
      )}
    />
  );
}

export function createEmail(member: any): string {
  let vorname = member["Vornamen"].split(" ")[0];
  let nachname = member["Nachname"];
  let namenszusatz = member["Namenszusatz"];

  // Umlaute und spezielle Zeichen ersetzen
  vorname = vorname
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/ğ/g, "g");
  nachname = nachname
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/ğ/g, "g");

  // Namenszusatz hinzufügen, falls vorhanden
  if (namenszusatz) {
    nachname = namenszusatz + nachname;
  }

  // E-Mail-Adresse erstellen
  let email = vorname + "." + nachname + "@bundestag.de";

  return email;
}
