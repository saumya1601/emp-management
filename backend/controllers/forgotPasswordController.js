import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Step 1: Forgot Password (Generate Token & Send Email)
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Received email:", email);  // Log the email to confirm it's coming through

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15m" });

        // Send reset email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            text: `Click the link below to reset your password:\n\n${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Step 2: Reset Password (Verify Token & Update Password)
// Backend Route
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;  // Token from URL
        const { newPassword } = req.body;  // New password

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "Invalid token or user not found" });
        }

        // Hash and update the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

