"use client";

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
    CircularProgress,
} from "@mui/material";
import Layout from '../adminlayout';
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SalaryModal from "@/modal/SalaryModal";
import { getSalary, getDepartments, getUsers } from "@/utils/axiosInstance";
import { format } from "date-fns";

export default function Salary() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [salaries, setSalaries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deptResponse, empResponse, salResponse] = await Promise.all([
                    getDepartments(),
                    getUsers(),
                    getSalary(),
                ]);

                setDepartments(deptResponse.data.departments || []);
                setEmployees(empResponse.data.users || []);
                setSalaries(salResponse.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleSave = async (data) => {
        setLoading(true);
        try {
            await getSalary(); // Refresh the salary data after a new addition
            const response = await getSalary();
            setSalaries(response.data.data);
        } catch (error) {
            console.error("Error updating salary data:", error);
        } finally {
            setLoading(false);
            handleCloseModal();
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Layout>
            <Box sx={{ width: "100%", overflow: "hidden", padding: "20px", minHeight: "700px", borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold", paddingBottom: "15px", color: "#333" }}>
                    Salary History
                </Typography>
                <Divider sx={{ marginBottom: "20px" }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField size="small" label="Search Salary Records" variant="outlined" sx={{ width: 300 }} InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon /></InputAdornment>) }} />
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }} onClick={handleOpenModal}>
                        Add Employee Salary
                    </Button>
                </Stack>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <thead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "8%" }}>No.</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "12%" }}>Emp Name</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "14%" }}>Department</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "14%" }}>Salary</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "14%" }}>Allowance</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "16%" }}>Deduction</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "14%" }}>Total</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>Pay Date</TableCell>
                                </TableRow>
                            </thead>
                            <tbody>
                                {salaries.length > 0 ? (
                                    salaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((salary, index) => (
                                        <TableRow key={salary._id || index} sx={{ height: 70 }}>
                                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="left">{salary.userId?.name || "N/A"}</TableCell>
                                            <TableCell align="left">{salary.department?.dep_name || "N/A"}</TableCell>
                                            <TableCell align="left">Rs.{salary.basicSalary}</TableCell>
                                            <TableCell align="left">Rs.{salary.allowances}</TableCell>
                                            <TableCell align="left">Rs.{salary.deductions}</TableCell>
                                            <TableCell align="left">Rs.{salary.netSalary}</TableCell>
                                            <TableCell align="center">{salary.payDate ? format(new Date(salary.payDate), "MM/dd/yyyy") : "Invalid Date"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">No salary records available.</TableCell>
                                    </TableRow>
                                )}
                            </tbody>
                        </Table>
                    </TableContainer>
                )}

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={salaries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: "20px" }}
                />
            </Box>

            <SalaryModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                departments={departments}
                employees={employees}
            />
        </Layout>
    );
}
