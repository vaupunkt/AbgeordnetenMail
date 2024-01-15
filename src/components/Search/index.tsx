import {
  Box,
  FormControl,
  FormControlLabel,
  NativeSelect,
  Switch,
} from "@mui/material";
import ConstituencyAutocomplete from "../ConstituencyAutocomplete";
import MemberAutocomplete from "../MemberAutocomplete";

export default function Search({
  handleSearchOption,
  handleSearchValue,
  searchOption,
  memberList,
  afdFilter,
  setAfdFilter,
}: {
  handleSearchOption: (event: React.BaseSyntheticEvent) => void;
  handleSearchValue: (value: any) => void;
  searchOption: string;
  memberList: any;
  afdFilter: boolean;
  setAfdFilter: (value: boolean) => void;
}) {
  return (
    <>
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
    </>
  );
}
