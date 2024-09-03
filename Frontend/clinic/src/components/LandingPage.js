import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexWrap: { xs: "wrap", md: "nowrap" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: "24px", md: "100px" },
        height: "100vh",
        padding: "0 24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "left",
          width: { xs: "100%", md: "60%" },
          mb: { xs: 4, md: 0 },
        }}
      >
        <Typography
          variant="POSTER"
          color="#043c84"
          component="h1"
          gutterBottom
        >
          SOFTTECO HEALTH CENTER
        </Typography>
        <Typography variant="h5" color="#043c84" component="p" gutterBottom>
          Your health is our priority. Sign up or sign in to get started.
        </Typography>
        <Box mt={4}>
          <Button
            variant="solid"
            color="primary"
            component={Link}
            to="/signup"
            sx={{ marginRight: 2 }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/signin"
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "40%" },
          height: { xs: "50vh" },
        }}
      >
        <iframe
          src="https://lottie.host/embed/e4f15dc9-90be-4ae4-9828-31db2c621712/se9MDroZoc.json"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "500px",
            border: "none",
          }}
          title="Clinic Animation"
        ></iframe>
      </Box>
    </Container>
  );
};

export default LandingPage;
