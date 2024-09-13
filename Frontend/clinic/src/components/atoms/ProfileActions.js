import React from "react";
import { Button, CardActions } from "@mui/joy";

export default function ProfileActions({ navigate, handleSave }) {
  return (
    <CardActions sx={{ alignSelf: "flex-end", pt: 2, gap: 2 }}>
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button
        size="sm"
        variant="outlined"
        sx={{ border: "2px solid #32383E", color: "#32383E" }}
        onClick={handleSave}
      >
        Save
      </Button>
    </CardActions>
  );
}
