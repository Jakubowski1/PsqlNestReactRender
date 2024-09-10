import React, { Fragment, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import api from "../api"; // Axios instance for API requests

export default function HomePatient() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loggedInPatientId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/users");
        const doctorsOnly = response.data.filter(
          (user) => user.role === "doctor"
        );
        setDoctors(doctorsOnly);
        setLoading(false);
      } catch (error) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    if (!loggedInPatientId) {
      setError("Error: User not logged in.");
      return;
    }

    try {
      const response = await api.post("/appointments", {
        doctorId: selectedDoctor,
        userId: Number(loggedInPatientId),
        appointmentTime,
      });

      setMessage("Appointment successfully scheduled!");
      console.log("API response:", response);
    } catch (error) {
      console.error(
        "Error scheduling appointment:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Error scheduling appointment. Please try again."
      );
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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Fragment>
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ padding: 2 }}>
          Home Patient
        </Typography>
      </AppBar>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          gap: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Schedule an Appointment</Typography>

        <TextField
          select
          label="Select Doctor"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          required
          sx={{ width: 300 }}
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name} {doctor.surname} - {doctor.specialty}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Appointment Time"
          type="datetime-local"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
          sx={{ width: 300 }}
        />

        <Button variant="contained" type="submit" sx={{ width: 300 }}>
          Schedule Appointment
        </Button>

        {message && (
          <Typography variant="body1" color="green">
            {message}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="red">
            {error}
          </Typography>
        )}
      </Box>
    </Fragment>
  );
}
