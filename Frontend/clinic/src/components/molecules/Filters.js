import React, { Fragment } from "react";
import { FormControl, Select, Option, Button, Stack } from "@mui/joy";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function Filters({
  statusFilter,
  roleFilter,
  setStatusFilter,
  setRoleFilter,
  applyFilters,
}) {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <FormControl size="sm">
          <Select
            sx={{ height: "36px", width: "90px" }}
            size="sm"
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(event, newValue) => setStatusFilter(newValue)}
          >
            <Option value="all">Both</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </FormControl>
        <FormControl size="sm">
          <Select
            sx={{ height: "36px", width: "90px" }}
            size="sm"
            placeholder="Filter by role"
            value={roleFilter}
            onChange={(event, newValue) => setRoleFilter(newValue)}
          >
            <Option value="all">All roles</Option>
            <Option value="patient">Patient</Option>
            <Option value="manager">Manager</Option>
            <Option value="doctor">Doctor</Option>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          sx={{ border: "2px solid #32383E", color: "#32383E" }}
          onClick={applyFilters}
        >
          <FilterAltIcon />
        </Button>
      </Stack>
    </Fragment>
  );
}
