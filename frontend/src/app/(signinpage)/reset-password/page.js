"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import axios from "axios";
import SweetAlertComponent from "@/components/sweetalert";

// Styled Components
const ResetPasswordContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    background: "linear-gradient(135deg, #6fb1fc, #1d2671)",
}));

const ResetPasswordBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
}));

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { showSuccessAlert, showErrorAlert } = SweetAlertComponent();
    const router = useRouter();

    const [token, setToken] = useState(null); // State to hold the token

    // Wait until the router.query is available
    useEffect(() => {
        if (router.query && router.query.token) {
            setToken(router.query.token);  // Set token when it's available
        }
    }, [router.query]); // Re-run this effect when router.query changes

    // Return early if the token isn't yet available
    if (!token) {
        return <div>Loading...</div>;
    }

    const handlePasswordChange = (e) => {
        if (e.target.name === "newPassword") {
            setNewPassword(e.target.value);
        } else if (e.target.name === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            showErrorAlert("Oops...", "Please fill in both fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            showErrorAlert("Oops...", "Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                `https://emp-management-backend-r1af.onrender.com/api/auth/reset-password/${token}`,
                { newPassword }
            );

            if (response.data.message) {
                showSuccessAlert("Success", response.data.message);
                router.push("/login");
            } else {
                showErrorAlert("Oops...", "Failed to reset the password.");
            }
        } catch (error) {
            console.error("Error:", error);
            showErrorAlert("Oops...", "Something went wrong, please try again.");
        }
    };

    return (
        <ResetPasswordContainer>
            <ResetPasswordBox>
                <Typography variant="h4" gutterBottom>
                    Reset Your Password
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="New Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handlePasswordChange}
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
                        Reset Password
                    </Button>
                </form>
            </ResetPasswordBox>
        </ResetPasswordContainer>
    );
}
