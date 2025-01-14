"use client";

import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
            color="text.primary"
            textAlign="center"
        >
            <Typography variant="h3" color="error" gutterBottom>
                Unauthorized Access
            </Typography>
            <Typography variant="subtitle1">
                You do not have permission to view this page. Please log in with the appropriate credentials.
            </Typography>
        </Box>
    );
};

export default Unauthorized;
