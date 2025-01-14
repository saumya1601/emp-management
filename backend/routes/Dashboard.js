import express from 'express'


import { isAdmin } from '../middleware/verifyToken.js';
import { getSummary } from '../controllers/Dashboard.controller.js';

const DashboardRoutes = express.Router()

DashboardRoutes.get('/summary', isAdmin, getSummary)

export default DashboardRoutes