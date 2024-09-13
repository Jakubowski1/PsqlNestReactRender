import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Typography level="body-xs" sx={{ textAlign: "center" }}>
        © Mateusz Jakubowski {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
