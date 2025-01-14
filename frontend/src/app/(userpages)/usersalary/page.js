"use client";

import Layout from "../userlayout";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getSalaryHistory } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { format } from "date-fns";

function UserSalary() {
    const [salaryData, setSalaryData] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); // Pagination state
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [searchQuery, setSearchQuery] = useState(""); // Search query

    const user = useSelector((state) => state.auth.user);
    const userId = user?._id;

    // Fetch salary data when component mounts
    useEffect(() => {
        const fetchSalaryData = async () => {
            try {
                const response = await getSalaryHistory(); // API call to fetch data
                console.log("response", response); // Log to inspect structure

                // Assuming your data is in response.data.data
                if (Array.isArray(response.data.data)) {
                    setSalaryData(response.data.data); // Correctly set the salary data
                } else {
                    setSalaryData([]); // If it's not an array, reset the data
                    setError("Invalid data format received");
                }
            } catch (err) {
                setError("Failed to fetch salary data");
            }
        };

        if (user?._id) {
            fetchSalaryData();
        }
    }, [user]);

    // Handle change in page number
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle change in rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when rows per page changes
    };

    // Filter data based on search query
    const filteredData = salaryData.filter((salary) =>
        salary.basicSalary.toString().includes(searchQuery) // Filter by basic salary (you can modify this)
    );

    if (error) {
        return <div>{error}</div>; // Display error if there was an issue fetching data
    }

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
                    Salary History
                </Typography>
                <Divider sx={{ marginBottom: "20px" }} />

                {/* Search Field */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        size="small"
                        label="Search Salary Records"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Handle input change for search
                        sx={{ width: 300 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                {/* Salary Data Table */}
                <TableContainer
                    component={Paper}
                    sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}
                >
                    <Table stickyHeader aria-label="salary table" sx={{ width: "100%" }}>
                        <thead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "10%" }}>
                                    No.
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                    Department
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                    Salary
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                    Allowance
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                    Deduction
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                    Total
                                </TableCell>

                                <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                    Pay Date
                                </TableCell>
                            </TableRow>
                        </thead>

                        <tbody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Handle pagination
                                .map((salary, index) => (
                                    <TableRow key={salary._id || index} sx={{ height: 70 }}>
                                        <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>

                                        <TableCell align="left">{salary.department?.dep_name || "N/A"}</TableCell>
                                        <TableCell align="left">Rs.{salary.basicSalary}</TableCell>
                                        <TableCell align="left">Rs.{salary.allowances}</TableCell>
                                        <TableCell align="left">Rs.{salary.deductions}</TableCell>
                                        <TableCell align="left">Rs.{salary.netSalary}</TableCell>
                                        <TableCell align="center">
                                            {salary.payDate ? format(new Date(salary.payDate), "MM/dd/yyyy") : "Invalid Date"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </tbody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: "20px" }}
                />
            </Box>
        </Layout>
    );
}

export default UserSalary;
