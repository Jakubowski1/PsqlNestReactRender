import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Divider, CardOverflow } from "@mui/joy";
import api from "../../api";
import ProfileImage from "../atoms/ProfileImage";
import ProfileNameInput from "../atoms/ProfileNameInput";
import ProfileStatusEmail from "../atoms/ProfileStatusEmail";
import ProfileSpecialty from "../atoms/ProfileSpecialty";
import ProfileActions from "../atoms/ProfileActions";
import Card from "../wrappers/Card";
import ProfileSurnameInput from "../atoms/ProfileSurnameInput";
import ProfileAge from "../atoms/ProfileAge";
import ProfilePassword from "../atoms/ProfilePassword";
export default function MyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
    isActive: "",
    specialty: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        const userData = response.data;
        const profileData = {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          password: userData.password,
          role: userData.role,
          age: userData.age,
          isActive: userData.isActive,
          specialty: userData.role === "doctor" ? userData.specialty : "",
        };
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleSave = async () => {
    try {
      await api.put(`/users/${id}`, profile);
      navigate(-1);
    } catch (error) {
      setError("Error updating profile");
    }
  };

  const handleSpecialityChange = (event, newValue) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      specialty: newValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "1000px",
          width: "100%",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ margin: "1vh auto", mb: 1 }}>
            <Typography level="title-md">
              {profile.surname}'s profile
            </Typography>
          </Box>
          <Divider />

          <Stack
            direction="row"
            spacing={10}
            sx={{ display: { xs: "none", md: "flex" }, my: 6 }}
          >
            <ProfileImage />
            <Stack spacing={6} sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={2}>
                <ProfileNameInput
                  profile={profile}
                  handleChange={handleChange}
                />
                <ProfileSurnameInput
                  profile={profile}
                  handleChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                {/* <ProfilePassword
                  profile={profile}
                  handleChange={handleChange}
                />
                <ProfileAge profile={profile} handleChange={handleChange} /> */}
              </Stack>
              <ProfileStatusEmail
                profile={profile}
                handleChange={handleChange}
                setProfile={setProfile}
              />
              <ProfileSpecialty
                profile={profile}
                handleSpecialityChange={handleSpecialityChange}
              />
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <ProfileActions navigate={navigate} handleSave={handleSave} />
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
