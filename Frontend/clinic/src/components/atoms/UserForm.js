import React from "react";
import { FormControl, FormLabel, Input, Select, Option, Stack } from "@mui/joy";

export default function UserForm({
  newUser,
  handleInputChange,
  roles,
  specialties,
}) {
  return (
    <Stack spacing={2}>
      <FormControl required>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={newUser.name} onChange={handleInputChange} />
      </FormControl>

      <FormControl required>
        <FormLabel>Surname</FormLabel>
        <Input
          name="surname"
          value={newUser.surname}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl required>
        <FormLabel>Role</FormLabel>
        <Select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          disabled
        >
          {roles.map((role) => (
            <Option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Option>
          ))}
        </Select>
      </FormControl>

      {newUser.role === "doctor" && (
        <FormControl required>
          <FormLabel>Specialty</FormLabel>
          <Select
            name="specialty"
            value={newUser.specialty}
            onChange={handleInputChange}
          >
            {specialties.map((specialty) => (
              <Option key={specialty} value={specialty}>
                {specialty.replace(/([A-Z])/g, " $1").trim()}
              </Option>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  );
}
