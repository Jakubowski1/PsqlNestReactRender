import React from "react";
import { Modal, Box, Typography, Button } from "@mui/joy";
import UserForm from "../atoms/UserForm";

export default function ModalContainer({
  openModal,
  handleCloseModal,
  newUser,
  handleInputChange,
  handleSubmit,
  roles,
  specialties,
  error,
}) {
  return (
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
        <UserForm
          newUser={newUser}
          handleInputChange={handleInputChange}
          roles={roles}
          specialties={specialties}
        />
        <Button onClick={handleSubmit}>Create User</Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Modal>
  );
}
