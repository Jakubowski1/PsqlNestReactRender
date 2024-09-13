import { FormControl, Input, FormLabel } from "@mui/joy";
import React, { Fragment } from "react";

export default function ProfileSurnameInput({ profile, handleChange }) {
  return (
    <Fragment>
      <FormControl sx={{ flexGrow: 1 }}>
        <FormLabel>Surname</FormLabel>

        <Input
          size="sm"
          name="surname"
          value={profile.surname}
          onChange={handleChange}
          placeholder="Last name"
        />
      </FormControl>
    </Fragment>
  );
}
