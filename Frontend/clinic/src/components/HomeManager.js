import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Modal,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
} from "@mui/joy";
import ResponsiveAppBar from "./AppBarManager";
import TableManager from "./TableManager";
import api from "../api";

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

export default function HomeManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
    specialty: "None",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = (role) => {
    setNewUser({
      ...newUser,
      role,
      specialty: role === "doctor" ? "None" : "", // Set specialty only for doctors
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
        <Typography level="h4">Manage Users</Typography>

        {/* Buttons to add Doctor, Manager, and Patient */}
        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <Button onClick={() => handleOpenModal("doctor")}>Add Doctor</Button>
          <Button onClick={() => handleOpenModal("patient")}>
            Add Patient
          </Button>
          <Button onClick={() => handleOpenModal("manager")}>
            Add Manager
          </Button>
        </Stack>

        {/* Modal for creating a new user */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              maxWidth: 400,
              margin: "auto",
              padding: 3,
              bgcolor: "background.paper",
              borderRadius: "md",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography level="h5">Create New {newUser.role}</Typography>

            <FormControl required>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
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

            <Button onClick={handleSubmit}>Create User</Button>
          </Box>
        </Modal>

        {/* User Table */}
        <TableManager users={users} />
      </Box>
    </Fragment>
  );
}
