import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Avatar,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import Image from "next/image";

export default function LeaveDetailsModal({ open, leave, onClose, onStatusChange }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: "1.25rem",
                    paddingBottom: "16px",
                    textAlign: "center",
                }}
            >
                Leave Request Details
            </DialogTitle>
            <DialogContent sx={{ padding: "24px" }}>
                {leave ? (
                    <Stack spacing={3}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                            <Stack spacing={1}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                                    {leave.userId.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#888" }}>
                                    {leave.userId.department ? leave.userId.department.dep_name : 'N/A'}
                                </Typography>
                            </Stack>
                        </Box>

                        <Divider />

                        <Stack spacing={1}>
                            <Typography variant="body1">
                                <strong>Leave Type:</strong> {leave.leaveType}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Reason:</strong> {leave.reason}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Start Date:</strong> {leave.startDate}
                            </Typography>
                            <Typography variant="body1">
                                <strong>End Date:</strong> {leave.endDate}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Days:</strong> {leave.startDate && leave.endDate
                                    ? calculateDays(leave.startDate, leave.endDate)
                                    : "N/A"}
                            </Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Typography variant="body2" sx={{ color: "#888" }}>
                        No leave details available.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",  // Align buttons to the end (right side)
                    padding: "16px",
                    backgroundColor: "#f7f7f7",
                    borderTop: "1px solid #ddd",
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => onStatusChange("Approved")}
                    sx={{
                        backgroundColor: green[600],
                        "&:hover": { backgroundColor: green[700] },
                        marginRight: 2,  // Optional margin between buttons
                    }}
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => onStatusChange("Rejected")}
                    sx={{
                        backgroundColor: red[600],
                        "&:hover": { backgroundColor: red[700] },
                        marginRight: 2,  // Optional margin between buttons
                    }}
                >
                    Reject
                </Button>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": { borderColor: "#1565c0" },
                    }}
                >
                    Close
                </Button>
            </DialogActions>

        </Dialog>
    );
}

// Helper function to calculate the number of days between two dates
const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.floor((end - start) / (1000 * 3600 * 24));
};
