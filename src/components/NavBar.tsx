import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar style={{ background: "#659DBD", position: "static" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            width="100"
            height="100"
            alt="LOGO"
          />
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
              display: { xs: "block", md: "none" },
            }}
          ></Menu>

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Button
              key="Feedback"
              onClick={() => {
                navigate("/Feedback");
              }}
              sx={{ ml:3, my: 2, color: "white", display: "block" }}
            >
              Feedback
            </Button>
          </Box>

          <Box>
            <Button 
              onClick={() => {
                navigate("/login");
              }}
              variant="contained"
            >
              Admin Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
