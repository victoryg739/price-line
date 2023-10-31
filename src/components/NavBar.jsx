/**
 * A responsive app bar component that displays the logo, feedback button,
 * and admin login/logout button.
 *
 * @return {JSX.Element} The responsive app bar.
 */
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
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  /**
   * Sets the isLogin state to true or false depending on whether there
   * is an access token stored in local storage.
   */

  useEffect(() => {
    if (localStorage.getItem("admin_token") === null) {
      setIsAdminLogin(false);
    } else {
      setIsAdminLogin(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user_token") === null) {
      setIsUserLogin(false);
    } else {
      setIsUserLogin(true);
    }
  }, []);

  return (
    <AppBar style={{ background: "#4A94DE", position: "static" }}>
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
            {isAdminLogin ? (
              <Button
                key="Feedback"
                onClick={() => {
                  navigate("/admin");
                }}
                sx={{ ml: 3, my: 2, color: "white", display: "block", textTransform: "none" }}
              >
                Manage Feedback
              </Button>
            ) : (
              <>
                <Button
                  key="Buy"
                  onClick={() => {
                    navigate("/resale/buy");
                  }}
                  sx={{ ml: 3, my: 2, color: "white", display: "block", textTransform: "none", fontSize: 16 }}
                >
                  Buy
                </Button>
                <Button
                  key="Sell"
                  onClick={() => {
                    navigate("/resale/sell");
                  }}
                  sx={{ ml: 3, my: 2, color: "white", display: "block", textTransform: "none", fontSize: 16 }}
                >
                  Sell
                </Button>
                {isUserLogin && (
                  <Button
                    key="Manage Listings"
                    onClick={() => {
                      navigate("/resale/manage");
                    }}
                    sx={{ ml: 3, my: 2, color: "white", display: "block", textTransform: "none", fontSize: 16 }}
                  >
                    Manage Listings
                  </Button>
                )}
                <Button
                  key="Calculator"
                  onClick={() => {
                    navigate("/calculator");
                  }}
                  sx={{ ml: 3, my: 2, color: "white", display: "block", textTransform: "none", fontSize: 16 }}
                >
                  Calculator
                </Button>
                <Button
                  key="Feedback"
                  onClick={() => {
                    navigate("/feedback");
                  }}
                  sx={{ ml: 3, my: 2, color: "white", display: "block", textTransform: "none", fontSize: 16 }}
                >
                  Feedback
                </Button>
              </>
            )}
          </Box>
          <Box>
            {isAdminLogin || isUserLogin ? (
              <>
                <Button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                    alert("Successfully Logout");
                  }}
                  variant="contained"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate("/user-login");
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
