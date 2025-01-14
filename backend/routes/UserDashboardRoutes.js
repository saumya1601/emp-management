import express from 'express';
import { getUserDashboardData } from '../controllers/UserDashboard.controller.js';
import { isUser } from '../middleware/verifyToken.js';

const UserDashboardRoutes = express.Router();

// Route to get user dashboard data
UserDashboardRoutes.get('/', isUser, getUserDashboardData);

export default UserDashboardRoutes;
