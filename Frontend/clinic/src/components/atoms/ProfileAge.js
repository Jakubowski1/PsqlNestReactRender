import React, { Fragment } from "react";
import { Stack, FormControl, Input, FormLabel } from "@mui/joy";

export default function ProfileAge({ profile, handleChange }) {
  return (
    <Fragment>
      <FormControl sx={{ flexGrow: 1 }}>
        <FormLabel>User's age</FormLabel>

        <Input
          size="sm"
          name="age"
          value={profile.age}
          onChange={handleChange}
          placeholder="Age"
        />
      </FormControl>
    </Fragment>
  );
}
