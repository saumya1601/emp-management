import express from 'express';


import { addLeaveRequest, changeLeaveStatus, getAllLeaveRequests, getLeaveHistory } from '../controllers/Leave.controller.js';
import { isAdmin, isUser } from '../middleware/verifyToken.js';

const LeaveRoutes = express.Router();

// User routes
LeaveRoutes.post('/addleave', isUser, addLeaveRequest);
LeaveRoutes.get('/history', isUser, getLeaveHistory);

// Admin routes
LeaveRoutes.get('/admin', isAdmin, getAllLeaveRequests);

LeaveRoutes.put('/admin/:leaveId', isAdmin, changeLeaveStatus);

export default LeaveRoutes;
