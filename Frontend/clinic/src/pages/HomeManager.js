import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/joy";
import ResponsiveAppBar from "../components/organisms/NavigationManager";
import TableManager from "../components/organisms/TableManager";
import ManageUsers from "../components/molecules/ManageUsers";
import Filters from "../components/molecules/Filters";
import api from "../api";
import Card from "../components/wrappers/Card";
import MovingGradientBackground from "../components/wrappers/MovingGradientBackground";

export default function HomeManager() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const applyFilters = () => {
    let updatedUsers = [...users];

    if (statusFilter && statusFilter !== "all") {
      updatedUsers = updatedUsers.filter((user) =>
        statusFilter === "active" ? user.isActive : !user.isActive
      );
    }

    if (roleFilter && roleFilter !== "all") {
      updatedUsers = updatedUsers.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(updatedUsers);
  };

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
    <MovingGradientBackground>
      <ResponsiveAppBar />
      <Box sx={{ mx: 3, paddingTop: "30px" }}>
        <Card>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            <ManageUsers users={users} setUsers={setUsers} />
            <Filters
              statusFilter={statusFilter}
              roleFilter={roleFilter}
              setStatusFilter={setStatusFilter}
              setRoleFilter={setRoleFilter}
              applyFilters={applyFilters}
            />
          </Box>
        </Card>

        <TableManager users={filteredUsers} />
      </Box>
    </MovingGradientBackground>
  );
}
