// components/LeaveRequestModal.js
import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Box,
} from "@mui/material";

function LeaveRequestModal({ open, onClose, onSubmit, loading }) {
    const [leaveType, setLeaveType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {

        if (!leaveType || !fromDate || !toDate || !description) {
            alert("All fields are required.");
            return;
        }

        const leaveData = {
            leaveType,
            startDate: fromDate,
            endDate: toDate,
            reason: description,
        };

        // Call onSubmit with the leaveData and reset the form
        onSubmit(leaveData);

        // Reset form fields after successful submission
        setLeaveType("");
        setFromDate("");
        setToDate("");
        setDescription("");
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Request for Leave
            </DialogTitle>
            <DialogContent sx={{ padding: "20px" }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Leave Details
                    </Typography>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Leave Type</InputLabel>
                        <Select
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            label="Leave Type"
                        >
                            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                            <MenuItem value="Annual Leave">Annual Leave</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} mb={2}>
                        <TextField
                            label="From Date"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            sx={{ width: "50%" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="To Date"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            sx={{ width: "50%" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Stack>

                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ marginBottom: 2 }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ padding: "10px" }}>
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="outlined"
                    sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                            borderColor: "#1565c0",
                            backgroundColor: "#e3f2fd",
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LeaveRequestModal;
