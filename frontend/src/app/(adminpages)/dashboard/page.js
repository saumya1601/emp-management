"use client";

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Stack, Typography, Grid, CircularProgress } from '@mui/material';
import Layout from '../adminlayout';
import { getDashboardSummary } from '@/utils/axiosInstance';

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardSummary = async () => {
            try {
                const response = await getDashboardSummary();
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardSummary();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Layout sx={{ width: '100%', padding: '20px', minHeight: '100vh', borderRadius: 4, boxShadow: 3 }}>
            <Grid container spacing={4}>

                {/* Total Users */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minHeight: 180, boxShadow: 5, bgcolor: '#e0f7fa', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: '#00796b', fontWeight: 'bold' }}>Total Users</Typography>
                            <Typography variant="h3" sx={{ color: '#004d40', fontWeight: 'bold' }}>{dashboardData.totalUsers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>


                {/* Total Departments */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minHeight: 180, boxShadow: 5, bgcolor: '#fff9c4', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: '#fbc02d', fontWeight: 'bold' }}>Total Departments</Typography>
                            <Typography variant="h3" sx={{ color: '#f57f17', fontWeight: 'bold' }}>{dashboardData.totalDepartments}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Monthly Pay */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ minHeight: 180, boxShadow: 5, bgcolor: '#ffe0b2', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>Monthly Pay</Typography>
                            <Typography variant="h3" sx={{ color: '#b71c1c', fontWeight: 'bold' }}>Rs.{dashboardData.totalSalary}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Leave Status */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} sx={{ height: '60vh' }}>



                        {/* Male Users Count */}
                        {/* Male Users Count */}
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: '100%', boxShadow: 5, bgcolor: '#4caf50', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Male Users</Typography>
                                    <Typography variant="h4" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                                        {dashboardData.maleCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Female Users Count */}
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: '100%', boxShadow: 5, bgcolor: '#f06292', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Female Users</Typography>
                                    <Typography variant="h4" sx={{ color: '#d81b60', fontWeight: 'bold' }}>
                                        {dashboardData.femaleCount}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Leave Applied */}
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: '100%', boxShadow: 5, bgcolor: '#f1f8e9', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold' }}>Total Leaves</Typography>
                                    <Typography variant="h4" sx={{ color: '#1b5e20', fontWeight: 'bold' }}>
                                        {dashboardData.leaveSummary.totalLeaves}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Leave Approved */}
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: '100%', boxShadow: 5, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold' }}>Leave Approved</Typography>
                                    <Typography variant="h4" sx={{ color: '#1b5e20', fontWeight: 'bold' }}>
                                        {dashboardData.leaveSummary.approved}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Leave Pending */}
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: '100%', boxShadow: 5, bgcolor: '#ffecb3', borderRadius: 2 }}> {/* Changed color */}
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 'bold' }}>Leave Pending</Typography>
                                    <Typography variant="h4" sx={{ color: '#bf360c', fontWeight: 'bold' }}> {/* Changed text color */}
                                        {dashboardData.leaveSummary.pending}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Leave Rejected */}
                        <Grid item xs={12} sm={6}>
                            <Card sx={{ height: '100%', boxShadow: 5, bgcolor: '#ffcdd2', borderRadius: 2 }}> {/* Changed color */}
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#c62828', fontWeight: 'bold' }}>Leave Rejected</Typography>
                                    <Typography variant="h4" sx={{ color: '#b71c1c', fontWeight: 'bold' }}> {/* Changed text color */}
                                        {dashboardData.leaveSummary.rejected}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>




                    </Grid>
                </Grid>


                {/* Bar Chart for People Added over Time */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', boxShadow: 5, borderRadius: 2 }}>
                        <CardContent>
                            {/* <DateChart /> */}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Layout>
    );
}
