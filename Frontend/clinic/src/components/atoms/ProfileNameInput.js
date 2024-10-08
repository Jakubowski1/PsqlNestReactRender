import React, { Fragment } from "react";
import { Stack, FormControl, Input, FormLabel } from "@mui/joy";

export default function ProfileNameInput({ profile, handleChange }) {
  return (
    <Fragment>
      <FormControl sx={{ flexGrow: 1 }}>
        <FormLabel>Name</FormLabel>

        <Input
          size="sm"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="First name"
        />
      </FormControl>
    </Fragment>
  );
}
