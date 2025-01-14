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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "../adminlayout";
import { getAllLeaveRequests, changeLeaveStatus } from "@/utils/axiosInstance";
import LeaveDetailsModal from "@/modal/LeaveDetailsModal";

export default function Leaves() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await getAllLeaveRequests();
                const sortedData = response.data.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setLeaveRequests(sortedData);
                setFilteredLeaveRequests(sortedData);
            } catch (error) {
                console.error("Error fetching leave requests", error);
            }
        };

        fetchLeaveRequests();

    }, []);


    useEffect(() => {
        let filteredRequests = leaveRequests;

        // Filter by status
        if (statusFilter) {
            filteredRequests = filteredRequests.filter((leave) => leave.status === statusFilter);
        }

        // Filter by search query
        if (searchQuery) {
            filteredRequests = filteredRequests.filter((leave) =>
                leave.userId.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredLeaveRequests(filteredRequests);
    }, [statusFilter, leaveRequests, searchQuery]);

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return (end - start) / (1000 * 3600 * 24);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetails = (leave) => {
        setSelectedLeave(leave);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedLeave(null);
    };

    const handleStatusChange = async (status) => {
        try {
            const response = await changeLeaveStatus(selectedLeave._id, status);
            const updatedLeave = response.data.data;

            // Re-fetch leave requests after status change
            const fetchLeaveRequests = async () => {
                try {
                    const response = await getAllLeaveRequests();
                    setLeaveRequests(response.data.data);
                    setFilteredLeaveRequests(response.data.data); // Update filtered data
                } catch (error) {
                    console.error("Error fetching leave requests after status change", error);
                }
            };

            // Call the function to re-fetch data
            fetchLeaveRequests();

            // Close the modal after updating
            handleCloseModal();
        } catch (error) {
            console.error("Error updating leave status:", error);
        }
    };

    // Handle "Show All" button click to reset the filter
    const handleShowAll = () => {
        setStatusFilter("");  // Clear the status filter
        setSearchQuery(""); // Clear the search query
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
                    Manage Leaves
                </Typography>
                <Divider sx={{ marginBottom: "20px" }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        size="small"
                        label="Search Users"
                        variant="outlined"
                        sx={{ width: 300 }}
                        value={searchQuery} // Bind value to searchQuery state
                        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#1976d2", width: "100px" }}
                            onClick={() => setStatusFilter("Pending")}
                        >
                            Pending
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#4caf50", width: "100px" }}
                            onClick={() => setStatusFilter("Approved")}
                        >
                            Approved
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#f44336", width: "100px" }}
                            onClick={() => setStatusFilter("Rejected")}
                        >
                            Rejected
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#757575", width: "120px" }}
                            onClick={handleShowAll}
                        >
                            Show All
                        </Button>
                    </Stack>
                </Stack>

                <TableContainer component={Paper} sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <thead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "10%" }}>
                                    ID
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                    Name
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "25%" }}>
                                    Leave Type
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                    Department
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "10%" }}>
                                    Days
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "10%" }}>
                                    Status
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </thead>


                        <tbody>
                            {filteredLeaveRequests
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((leave, index) => (
                                    <TableRow key={leave._id}>
                                        <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell align="left">{leave.userId.name}</TableCell>
                                        <TableCell align="left">{leave.leaveType}</TableCell>
                                        <TableCell>{leave.userId.department ? leave.userId.department.dep_name : 'N/A'}</TableCell>
                                        <TableCell align="left">
                                            {leave.startDate && leave.endDate
                                                ? calculateDays(leave.startDate, leave.endDate)
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell align="left">{leave.status}</TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleViewDetails(leave)}
                                                >
                                                    View
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}

                        </tbody>


                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredLeaveRequests.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: "20px" }}
                />
            </Box>

            {/* Modal for Leave Details */}
            <LeaveDetailsModal
                open={openModal}
                leave={selectedLeave}
                onClose={handleCloseModal}
                onStatusChange={handleStatusChange}
            />
        </Layout>
    );
}
