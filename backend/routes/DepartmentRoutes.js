import express from 'express'
import { isAdmin } from '../middleware/verifyToken.js'
import { addDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from '../controllers/Department.controller.js'

const DepartmentRoutes = express.Router()

DepartmentRoutes.get('/getdepartments', isAdmin, getDepartments)
DepartmentRoutes.post('/add', isAdmin, addDepartment)
DepartmentRoutes.get('/:id', isAdmin, getDepartment)
DepartmentRoutes.put('/:id', isAdmin, updateDepartment)
DepartmentRoutes.delete('/:id', isAdmin, deleteDepartment)

export default DepartmentRoutes;