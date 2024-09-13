import React from "react";
import { Stack, FormControl, Input, FormLabel } from "@mui/joy";

export default function ProfileNameInput({ profile, handleChange }) {
  return (
    <Stack spacing={1}>
      <FormLabel>Name</FormLabel>
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ flexGrow: 1 }}>
          <Input
            size="sm"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="First name"
          />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <Input
            size="sm"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
            placeholder="Last name"
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
