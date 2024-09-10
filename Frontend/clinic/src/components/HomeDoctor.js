import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../api";  // Assume you have an axios instance set up for API requests

export default function HomeDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch doctor's appointments
    const fetchAppointments = async () => {
      try {
        // Assuming doctor ID is 1 for example, replace with actual logged-in doctor ID
        const doctorId = 1; 
        const response = await api.get(`/appointments?doctorId=${doctorId}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments scheduled.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Appointment Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {appointment.user.name} {appointment.user.surname}
                  </TableCell>
                  <TableCell>{appointment.user.email}</TableCell>
                  <TableCell>{new Date(appointment.appointmentTime).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
