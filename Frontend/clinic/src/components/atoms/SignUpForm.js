// src/components/atoms/SignUpForm.js
import React, { useState } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Typography,
  Link,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { handleSignUpSubmit } from "../../services/signUpService";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <Stack sx={{ gap: 4, mt: 0 }}>
      <Typography level="h2">Sign Up</Typography>

      <Typography level="body-sm">
        Already have an account?{" "}
        <Link href="/signin" level="title-sm">
          Sign in!
        </Link>
      </Typography>

      <form
        onSubmit={(event) =>
          handleSignUpSubmit(event, setErrorMessage, navigate)
        }
      >
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input name="email" />
        </FormControl>

        <FormControl required>
          <FormLabel>Name</FormLabel>
          <Input name="name" />
        </FormControl>

        <FormControl required>
          <FormLabel>Surname</FormLabel>
          <Input name="surname" />
        </FormControl>

        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />
        </FormControl>

        <FormControl required>
          <FormLabel>Repeat Password</FormLabel>
          <Input type="password" name="password2" />
        </FormControl>

        {errorMessage && (
          <Typography level="body-sm" color="error">
            {errorMessage}
          </Typography>
        )}

        <Button type="submit" fullWidth>
          Sign up
        </Button>
      </form>
    </Stack>
  );
}
