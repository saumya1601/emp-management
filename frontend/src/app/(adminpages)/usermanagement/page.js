"use client";

import UserViewModal from "@/modal/UserViewModal";
import React, { useState, useEffect } from "react";
import {
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
    Box,
    InputAdornment,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../adminlayout";
import { fetchUsers, removeUser } from "@/redux/userSlice";
import UserFormModal from "@/modal/UserFormModal";
import SweetAlertComponent from "@/components/sweetalert";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

export default function UserManagement() {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [openViewModal, setOpenViewModal] = useState(false);
    const [viewingUser, setViewingUser] = useState(null);

    const sweetAlert = SweetAlertComponent();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const sortedUsers = [...users].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        setFilteredUsers(sortedUsers);
    }, [users]);


    const loadData = (event) => {
        const value = event.target.value.toLowerCase();
        if (value === "") {
            const sortedUsers = [...users].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            setFilteredUsers(sortedUsers);
            return;
        }
        const searchResults = users.filter(
            (user) =>
                (user.name?.toLowerCase() || "").includes(value) ||
                (user.email?.toLowerCase() || "").includes(value) ||
                (user.department?.toLowerCase() || "").includes(value)
        );

        const sortedSearchResults = searchResults.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        setFilteredUsers(sortedSearchResults);
        setPage(0);
    };

    const handleDeleteUser = (_id) => {
        document.body.style.overflow = "hidden";

        sweetAlert.showConfirmationAlert(
            "Are you sure you want to delete this user?",
            "This action cannot be undone.",
            () => {
                dispatch(removeUser(_id))
                    .then(() => {
                        sweetAlert.showSuccessAlert(
                            "User Deleted Successfully",
                            "The user has been deleted from the system."
                        );
                    })
                    .catch(() => {
                        sweetAlert.showErrorAlert(
                            "Deletion Failed",
                            "An error occurred while deleting the user. Please try again."
                        );
                    });
            },
            () => {
                document.body.style.overflow = "auto";
            }
        );
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setOpenModal(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleViewClick = (user) => {
        setViewingUser(user);
        setOpenViewModal(true);
    };

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
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", paddingBottom: "15px", color: "#333" }}
                >
                    Manage Employees
                </Typography>
                <Divider sx={{ marginBottom: "20px" }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        size="small"
                        label="Search Employees"
                        variant="outlined"
                        onChange={loadData}
                        sx={{ width: 300 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
                            backgroundColor: "#1976d2",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                        onClick={() => {
                            setEditingUser(null);
                            setOpenModal(true);
                        }}
                    >
                        Add New Employee
                    </Button>
                </Stack>

                <TableContainer
                    component={Paper}
                    sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}
                >
                    <Table stickyHeader aria-label="sticky table" sx={{ width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "6%" }}>
                                    ID
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                    Image
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "30%" }}>
                                    Name
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "30%" }}>
                                    Email
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                    Department
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user, index) => (
                                        <TableRow hover key={user.id || index}>
                                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="left">
                                                <Image
                                                    src={user.profileImage ? user.profileImage : "/male.png"}  // If profileImage exists, use it; otherwise, fallback to default image
                                                    alt="User"
                                                    width={40}
                                                    height={40}
                                                    style={{
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />


                                            </TableCell>
                                            <TableCell align="left">{user.name}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left">{user.department ? user.department.dep_name : "-"}</TableCell>

                                            <TableCell align="center">
                                                <Stack direction="row" spacing={1}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleViewClick(user)} // Open the view modal with the user data
                                                    >
                                                        <VisibilityIcon />
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => handleEditClick(user)}
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>


                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: "20px" }}
                />
            </Box>

            <UserFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                userData={editingUser}
            />

            <UserViewModal open={openViewModal} onClose={() => setOpenViewModal(false)} user={viewingUser} />
        </Layout>
    );
}
