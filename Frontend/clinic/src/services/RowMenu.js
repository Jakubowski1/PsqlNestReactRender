import api from "../api";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RowMenu({ id, onSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.status === 200) {
        setErrorMessage("User deleted!");
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage("Deletion failed.");
      }
    } catch (error) {
      setErrorMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
    }
  }

  function handleEdit() {
    navigate(`/manager/${id}`);
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem> <Divider />
        <MenuItem color="danger" onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </Dropdown>
  );
}
