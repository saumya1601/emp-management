import Department from "../models/Department.js";
import User from "../models/User.js";
import Leave from "../models/Leave.js";

const getSummary = async (req, res) => {
    try {
        // Get total number of users, excluding admins
        const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });

        // Get total number of departments
        const totalDepartments = await Department.countDocuments();

        // Get total salary by summing the 'salary' field of users
        const totalSalaries = await User.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);

        // Get distinct users who have applied for leave
        const userAppliedForLeave = await Leave.distinct('userId');

        // Get the count of leave statuses
        const leaveStatus = await Leave.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get the count of male and female users, excluding admins
        const genderCounts = await User.aggregate([
            { $match: { role: { $ne: 'admin' } } },  // Exclude users with role 'admin'
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Prepare gender count object
        const maleCount = genderCounts.find(g => g._id === 'male')?.count || 0;
        const femaleCount = genderCounts.find(g => g._id === 'female')?.count || 0;

        // Prepare the leave summary
        const appliedFor = leaveStatus.find(item => item._id === "Applied")?.count || 0;
        const approved = leaveStatus.find(item => item._id === "Approved")?.count || 0;
        const rejected = leaveStatus.find(item => item._id === "Rejected")?.count || 0;
        const pending = leaveStatus.find(item => item._id === "Pending")?.count || 0;

        // Calculate total leaves (sum of applied, approved, pending, and rejected)
        const totalLeaves = appliedFor + approved + rejected + pending;

        const leaveSummary = {
            appliedFor,
            approved,
            rejected,
            pending,
            totalLeaves,  // New field for total leaves
        };

        // Return the response  
        return res.status(200).json({
            success: true,
            totalUsers,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            maleCount,  // Adding male count to response
            femaleCount,  // Adding female count to response
            leaveSummary
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "dashboard summary error" });
    }
};

export { getSummary };
