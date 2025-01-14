import User from "../models/User.js";
import Leave from "../models/Leave.js";

const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user?._id; // Assuming user ID is in the token or session
        if (!userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        // Get user details (including username)
        const user = await User.findById(userId).select('name'); // Fetch only name (username)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get total leave count for the user
        const leaveData = await Leave.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: "$leaveType", totalLeaves: { $sum: 1 } } },
        ]);

        const totalLeaves = leaveData.reduce((total, item) => total + item.totalLeaves, 0); // Total leaves count

        // Prepare dashboard data with username and total leaves
        const dashboardData = {
            user: {
                name: user.name, // Username
            },
            leaveData: {
                totalLeaves, // Total leaves taken
            },
        };

        // Return the data in the response
        return res.status(200).json({
            success: true,
            data: dashboardData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export { getUserDashboardData };
