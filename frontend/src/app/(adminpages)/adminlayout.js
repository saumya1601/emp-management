import React from 'react';
import { Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Layout({ children }) {
    return (
        <ProtectedRoute requiredRole="admin">
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                    padding: '10px',
                }}
            >
                <Navbar />
                <Box height={70} />
                <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
                    <Sidebar />
                    {children}
                </Box>
            </Box>
        </ProtectedRoute>
    );
}
