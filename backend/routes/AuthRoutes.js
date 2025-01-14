import express from 'express'
import { Login, Logout, register } from '../controllers/Auth.controller.js'
import { forgotPassword, resetPassword } from '../controllers/forgotPasswordController.js';


const AuthRoutes = express.Router()

AuthRoutes.post("/forgot-password", forgotPassword); // Step 1: User submits email
AuthRoutes.post("/reset-password/:token", resetPassword); // Step 2: User resets password
AuthRoutes.post('/register', register)
AuthRoutes.post('/login', Login)
AuthRoutes.post('/logout', Logout)

export default AuthRoutes