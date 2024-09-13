import React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import ColorSchemeToggle from "../atoms/ColorSchemeToggle";
import { useNavigate } from "react-router-dom";

export default function SignHeader() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
    >
      <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
        <IconButton
          variant="soft"
          color="primary"
          size="sm"
          onClick={handleNavigation}
        >
          <KeyboardBackspaceRoundedIcon />
        </IconButton>
      </Box>
      <ColorSchemeToggle />
    </Box>
  );
}
