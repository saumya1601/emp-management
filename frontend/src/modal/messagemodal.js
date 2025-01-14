import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Typography } from '@mui/material';
import { Inbox as InboxIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const CustomDialogTitle = styled(DialogTitle)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '16px 24px',
});

const CustomDialogContent = styled(DialogContent)({
    backgroundColor: '#f7f9fc',
});

const MessageItem = styled(ListItem)({
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
        borderBottom: 'none',
    },
});

const MessageTitle = styled(Typography)({
    fontWeight: 'bold',
    color: '#1976d2',
});

export default function MessageModal({ open, onClose, messages }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <CustomDialogTitle>
                <Typography sx={{ fontSize: '20px' }}>Messages</Typography>
                <IconButton onClick={onClose} color="inherit">
                    <CloseIcon />
                </IconButton>
            </CustomDialogTitle>
            <CustomDialogContent dividers>
                <List>
                    {messages.map((message, index) => (
                        <MessageItem key={index}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#1976d2' }}>
                                    <InboxIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<MessageTitle>{message.title}</MessageTitle>}
                                secondary={message.content}
                            />
                        </MessageItem>
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
