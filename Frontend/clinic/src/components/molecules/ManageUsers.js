import React, { useState } from "react";
import { Box, Stack } from "@mui/joy";
import api from "../../api";
import AddUserButton from "../atoms/AddUserButton";
import ModalContainer from "../molecules/ModalContainer";

const roles = ["manager", "doctor", "patient"];
const specialties = [
  "None",
  "AllergyAndImmunology",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "EmergencyMedicine",
  "Endocrinology",
  "FamilyMedicine",
  "Gastroenterology",
  "GeneralSurgery",
  "Geriatrics",
  "Hematology",
  "InfectiousDisease",
  "InternalMedicine",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "ObstetricsAndGynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology",
  "Pathology",
  "Pediatrics",
  "PhysicalMedicineAndRehabilitation",
  "PlasticSurgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Urology",
  "VascularSurgery",
];

export default function ManageUsers({ users, setUsers }) {
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
    specialty: "None",
  });
  const [error, setError] = useState(null);

  const handleOpenModal = (role) => {
    setNewUser({
      name: "",
      surname: "",
      email: "",
      password: "",
      role,
      specialty: role === "doctor" ? "None" : "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewUser({
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "",
      specialty: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/users", newUser);
      setUsers([...users, response.data]);
      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <AddUserButton role="doctor" onClick={handleOpenModal} />
        <AddUserButton role="patient" onClick={handleOpenModal} />
        <AddUserButton role="manager" onClick={handleOpenModal} />
      </Stack>

      <ModalContainer
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        roles={roles}
        specialties={specialties}
        error={error}
      />
    </Box>
  );
}
