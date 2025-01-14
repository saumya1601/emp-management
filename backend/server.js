import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DbCon from './utlis/db.js'
import AuthRoutes from './routes/AuthRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'
import PaymentRoutes from './routes/PaymentRoutes.js'
import DepartmentRoutes from './routes/DepartmentRoutes.js'
import LeaveRoutes from './routes/LeaveRoutes.js'
import SettingRoutes from './routes/SettingRoutes.js';
import DashboardRoutes from './routes/Dashboard.js'
import UserDashboardRoutes from './routes/UserDashboardRoutes.js'
import SalaryRoutes from './routes/SalaryRoutes.js'

// .env file
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

// mongo db connection
DbCon()

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.json()) // Parse incoming JSON requests
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// Define routes
app.use('/api/auth', AuthRoutes)
app.use('/api/admin', AdminRoutes)
app.use('/api/payment', PaymentRoutes);
app.use('/api/department', DepartmentRoutes)
app.use('/api/leave', LeaveRoutes)
app.use('/api/setting', SettingRoutes);
app.use('/api/dashboard', DashboardRoutes)
app.use('/api/userdashboard', UserDashboardRoutes)
app.use('/api/salary', SalaryRoutes)



app.get('/', (req, res) => {
    res.send('test')
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
