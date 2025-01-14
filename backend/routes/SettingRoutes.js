import express from 'express'


import { isAdmin, isUser } from '../middleware/verifyToken.js'
import { changePassword } from '../controllers/Setting.controller.js'

const SettingRoutes = express.Router()

SettingRoutes.put('/change-password', isAdmin, isUser, changePassword)


export default SettingRoutes