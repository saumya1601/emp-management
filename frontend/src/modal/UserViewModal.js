import React from 'react';
import { Modal, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

const UserViewModal = ({ open, onClose, user }) => {
    if (!user) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #1976d2',
                    boxShadow: 24,
                    p: 6,  // Increase padding for more space
                    width: 600,  // Increased width for larger modal
                    maxWidth: '90%',
                    borderRadius: 2,  // Added rounded corners
                    textAlign: 'center',  // Center the content
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        color: '#1976d2',
                    }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>

                <Box sx={{ mb: 3 }}>
                    <Image
                        src={user.profileImage ? user.profileImage : "/male.png"}  // Use profile image or fallback
                        alt="User"
                        width={180}  // Increased size of the image
                        height={180}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #1976d2",  // Add border around the image
                        }}
                    />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {user.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'gray', mb: 2 }}>
                    {user.email}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    <span style={{ fontWeight: 'normal' }}>Department:</span> {user.department ? user.department.dep_name : "-"}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    <span style={{ fontWeight: 'normal' }}>Age:</span> {user.age}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    <span style={{ fontWeight: 'normal' }}>Gender:</span> {user.gender}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    <span style={{ fontWeight: 'normal' }}>Salary:</span> {user.salary}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    <span style={{ fontWeight: 'normal' }}>Phone:</span> {user.phone}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    <span style={{ fontWeight: 'normal' }}>Date Added:</span> {new Date(user.dateAdded).toLocaleDateString()}
                </Typography>
            </Box>
        </Modal>
    );
};

export default UserViewModal;
