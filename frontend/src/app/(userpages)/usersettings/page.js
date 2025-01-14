"use client"

import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Card } from '@mui/material';
import Layout from '../userlayout'

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }


        setError('');
        console.log("Password changed successfully");
    }

    return (
        <>
            <Layout>
                <Card sx={{
                    width: '100%',
                    maxWidth: '500px', // Set a max-width for the form box
                    overflow: 'hidden',
                    boxShadow: 3,
                    padding: '12px',
                    minHeight: '450px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto',
                    borderRadius: '10px'
                }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>Change Password</Typography>
                        <form>
                            <TextField
                                fullWidth
                                label="Current Password"
                                type="password"
                                variant="outlined"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                sx={{ marginBottom: '16px' }}
                            />
                            <TextField
                                fullWidth
                                label="New Password"
                                type="password"
                                variant="outlined"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={{ marginBottom: '16px' }}
                            />
                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                type="password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{ marginBottom: '16px' }}
                            />
                            {error && <Typography color="error" sx={{ marginBottom: '16px', textAlign: 'center' }}>{error}</Typography>}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Change Password
                            </Button>
                        </form>
                    </Box>
                </Card>
            </Layout>
        </>
    )
}
