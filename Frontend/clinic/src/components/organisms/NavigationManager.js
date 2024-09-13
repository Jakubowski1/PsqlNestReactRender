import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { settings, mangerMenuPages } from "../../constants/constants";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [activePage, setActivePage] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    handleCloseNavMenu();
    navigate(`/${page.toLowerCase()}`);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleLogout = async () => {
    const csrfToken = getCookie("XSRF-TOKEN");

    try {
      const response = await fetch(
        "https://nestapi-3.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      const data = await response.json();
      navigate("/");
      setLogoutMessage("Logout successful!");
    } catch (error) {
      console.error("Error during logout:", error);
      setLogoutMessage(`Error during logout: ${error.message}`);
    }
  };

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(205,180,219, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: " blur(10px)",
        border: "1px solid rgba(218, 112, 214, 0.2)",
        my: 0,
        px: 4,
        marginBottom: 1.5,
        overflow: "hidden",
      }}
    >
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="blue"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: {
                xs: "block",
                md: "none",
                color: "#32383E",
                fontWeight: 600,
              },
            }}
          >
            {mangerMenuPages.map((page) => (
              <MenuItem key={page} onClick={() => handlePageClick(page)}>
                <Typography sx={{ textAlign: "center" }}>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#32383E",
          }}
        >
          CLINIC
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
          }}
        >
          {mangerMenuPages.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageClick(page)}
              size="lg"
              sx={{
                backgroundColor: "rgba(255,255,255,0)",
                borderRadius: "0",
                color: "#32383E",
                height: "64px",
                display: "block",
                borderBottom:
                  activePage === page ? "2px solid #D8BFD8" : "none",
                "&:hover": {
                  backgroundColor: "rgba(218, 112, 214, 0.2)",
                },
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="me" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      {logoutMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {logoutMessage}
        </Typography>
      )}
    </AppBar>
  );
}

export default ResponsiveAppBar;
