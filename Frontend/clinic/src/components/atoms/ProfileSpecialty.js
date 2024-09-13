import React from "react";
import { FormControl, FormLabel, Select, Option } from "@mui/joy";
import { specialties } from "../../constants/constants";

export default function ProfileSpecialty({ profile, handleSpecialityChange }) {
  return profile.role === "doctor" ? (
    <FormControl sx={{ flexGrow: 1 }}>
      <FormLabel>Specialty</FormLabel>
      <Select
        value={profile.specialty}
        onChange={handleSpecialityChange}
        placeholder="Select Specialty"
      >
        {specialties.map((specialty) => (
          <Option key={specialty.value} value={specialty.value}>
            {specialty.label}
          </Option>
        ))}
      </Select>
    </FormControl>
  ) : null;
}
