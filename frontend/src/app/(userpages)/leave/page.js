"use client"

import Layout from "../userlayout";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Stack, TextField, Typography, Box, InputAdornment, TableContainer, Table, TableRow, TableCell, Paper, TablePagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addLeaveRequest, getLeaveHistory } from "@/utils/axiosInstance";
import LeaveRequestModal from "@/modal/LeaveRequestModal";

function UserLeave() {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const user = useSelector((state) => state.auth.user);


    // Fetch leave history when component mounts
    useEffect(() => {
        const fetchLeaveHistory = async () => {
            try {
                const response = await getLeaveHistory(); // Fetch leave history from backend
                const sortedLeaveHistory = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt (latest first)
                setLeaveHistory(sortedLeaveHistory);
            } catch (error) {
                console.error("Error fetching leave history:", error);
            }
        };

        if (user?._id) {
            fetchLeaveHistory();
        }
    }, [user]);


    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSubmitLeaveRequest = async (leaveData) => {
        setLoading(true);
        const userId = user?._id;

        if (!userId || !leaveData.leaveType || !leaveData.startDate || !leaveData.endDate || !leaveData.reason) {
            alert("All fields are required.");
            setLoading(false);
            return;
        }

        try {
            await addLeaveRequest({ ...leaveData, userId });
            console.log("Leave request submitted successfully!");
            // Fetch updated leave history after submitting the request
            const response = await getLeaveHistory();
            setLeaveHistory(response.data.data);
        } catch (error) {
            console.error("Error submitting leave request:", error);
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
                    Manage Leave
                </Typography>
                <Divider sx={{ marginBottom: "20px" }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        size="small"
                        label="Search Leave Requests"
                        variant="outlined"
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
                        onClick={handleOpenModal}
                    >
                        Request Leave
                    </Button>
                </Stack>

                {/* Table to display leave requests */}
                <TableContainer component={Paper} sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
                    <Table stickyHeader aria-label="leave table" sx={{ width: "100%" }}>
                        <thead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>No.</TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>Leave Type</TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>From</TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>To</TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>Description</TableCell>
                                <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2" }}>Applied Date</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2" }}>Status</TableCell>
                            </TableRow>
                        </thead>
                        <tbody>
                            {leaveHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((leaveRequest, index) => (
                                <TableRow key={leaveRequest._id} sx={{ height: 70 }}>
                                    <TableCell align="left" sx={{ padding: "16px" }}>{index + 1}</TableCell>
                                    <TableCell align="left" sx={{ padding: "16px" }}>{leaveRequest.leaveType}</TableCell>
                                    <TableCell align="left" sx={{ padding: "16px" }}>{new Date(leaveRequest.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="left" sx={{ padding: "16px" }}>{new Date(leaveRequest.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="left" sx={{ padding: "16px" }}>{leaveRequest.reason}</TableCell>
                                    <TableCell align="left" sx={{ padding: "16px" }}>{new Date(leaveRequest.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="center" sx={{ color: leaveRequest.status === "Approved" ? "green" : leaveRequest.status === "Rejected" ? "red" : "orange", padding: "16px" }}>
                                        {leaveRequest.status}
                                    </TableCell>
                                </TableRow>


                            ))}
                        </tbody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={leaveHistory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: "20px" }}
                />
            </Box>

            {/* Request Leave Modal */}
            <LeaveRequestModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmitLeaveRequest}
                loading={loading}
            />
        </Layout>
    );
}

export default UserLeave;
