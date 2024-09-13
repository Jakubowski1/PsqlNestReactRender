import React from "react";
import { Box } from "@mui/joy";

export default function Card({ children }) {
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: " blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: 2,
        width: "auto",
        marginBottom: 1.5,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}
