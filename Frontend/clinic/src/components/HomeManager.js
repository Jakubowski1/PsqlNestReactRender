import React, { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress, Alert } from "@mui/joy";
import ResponsiveAppBar from "./AppBarManager";
import TableManager from "./TableManager";
import ManageUsers from "./ManageUsers"; // Import the new component
import Filters from "./Filters"; // Import the Filters component
import api from "../api";

export default function HomeManager() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters
  const [statusFilter, setStatusFilter] = useState("all"); // Default to 'all'
  const [roleFilter, setRoleFilter] = useState("all"); // Default to 'all'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users
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

    // Filter by status (skip filtering if 'all' is selected)
    if (statusFilter && statusFilter !== "all") {
      updatedUsers = updatedUsers.filter((user) =>
        statusFilter === "active" ? user.isActive : !user.isActive
      );
    }

    // Filter by role (skip filtering if 'all' is selected)
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
    <Fragment>
      <ResponsiveAppBar />
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            justifyContent: "space-between",
            paddingX: 4,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <ManageUsers users={users} setUsers={setUsers} />

          {/* Filters */}
          <Filters
            statusFilter={statusFilter}
            roleFilter={roleFilter}
            setStatusFilter={setStatusFilter}
            setRoleFilter={setRoleFilter}
            applyFilters={applyFilters}
          />
        </Box>
        {/* Table of users */}
        <TableManager users={filteredUsers} />
      </Box>
    </Fragment>
  );
}
