"use client";



import Link from 'next/link';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';
import { Button } from '@mui/material';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  })
);

export default function Sidebar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.sidebar.open);
  const { user } = useSelector((state) => state.auth);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const SidebarItem = ({ href, icon: Icon, text, open }) => (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <Link href={href} passHref>
        <Button
          sx={{
            color: 'black',
            fontWeight: 'bold',
            minHeight: 48,
            px: 2,
            justifyContent: open ? 'initial' : 'center',
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
          disableRipple
          disableFocusRipple
          disableElevation
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ fontSize: 28, color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontSize: '16px',
              fontWeight: '500',
            }}
            sx={{
              opacity: open ? 1 : 0,
              color: 'black',
            }}
          />
        </Button>
      </Link>
    </ListItem>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleToggleSidebar}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />



        <List>
          {user?.role === 'admin' ? (
            <>
              <SidebarItem href="/dashboard" icon={DashboardIcon} text="Dashboard" open={open} />
              <SidebarItem href="/usermanagement" icon={PeopleIcon} text="Employees" open={open} />
              <SidebarItem href="/departments" icon={AccountTreeIcon} text="Departments" open={open} />
              <SidebarItem href="/leaves" icon={EditCalendarRoundedIcon} text="Leaves" open={open} />
              <SidebarItem href="/salary" icon={PaymentsIcon} text="Salary" open={open} />
              {/* <SidebarItem href="/settings" icon={SettingsIcon} text="Settings" open={open} /> */}
            </>
          ) : (
            <>
              <SidebarItem href="/userdashboard" icon={DashboardIcon} text="Dashboard" open={open} />
              <SidebarItem href="/leave" icon={EditCalendarRoundedIcon} text="Leave" open={open} />
              <SidebarItem href="/usersalary" icon={PaymentsIcon} text="Salary History" open={open} />
              <SidebarItem href="/myprofile" icon={AccountCircleIcon} text="My Profile" open={open} />
              {/* <SidebarItem href="/usersettings" icon={SettingsIcon} text="Settings" open={open} /> */}
            </>
          )}
        </List>




      </Drawer>
    </Box>
  );
}
