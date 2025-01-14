"use client"

import { useState } from "react";
import Link from "next/link";
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    InputAdornment,
    IconButton,
    MenuItem,
    Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { post, registerNew } from "@/utils/axiosInstance";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),

    age: yup
        .number()
        .typeError('Age is required and must be a number')
        .required('Age is required')
        .max(99, 'Age must not be greater than 99'),
    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number with the correct country code"),
});


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();


    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            gender: 'male',
            role: 'user',
        },
    });


    const onSubmit = async (data) => {
        const { name, email, password, age, gender, role, phone } = data;
        const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;

        try {

            const response = await registerNew({
                name,
                email,
                password,
                phone: formattedPhone,
                age,
                gender,
                role,
            });

            if (response.status === 200) {
                toast.success(response.data.message);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <RegisterContainer>
            <RegisterBox>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={3}>
                        {/* First column */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                required
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
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
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                required
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Second column */}
                        <Grid item xs={12} sm={6}>

                            {/* phone  */}

                            <Box marginTop={1} marginBottom={0.65}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            country="in"
                                            value={field.value}
                                            onChange={field.onChange}
                                            inputProps={{
                                                required: true,
                                                style: {
                                                    width: '100%',
                                                    height: '55px',
                                                    fontSize: '16px',
                                                },
                                            }}
                                        />
                                    )}
                                />
                                {errors.phone && (
                                    <Typography
                                        color="error"
                                        variant="body2"
                                        fontSize={12}
                                        marginTop={0.5}
                                        marginLeft={1.5}
                                        sx={{ textAlign: 'left' }}
                                    >
                                        {errors.phone?.message}
                                    </Typography>

                                )}
                            </Box>

                            {/* age */}

                            <TextField
                                label="Age"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                required
                                type="number"
                                {...register("age")}
                                error={!!errors.age}
                                helperText={errors.age?.message}
                            />

                            {/* gender */}

                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Gender"
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        required
                                        {...field}
                                        error={!!errors.gender}
                                        helperText={errors.gender?.message}
                                        select
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </TextField>
                                )}
                            />

                            {/* Role Field */}
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        label="Role"
                                        variant="outlined"
                                        fullWidth
                                        margin="dense"
                                        required
                                        {...field}
                                        error={!!errors.role}
                                        helperText={errors.role?.message}
                                        select
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="user">User</MenuItem>
                                    </TextField>
                                )}
                            />





                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                            textTransform: "none",
                            borderRadius: "20px",
                            padding: "12px 30px",
                            fontSize: "1rem",
                            marginTop: 2,
                            width: "200px",
                        }}
                    >
                        Register
                    </Button>
                </form>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="textSecondary">
                    Already have an account?{" "}
                    <StyledLink href="/login">Log in</StyledLink>
                </Typography>

                <ToastContainer />
            </RegisterBox>
        </RegisterContainer>
    );
}
const RegisterContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    background: "linear-gradient(135deg, #6fb1fc, #1d2671)",
}));

const RegisterBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    width: "50%",
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
}));
