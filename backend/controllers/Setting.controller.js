import User from "../models/User.js";
import bcrypt from 'bcryptjs';

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Compare old password with the stored password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong old password" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error); // Log error for debugging
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export { changePassword };
