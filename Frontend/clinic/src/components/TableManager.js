import React, { useState } from "react";
import { Box, Table, Checkbox, Chip, Typography, Sheet, Link } from "@mui/joy";
import RowMenu from "../services/RowMenu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TableManager({ users }) {
  const [order, setOrder] = useState("desc");
  const [selected, setSelected] = useState([]);

  return (
    <Sheet
      variant="soft"
      sx={{
        display: { sm: "block" },
        width: "100%",
        borderRadius: 20,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
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
            <th style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
              <Checkbox
                size="sm"
                indeterminate={
                  selected.length > 0 && selected.length !== users.length
                }
                checked={selected.length === users.length}
                onChange={(event) => {
                  setSelected(
                    event.target.checked ? users.map((user) => user.id) : []
                  );
                }}
                color={
                  selected.length > 0 || selected.length === users.length
                    ? "primary"
                    : undefined
                }
                sx={{ verticalAlign: "text-bottom" }}
              />
            </th>
            <th style={{ width: 120, padding: "12px 6px" }}>
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
                  order === "desc"
                    ? { "& svg": { transform: "rotate(0deg)" } }
                    : { "& svg": { transform: "rotate(180deg)" } },
                ]}
              >
                User ID
              </Link>
            </th>
            <th style={{ width: 240, padding: "12px 6px" }}>Name</th>
            <th style={{ width: 240, padding: "12px 6px" }}>Email</th>
            <th style={{ width: 140, padding: "12px 6px" }}>Role</th>
            <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
            <th style={{ width: 140, padding: "12px 6px" }}></th>
          </tr>
        </thead>
        <tbody>
          {users.sort(getComparator(order, "id")).map((user) => (
            <tr key={user.id}>
              <td style={{ textAlign: "center", width: 120 }}>
                <Checkbox
                  size="sm"
                  checked={selected.includes(user.id)}
                  color={selected.includes(user.id) ? "primary" : undefined}
                  onChange={(event) => {
                    setSelected((ids) =>
                      event.target.checked
                        ? ids.concat(user.id)
                        : ids.filter((itemId) => itemId !== user.id)
                    );
                  }}
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </td>
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
                  <RowMenu id={user.id} />
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
