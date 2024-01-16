import * as React from "react";
import { Checkbox, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  CheckBoxOutlined,
} from "@mui/icons-material";

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

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

export default function MemberAutocomplete({
  memberList,
  handleSearchValue,
}: {
  handleSearchValue: (
    value: {
      id: number;
      name: string;
    }[]
  ) => void;
  memberList: memberList[];
}) {
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
      sx={{ maxWidth: "500px", margin: "auto" }}
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
    .replace(/ğ/g, "g")
    .replace(/á|à|â/g, "a")
    .replace(/é|è|ê/g, "e")
    .replace(/í|ì|î/g, "i")
    .replace(/ó|ò|ô/g, "o")
    .replace(/ú|ù|û/g, "u")
    .replace(/ç/g, "c")
    .replace(/ñ/g, "n");
  nachname = nachname
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/ğ/g, "g")
    .replace(/á|à|â/g, "a")
    .replace(/é|è|ê/g, "e")
    .replace(/í|ì|î/g, "i")
    .replace(/ó|ò|ô/g, "o")
    .replace(/ú|ù|û/g, "u")
    .replace(/ç/g, "c")
    .replace(/ñ/g, "n");

  // Namenszusatz hinzufügen, falls vorhanden
  if (namenszusatz) {
    nachname = namenszusatz + nachname;
  }

  // E-Mail-Adresse erstellen
  let email = vorname + "." + nachname + "@bundestag.de";

  return email;
}
