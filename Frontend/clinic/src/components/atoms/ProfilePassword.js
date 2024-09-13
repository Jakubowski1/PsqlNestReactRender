import React, { Fragment } from "react";
import { Stack, FormControl, Input, FormLabel } from "@mui/joy";

export default function ProfilePassword({ profile, handleChange }) {
  return (
    <Fragment>
      <FormControl sx={{ flexGrow: 1 }}>
        <FormLabel sx={{ color: "#FE5050" }}>Reset password</FormLabel>

        <Input
          color="danger"
          size="sm"
          name="password"
          value=""
          onChange={handleChange}
          placeholder="New password"
        />
      </FormControl>
    </Fragment>
  );
}
