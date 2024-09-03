import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Stack,
} from "@mui/joy";
import ResponsiveAppBar from "./AppBarManager";
import TableManager from "./TableManager";

export default function HomeManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://nestapi-3.onrender.com/users", {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert color="danger">{error}</Alert>
      </Box>
    );
  }

  return (
    <Fragment>
      <ResponsiveAppBar />
      <TableManager />
    </Fragment>
  );
}
