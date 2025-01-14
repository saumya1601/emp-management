import express from 'express';
import { isAdmin, isUser } from '../middleware/verifyToken.js';
import { addSalary, getSalary, getSalaryHistory } from '../controllers/Salary.controller.js';

const SalaryRoutes = express.Router();

SalaryRoutes.post('/add', isAdmin, addSalary); // Admin-only add salary

SalaryRoutes.get('/salaryhistory', isAdmin, getSalary); // Get salary by user ID without role

SalaryRoutes.get('/usersalary', isUser, getSalaryHistory)

export default SalaryRoutes;
