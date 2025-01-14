"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(90deg, #0077b6, #00b4d8)',
  color: '#f1f1f1',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

export default function Navbar() {
  const { user } = useSelector((state) => state.auth); // Fetch the logged-in user data
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the router for navigation

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: 'You will be redirected to the login page.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
        }

        Swal.fire({
          title: 'You have been logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        console.log("Logout canceled");
      }
    });
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={1}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, '&:hover': { color: '#a0e1eb' } }}
            onClick={handleSidebarToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Title with personalized greeting */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {user?.role === 'admin'
              ? `Hello ${user?.name || ''} `
              : `Welcome ${user?.name || ''}`}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
            sx={{
              '&:hover': { backgroundColor: '#a0e1eb', color: '#0077b6' },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
