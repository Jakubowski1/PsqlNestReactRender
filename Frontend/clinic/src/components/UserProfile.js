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
import { useParams } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({
    name: "",
    surname: "",
    role: "",
    email: "",
    specialty: "",
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

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
              {/* Name */}
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <Input
                      size="sm"
                      value={profile.name}
                      placeholder="First name"
                      readOnly
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <Input
                      size="sm"
                      value={profile.surname}
                      placeholder="Last name"
                      readOnly
                    />
                  </FormControl>
                </Stack>
              </Stack>

              {/* Role */}
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" value={profile.role} readOnly />
                </FormControl>

                {/* Email */}
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    value={profile.email}
                    readOnly
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>

              {/* Specialty (if doctor) */}
              {profile.role === "doctor" && (
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Specialty</FormLabel>
                    <Input size="sm" value={profile.specialty} readOnly />
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
                onClick={navigate("/manager")}
              >
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
