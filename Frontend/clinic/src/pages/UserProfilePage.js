import React from "react";
import ResponsiveAppBar from "../components/organisms/NavigationManager";
import MyProfile from "../components/organisms/MyProfile";
import MovingGradientBackground from "../components/wrappers/MovingGradientBackground";

export default function UserProfilePage() {
  return (
    <MovingGradientBackground>
      <ResponsiveAppBar />
      <MyProfile />
    </MovingGradientBackground>
  );
}
