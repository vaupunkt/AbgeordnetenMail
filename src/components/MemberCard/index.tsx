import { Box, Card, CardContent, Typography } from "@mui/material";
import { memberList } from "../MemberAutocomplete";
import { useState } from "react";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@material-ui/icons";

export default function MemberCard({
  children,
  handleMemberSelection,
}: {
  children: memberList;
  handleMemberSelection: (member: memberList) => void;
}) {
  const [checked, setChecked] = useState(false);

  const handleCheck = (children: memberList) => {
    setChecked(!checked);
    handleMemberSelection(children);
  };

  let parteienFarben: { [key: string]: string } = {
    SPD: "#FF7F7F", // Pastelliges Rot
    CDU: "#9e9e9e", // Pastelliges Schwarz
    CSU: "#9e9e9e", // Pastelliges Schwarz
    GRÜNE: "#90EE90", // Pastelliges Grün
    FDP: "#FFFFE0", // Pastelliges Gelb
    AfD: "#ADD8E6", // Pastelliges Blau
    "DIE LINKE": "#FFB6C1", // Pastelliges Pink
  };

  return (
    <Card
      onClick={() => handleCheck(children)}
      variant='outlined'
      key={children.id}
      sx={{
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease-in-out",
        background:
          checked && children.party in parteienFarben
            ? parteienFarben[children.party]
            : "#fff",
        cursor: "pointer",
        "&:hover": {
          background:
            children.party in parteienFarben
              ? parteienFarben[children.party]
              : "#fff",
        },
      }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {children.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {children.party_long}
        </Typography>
      </CardContent>
      <Box sx={{ paddingRight: "10px" }}>
        {checked ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
      </Box>
    </Card>
  );
}
