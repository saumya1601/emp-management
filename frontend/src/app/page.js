"use client";

import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";




export default function Home() {
  return (
    <HomeContainer>
      <HomeBox>
        <Heading variant="h1">Welcome to Our Site</Heading>
        <Subheading variant="body1">
          Discover our amazing platform! Sign in to access your account and explore more.
        </Subheading>
        <StyledLink href="/login">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              padding: "12px 30px",
              fontSize: "1rem",
            }}
          >
            Go to Login
          </Button>
        </StyledLink>
      </HomeBox>
    </HomeContainer>
  );
}
const HomeContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  background: "linear-gradient(135deg, #6fb1fc, #1d2671)",
}));

const HomeBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "450px",

}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#333",
  fontSize: "2.5rem",
  marginBottom: theme.spacing(2),
}));

const Subheading = styled(Typography)(({ theme }) => ({
  color: "#555",
  marginBottom: theme.spacing(3),
  fontSize: "1.1rem",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));