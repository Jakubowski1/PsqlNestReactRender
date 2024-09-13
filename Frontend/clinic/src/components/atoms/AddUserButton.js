import React from "react";
import { Button } from "@mui/joy";
import Add from "@mui/icons-material/Add";

export default function AddUserButton({ role, onClick }) {
  return (
    <Button
      variant="outlined"
      sx={{ color: "#32383E", border: "2px solid #32383E " }}
      startDecorator={<Add />}
      onClick={() => onClick(role)}
    >
      Add {role.charAt(0).toUpperCase() + role.slice(1)}
    </Button>
  );
}
