import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../api"; // Import axios instance

export default function MyProfile() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [profile, setProfile] = React.useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    isActive: false,
    specialty: "", // Specialty is only for doctors
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch user data and pick only necessary fields
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const userData = response.data;

        // Extract only necessary fields
        const profileData = {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          password: userData.password,
          isActive: userData.isActive,
          specialty: userData.role === "doctor" ? userData.specialty : "", // Only include specialty for doctors
        };

        setProfile(profileData); // Assign extracted data to profile state
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // Handle form submission (save changes)
  const handleSave = async () => {
    try {
      const response = await api.put(`/users/${id}`, profile); // API call to update user
      alert("Profile updated successfully");
      navigate(-1); // Navigate back after saving
    } catch (error) {
      setError("Error updating profile");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">My Profile</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  loading="lazy"
                  alt="User avatar"
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <Input
                      size="sm"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="First name"
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <Input
                      size="sm"
                      name="surname"
                      value={profile.surname}
                      onChange={handleChange}
                      placeholder="Last name"
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input
                    size="sm"
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    readOnly
                  />
                </FormControl>

                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    name="email"
                    startDecorator={<EmailRoundedIcon />}
                    value={profile.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>

              {profile.role === "doctor" && (
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Specialty</FormLabel>
                    <Input
                      size="sm"
                      name="specialty"
                      value={profile.specialty}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Stack>
              )}
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleSave}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
