"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Correct import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "@/utils/axiosInstance";
import { loginSuccess } from "@/redux/authSlice";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const onSubmit = async (data) => {
        try {
            const { email, password } = data;
            const response = await login({ email, password });
            const { user, token, message } = response.data;

            if (response.status === 200) {
                dispatch(loginSuccess({ user, token }));
                toast.success(message); // This should trigger the success toast
                if (user.role === "admin") {
                    router.push("/dashboard");
                } else if (user.role === "user") {
                    router.push("/userdashboard");
                } else {
                    toast.error("Invalid role. Redirecting to login.");
                    router.push("/login");
                }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong. Try again."
            );
        }
    };

    return (
        <LoginContainer>
            <LoginBox>
                <Typography variant="h4" gutterBottom>
                    Log In
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Email */}
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        required
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
                            width: "200px",
                        }}
                    >
                        Login
                    </Button>
                </form>

                <Divider sx={{ marginBottom: 2 }} />

                <Typography variant="body2" color="textSecondary" align="center">
                    Don&apos;t have an account?{' '}
                    <StyledLink href="/register">Register here</StyledLink>
                </Typography>

                <Typography variant="body2" color="textSecondary" align="center">
                    <StyledLink href="/forgot-password">Forgot Password?</StyledLink>
                </Typography>
            </LoginBox>
        </LoginContainer>
    );
}

const LoginContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    background: "linear-gradient(135deg, #6fb1fc, #1d2671)",
}));

const LoginBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
    minHeight: "380px",
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
}));

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
});
