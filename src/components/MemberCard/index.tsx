import { Box, Card, CardContent, Checkbox, Typography } from "@mui/material";
import { memberList } from "../MemberAutocomplete";

export default function MemberCard({ children }: { children: memberList }) {
  return (
    <Card
      variant='outlined'
      key={children.id}
      sx={{ display: "flex", alignItems: "center" }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {children.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {children.party_long}
        </Typography>
      </CardContent>
      <Box>
        <Checkbox></Checkbox>
      </Box>
    </Card>
  );
}
