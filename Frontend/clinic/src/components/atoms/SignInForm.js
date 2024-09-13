import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { handleSignInSubmit } from "../../services/signInService";
export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook here

  return (
    <Stack sx={{ gap: 4, mt: 2 }}>
      <Typography level="h2">Sign In</Typography>

      <Typography level="body-sm">
        New patient?{" "}
        <Link href="/signup" level="title-sm">
          Sign up!
        </Link>
      </Typography>

      <form
        onSubmit={(event) =>
          handleSignInSubmit(event, setErrorMessage, navigate)
        }
      >
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input name="email" />
        </FormControl>

        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />
        </FormControl>

        <Stack sx={{ gap: 4, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox size="sm" label="Remember me" name="persistent" />
            <Link level="title-sm" href="#replace-with-a-link">
              Forgot your password?
            </Link>
          </Box>

          {errorMessage && (
            <Typography level="body-sm" color="error">
              {errorMessage}
            </Typography>
          )}

          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
