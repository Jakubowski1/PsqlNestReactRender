import React, { Fragment } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Option,
  Button,
  Stack,
} from "@mui/joy";

export default function Filters({
  statusFilter,
  roleFilter,
  setStatusFilter,
  setRoleFilter,
  applyFilters,
}) {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <FormControl size="sm">
          <FormLabel>Status</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(event, newValue) => setStatusFilter(newValue)}
          >
            <Option value="all">All</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </FormControl>

        <FormControl size="sm">
          <FormLabel>Role</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by role"
            value={roleFilter}
            onChange={(event, newValue) => setRoleFilter(newValue)}
          >
            <Option value="all">All</Option>
            <Option value="patient">Patient</Option>
            <Option value="manager">Manager</Option>
            <Option value="doctor">Doctor</Option>
          </Select>
        </FormControl>

        <Button f onClick={applyFilters}>
          Apply Filters
        </Button>
      </Stack>
    </Fragment>
  );
}
