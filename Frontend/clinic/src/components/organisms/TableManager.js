import React, { useState, useEffect } from "react";
import { Box, Table, Chip, Typography, Link } from "@mui/joy";
import RowMenu from "./RowMenu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Card from "../wrappers/Card";
import api from "../../api"; // Import your API client

// Sorting logic
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TableManager() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/users"); // Fetch users from API
      setUsers(response.data); // Set users to state
      setLoading(false);
    } catch (error) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  // useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers(); // Fetch users on mount
  }, []);

  // Handle success delete
  const handleDeleteSuccess = () => {
    fetchUsers(); // Re-fetch users after deletion
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card>
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          "--TableCell-headBackground": "var(--joy-palette-background-level1)",
          "--Table-headerUnderlineThickness": "1px",
          "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
          "--TableCell-paddingY": "4px",
          "--TableCell-paddingX": "8px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 50, padding: "12px 6px" }}>
              <Link
                underline="none"
                color="primary"
                component="button"
                onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                endDecorator={<ArrowDropDownIcon />}
                sx={[
                  {
                    fontWeight: "lg",
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  },
                ]}
              >
                User ID
              </Link>
            </th>
            <th style={{ width: 140, padding: "12px 6px" }}>Name</th>
            <th style={{ width: 140, padding: "12px 6px" }}>Email</th>
            <th style={{ width: 140, padding: "12px 6px" }}>Role</th>
            <th style={{ width: 40, padding: "12px 6px" }}>Status</th>
            <th style={{ width: 40, padding: "12px 6px" }}></th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          {users.sort(getComparator(order, "id")).map((user) => (
            <tr key={user.id}>
              <td>
                <Typography level="body-xs">{user.id}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{user.name}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{user.email}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{user.role}</Typography>
              </td>
              <td>
                <Chip
                  variant="soft"
                  size="sm"
                  color={user.isActive ? "success" : "danger"}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Chip>
              </td>
              <td>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  {/* Pass the handleDeleteSuccess callback to RowMenu */}
                  <RowMenu
                    id={user.id}
                    onSuccess={handleDeleteSuccess} // Re-fetch users on delete
                  />
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
