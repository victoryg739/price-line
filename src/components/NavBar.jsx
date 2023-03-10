import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import logo from "../assets/logo.png";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  });

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

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Button
              key="Feedback"
              onClick={() => {
                navigate("/feedback");
              }}
              sx={{ ml: 3, my: 2, color: "white", display: "block" }}
            >
              Feedback
            </Button>
          </Box>

          <Box>
            {isLogin ? (
              <Button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                variant="contained"
              >
                Admin Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant="contained"
              >
                Admin Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
