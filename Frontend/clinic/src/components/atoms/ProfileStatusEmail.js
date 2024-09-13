import React from "react";
import {
  Stack,
  FormControl,
  Input,
  FormLabel,
  Checkbox,
  Typography,
} from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

export default function ProfileStatusEmail({
  profile,
  handleChange,
  setProfile,
}) {
  return (
    <Stack direction="row" spacing={2}>
      <FormControl sx={{ flexGrow: 1 }}>
        <FormLabel>Activation</FormLabel>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Sheet
            color={profile.isActive ? "success" : "danger"}
            variant="soft"
            sx={{ p: 0.5, pl: 2, pr: 10, borderRadius: 10 }}
          >
            <Checkbox
              size="sm"
              name="isActive"
              color={profile.isActive ? "success" : "danger"}
              overlay
              label={
                !profile.isActive ? (
                  <Typography sx={{ color: "red" }}>Disabled</Typography>
                ) : (
                  <Typography sx={{ color: "green" }}>Activated</Typography>
                )
              }
              checked={profile.isActive}
              onChange={(e) =>
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  isActive: e.target.checked,
                }))
              }
            />
          </Sheet>
        </Stack>
      </FormControl>

      <FormControl sx={{ flexGrow: 1 }}>
        <FormLabel>Email</FormLabel>
        <Input
          size="sm"
          type="email"
          name="email"
          startDecorator={<EmailRoundedIcon />}
          value={profile.email}
          onChange={handleChange}
        />
      </FormControl>
    </Stack>
  );
}
