import Salary from '../models/Salary.js';
import UserModel from '../models/User.js';
import mongoose from 'mongoose';

const addSalary = async (req, res) => {
    try {
        const { department, employee, salary, allowance, deduction } = req.body;

        if (!department || !employee || !salary || !allowance || !deduction) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const user = await UserModel.findById(employee).populate('department', 'dep_name');

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const totalSalary = parseInt(salary) + parseInt(allowance) - parseInt(deduction);

        const newSalary = new Salary({
            userId: user._id,
            basicSalary: salary,
            allowances: allowance,
            deductions: deduction,
            netSalary: totalSalary,
            payDate: new Date(),
            department: user.department._id,
        });

        await newSalary.save();

        return res.status(200).json({ success: true, message: "Salary added successfully", department: user.department.dep_name });
    } catch (error) {
        console.error("Error saving salary:", error);
        return res.status(500).json({ success: false, error: "Salary add server error" });
    }
};

const getSalary = async (req, res) => {
    try {
        const salaries = await Salary.find()
            .populate('userId', 'name')
            .populate('department', 'dep_name')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: salaries });
    } catch (error) {
        console.error('Error fetching salary data:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch salary data' });
    }
};

const getSalaryHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch salary history for a specific user
        const salaries = await Salary.find({ userId })
            .populate('userId', 'name') // Populate user details
            .populate('department', 'dep_name') // Populate department details
            .sort({ payDate: -1 });

        if (salaries.length === 0) {
            return res.status(404).json({ success: false, message: 'No salary history found for this user' });
        }

        console.log(salaries); // Log salaries to check the format

        return res.status(200).json({ success: true, data: salaries });
    } catch (error) {
        console.error('Error fetching salary history:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch salary history' });
    }
};





export { addSalary, getSalary, getSalaryHistory };
