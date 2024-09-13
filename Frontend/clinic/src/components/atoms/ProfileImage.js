import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";

export default function ProfileImage() {
  return (
    <AspectRatio
      ratio="1"
      maxHeight={150}
      sx={{
        flex: 1,
        minWidth: 90,
        maxWidth: 150,
        borderRadius: "100%",
      }}
    >
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        loading="lazy"
        alt="User avatar"
      />
    </AspectRatio>
  );
}
