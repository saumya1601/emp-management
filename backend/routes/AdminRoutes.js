import express from 'express';
import { isAdmin } from '../middleware/verifyToken.js';
import { deleteUser, getusers, createUser, updateUser } from '../controllers/Admin.controller.js';

const AdminRoutes = express.Router();

AdminRoutes.get('/getusers', isAdmin, getusers);
AdminRoutes.delete('/delete/:id', isAdmin, deleteUser);
AdminRoutes.post('/create', isAdmin, createUser);
AdminRoutes.put('/update/:id', isAdmin, updateUser);


export default AdminRoutes;
