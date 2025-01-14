import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from '@mui/material';
import { Notifications as NotificationsIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const CustomDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '16px 24px',
  fontSize: '1.25rem', // Set font size for the title
});

const CustomDialogContent = styled(DialogContent)({
  backgroundColor: '#f1f1f1',
});

const NotificationItem = styled(ListItem)({
  borderBottom: '1px solid #e0e0e0',
  '&:last-child': {
    borderBottom: 'none',
  },
});

export default function NotificationModal({ open, onClose, notifications }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <CustomDialogTitle>
        Notifications
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </CustomDialogTitle>
      <CustomDialogContent dividers>
        <List>
          {notifications.map((notification, index) => (
            <NotificationItem key={index}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <NotificationsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={notification.title}
                secondary={notification.content}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: '#1976d2',
                    fontSize: '1rem', // Set font size for primary text
                  },
                  '& .MuiListItemText-secondary': {
                    fontSize: '0.875rem', // Set font size for secondary text
                    color: '#757575',
                  },
                }}
              />
            </NotificationItem>
          ))}
        </List>
      </CustomDialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
