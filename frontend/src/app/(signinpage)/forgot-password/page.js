"use client";

import Link from "next/link";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import axios from "axios"; // Import axios
import SweetAlertComponent from "@/components/sweetalert";

// Styled Components
const ForgotPasswordContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  background: "linear-gradient(135deg, #6fb1fc, #1d2671)",
}));

const ForgotPasswordBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "450px",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { showSuccessAlert, showErrorAlert } = SweetAlertComponent();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting email:", email);  // Log the email value

    if (email) {
      try {
        const response = await axios.post("http://localhost:4000/api/auth/forgot-password", { email });
        console.log("Backend response:", response.data);  // Log the backend response

        // Adjust the check to match the backend response structure
        if (response.data.message) {
          showSuccessAlert("Check your inbox!", response.data.message);
        } else {
          showErrorAlert("Oops...", "There was an issue sending the reset link.");
        }
      } catch (error) {
        console.error("Error:", error);  // Log the error
        showErrorAlert("Oops...", "Something went wrong, please try again.");
      }
    } else {
      showErrorAlert("Oops...", "Please enter a valid email address.");
    }
  };


  return (
    <ForgotPasswordContainer>
      <ForgotPasswordBox>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              padding: "12px 30px",
              fontSize: "1rem",
              marginBottom: 2,
            }}
          >
            Send Reset Link
          </Button>

          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="body2" color="textSecondary" align="center">
            Remembered your password?{" "}
            <StyledLink href="/login">
              <Button color="primary" sx={{ textTransform: "none", marginTop: "-3px" }}>
                Log In
              </Button>
            </StyledLink>
          </Typography>
        </form>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  );
}
