"use client"
import React from "react";
import Layout from "../userlayout";
import {
    Typography,
    Avatar,
    Paper,
    Grid,
    Box,
} from "@mui/material";
import { styled } from "@mui/system";
import moment from "moment";
import { useSelector } from "react-redux";

function UserProfile() {
    const { user } = useSelector((state) => state.auth);

    // Format the "dateAdded" field
    const formattedDate = user?.dateAdded
        ? moment(user.dateAdded).format("DD-MM-YYYY")
        : "N/A";

    return (
        <Layout>
            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    padding: "20px",
                    minHeight: "700px",
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: "white",
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* Left Side: Avatar */}
                    <Grid item xs={12} sm={4} container justifyContent="center">
                        <ProfileAvatar
                            alt={user?.name || "User Avatar"}
                            src={user?.profileImage } // Fetch profile image URL
                        />
                    </Grid>

                    {/* Right Side: User Data */}
                    <Grid item xs={12} sm={8}>
                        {/* Greeting */}
                        <GreetingText>
                            Welcome, {user?.name || "User"}!
                        </GreetingText>

                        {/* User Details */}
                        <DetailGrid container spacing={3}>
                            <DetailItem label="Email" value={user?.email} />
                            <DetailItem label="Contact Number" value={user?.phone} />
                            <DetailItem label="Date Joined" value={formattedDate} />
                            <DetailItem label="Gender" value={user?.gender} />
                            <DetailItem label="Age" value={user?.age} />
                            <DetailItem label="Role" value={user?.role} />
                        </DetailGrid>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

export default UserProfile;

/**
 * DetailItem: A reusable component for displaying user details in a grid.
 */
const DetailItem = ({ label, value }) => (
    <>
        <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">{label}:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography variant="body1">{value || "N/A"}</Typography>
        </Grid>
    </>
);

// Styled Components

// Avatar styling
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: "300px",
    height: "300px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
}));

// Greeting text styling
const GreetingText = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "2.5rem",
    color: "#1d2671",
    textShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
    margin: theme.spacing(2, 0),
}));

// Grid styling for details
const DetailGrid = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(2, 0),
    textAlign: "left",
    "& .MuiTypography-subtitle1": {
        fontWeight: "bold",
        fontSize: "1.1rem",
        color: "#555",
    },
    "& .MuiTypography-body1": {
        fontSize: "1.2rem",
        fontWeight: "500",
        color: "#333",
    },
}));
