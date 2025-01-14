import UserModel from "../models/User.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import cloudinary from "../cloudinary/cloudinary.js";

dotenv.config();

// Get all users excluding admin users
const getusers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: { $ne: 'admin' } })
            .populate('department', 'dep_name');

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent deleting admin users
        if (user.role === 'admin') {
            return res.status(409).json({ message: "You cannot delete an Admin" });
        }

        await UserModel.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

// Update a user's details
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, role, gender, age, phone, salary, department, profileImage } = req.body;

        // Find user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent updating admin users
        if (user.role === 'admin') {
            return res.status(409).json({ message: "You cannot update an Admin" });
        }

        // If profileImage is provided, upload it to Cloudinary
        let profileImageUrl = user.profileImage; // Default to current image if none is uploaded

        if (profileImage) {
            const uploadResponse = await cloudinary.uploader.upload(profileImage);
            profileImageUrl = uploadResponse.secure_url; // Get the URL of the uploaded image
        }

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.gender = gender || user.gender;
        user.age = age || user.age;
        user.phone = phone || user.phone;
        user.salary = salary || user.salary;
        user.department = department || user.department;
        user.profileImage = profileImageUrl; // Updated image URL if new one uploaded
        user.updatedAt = new Date();
        // Save the updated user to the database
        await user.save();

        // Return the updated user data as a response
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error('Error in updateUser:', error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};



// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, gender, age, phone, role, maritalStatus, designation, salary, department, profileImage } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.error(`User already exists with email: ${email}`);
            return res.status(409).json({ message: "User already exists" });
        }

        // Default password
        const password = '1234';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prevent creating admin users (optional)
        if (role === 'admin') {
            return res.status(403).json({ message: "Cannot create Admin users" });
        }

        // If profileImage is provided, upload it to Cloudinary
        let profileImageUrl = '';
        if (profileImage) {
            const uploadResponse = await cloudinary.uploader.upload(profileImage);
            profileImageUrl = uploadResponse.secure_url; // Get the URL of the uploaded image
        }

        // Create a new user
        const newUser = new UserModel({
            name,
            email,
            gender,
            age,
            phone,
            role: role || 'user', // Default to 'user' role if none provided
            password: hashedPassword,
            maritalStatus,
            designation,
            salary,
            department,
            profileImage: profileImageUrl, // Save the Cloudinary URL of the uploaded image
        });

        await newUser.save();

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your Account Details',
            text: `Hello ${name},\n\nYour account has been created successfully.\n
            Your default password is: ${password}\n\n
            Please change your password after logging in.\n\n
            Best Regards,\n SAM`,
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Respond to the request
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { getusers, deleteUser, createUser, updateUser };
