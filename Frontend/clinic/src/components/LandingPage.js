import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Clinic
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Your health is our priority. Sign up or sign in to get started.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
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
    </Container>
  );
};

export default LandingPage;
