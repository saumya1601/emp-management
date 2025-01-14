"use client"

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
    TableRow,
    TableCell,
    Paper,
    TablePagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Layout from "../adminlayout";
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from "@/utils/axiosInstance";

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [departmentName, setDepartmentName] = useState("");


    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await getDepartments();
            const sortedDepartments = (response.data.departments || []).sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setDepartments(sortedDepartments);
        } catch (error) {
            console.error("Error fetching departments:", error);
            console.log("Failed to load departments. Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    // Open modal for creating/editing department
    const handleOpenModal = (department = null) => {
        setCurrentDepartment(department);
        setDepartmentName(department ? department.dep_name : "");
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentDepartment(null);
        setDepartmentName("");
    };

    // Save department (create or update)
    const handleSaveDepartment = async () => {
        if (!departmentName.trim()) {
            console.log("Department name cannot be empty.");
            return;
        }

        try {
            if (currentDepartment) {
                // Update department
                await updateDepartment(currentDepartment._id, { dep_name: departmentName });
                console.log("Department updated successfully.");
            } else {
                // Create department
                await addDepartment({ dep_name: departmentName });
                console.log("Department created successfully.");
            }
            fetchDepartments();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving department:", error);
            console.log("Failed to save department. Please try again.");
        }
    };

    // Delete a department
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                await deleteDepartment(id);
                console.log("Department deleted successfully.");
                fetchDepartments();
            } catch (error) {
                console.error("Error deleting department:", error);
                console.log("Failed to delete department. Please try again.");
            }
        }
    };

    // Filter departments based on search
    const filteredDepartments = departments
        .filter((department) =>
            department.dep_name.toLowerCase().includes(search.toLowerCase())
        );

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <>
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
                        Manage Departments
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                            size="small"
                            label="Search Departments"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                            onClick={() => handleOpenModal()}
                        >
                            Add Department
                        </Button>
                    </Stack>

                    {loading ? (
                        <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "200px" }}>
                            <CircularProgress />
                        </Stack>
                    ) : (
                        <TableContainer component={Paper} sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
                            <Table stickyHeader aria-label="departments table" sx={{ width: "100%" }}>
                                <thead>
                                    <TableRow>
                                        <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "10%" }}>
                                            ID
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "70%" }}>
                                            Department
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </thead>

                                <tbody>
                                    {filteredDepartments
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((department, index) => (
                                            <TableRow key={department._id}>
                                                <TableCell align="left">
                                                    {page * rowsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell align="left">{department.dep_name}</TableCell>
                                                <TableCell align="center">
                                                    <Stack direction="row" spacing={1} justifyContent="center">
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => handleOpenModal(department)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleDelete(department._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </tbody>
                            </Table>
                        </TableContainer>

                    )}

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredDepartments.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ marginTop: "20px" }}
                    />
                </Box>
            </Layout>

            {/* Modal for Creating/Editing Department */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{currentDepartment ? "Edit Department" : "Add Department"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Department Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveDepartment} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
