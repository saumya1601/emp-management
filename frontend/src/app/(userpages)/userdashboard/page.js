"use client";

import React, { useEffect, useState } from "react";
import Layout from "../userlayout";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { getLeaveHistory, getSalaryHistory } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";

function UserDashboard() {

    const [totalLeave, setTotalLeave] = useState(0);
    const [approved, setApproved] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [pending, setPending] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [salaryData, setSalaryData] = useState(null);


    const user = useSelector((state) => state.auth.user);

    // Fetch leave data from backend
    useEffect(() => {
        const fetchLeaveData = async () => {
            try {
                const response = await getLeaveHistory(); // Fetch leave history
                const data = response.data;

                // Update state with counts from backend
                setTotalLeave(data.totalLeave);
                setApproved(data.approved);
                setRejected(data.rejected);
                setPending(data.pending);
            } catch (err) {
                console.error("Error fetching leave data:", err);
                setError("Failed to fetch leave data");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchLeaveData();
        }
    }, [user]);

    // Fetch salary data from backend
    useEffect(() => {
        const fetchSalaryData = async () => {
            try {
                const response = await getSalaryHistory(); // API call to fetch data
                console.log("response", response); // Log to inspect structure

                // Assuming your data is in response.data.data
                if (Array.isArray(response.data.data)) {
                    setSalaryData(response.data.data[0]); // Assuming you want to display the first item
                } else {
                    setSalaryData(null); // If it's not an array, reset the data
                    setError("Invalid data format received");
                }
            } catch (err) {
                setError("Failed to fetch salary data");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchSalaryData();
        }
    }, [user]);

    return (
        <Layout sx={{ width: "100%", padding: "20px", minHeight: "100vh", borderRadius: 4, boxShadow: 3 }}>
            <Grid container spacing={4}>
                {/* Section 1 */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minHeight: 180, boxShadow: 5, bgcolor: "#e0f7fa", borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 'bold' }}>Leaves</Typography>
                            <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Total Leaves Taken: {totalLeave}</Typography>
                            <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Leaves  Approved: {approved}</Typography>
                            <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Leaves  Rejected: {rejected}</Typography>
                            <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Leaves  Pending: {pending}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minHeight: 180, boxShadow: 5, bgcolor: "#fff9c4", borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 'bold' }}>Salary</Typography>
                            {salaryData ? (
                                <>
                                    <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Total Salary Taken: Rs.{salaryData.netSalary}</Typography>
                                    <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Total Basic Salary : Rs.{salaryData.basicSalary}</Typography>

                                    <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}> Total Allowance : Rs.{salaryData.allowances}</Typography>
                                    <Typography variant="h6" sx={{ color: '#004d40', fontWeight: 'bold' }}>  Total Deduction: Rs.{salaryData.deductions}</Typography>
                                </>
                            ) : (
                                <Typography variant="h6" sx={{ color: '#004d40' }}>Loading salary data...</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minHeight: 180, boxShadow: 5, bgcolor: "#ffe0b2", borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                                Title 3
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Section 2 */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} sx={{ height: "60vh" }}>
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: "100%", boxShadow: 5, bgcolor: "#4caf50", borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                                        Section 2 - A
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: "100%", boxShadow: 5, bgcolor: "#f06292", borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                                        Section 2 - B
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: "100%", boxShadow: 5, bgcolor: "#f1f8e9", borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#388e3c", fontWeight: "bold" }}>
                                        Section 2 - C
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: "100%", boxShadow: 5, bgcolor: "#e8f5e9", borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#388e3c", fontWeight: "bold" }}>
                                        Section 2 - D
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: "100%", boxShadow: 5, bgcolor: "#ffecb3", borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#e65100", fontWeight: "bold" }}>
                                        Section 2 - E
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: "100%", boxShadow: 5, bgcolor: "#ffcdd2", borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#c62828", fontWeight: "bold" }}>
                                        Section 2 - F
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Section 3 */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%", boxShadow: 5, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Section 3</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default UserDashboard;
