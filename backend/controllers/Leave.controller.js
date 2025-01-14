import Leave from '../models/Leave.js';


// User adds a leave request
const addLeaveRequest = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;
        const userId = req.user._id;  // Assuming req.user contains the entire user object with _id

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const newLeaveRequest = new Leave({
            userId,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        await newLeaveRequest.save();
        return res.status(201).json({ message: 'Leave request added successfully', data: newLeaveRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add leave request', error });
    }
};

// User views their leave history
const getLeaveHistory = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from the token payload

        // Fetch all leave requests for the logged-in user
        const leaveHistory = await Leave.find({ userId });

        // Check if leave requests exist for the user
        if (!leaveHistory || leaveHistory.length === 0) {
            return res.status(404).json({
                message: 'No leave requests found for this user',
                totalLeave: 0,
                approved: 0,
                rejected: 0,
                pending: 0
            });
        }

        // Calculate counts for each status
        const approved = leaveHistory.filter(leave => leave.status === 'Approved').length;
        const rejected = leaveHistory.filter(leave => leave.status === 'Rejected').length;
        const pending = leaveHistory.filter(leave => leave.status === 'Pending').length;

        return res.status(200).json({
            message: 'Leave history fetched successfully',
            totalLeave: leaveHistory.length,
            approved,
            rejected,
            pending,
            data: leaveHistory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch leave history', error });
    }
};


// Admin views all leave requests
const getAllLeaveRequests = async (req, res) => {
    try {
        // Only admins should have access to this route
        const leaveRequests = await Leave.find()
            .populate({
                path: 'userId',  // Populate user details
                select: 'name email role department',  // Select the fields you need from the user
                populate: {  // Populate department inside the user model
                    path: 'department',
                    select: 'dep_name'  // Only select the dep_name from the department model
                }
            });

        if (!leaveRequests || leaveRequests.length === 0) {
            return res.status(404).json({ message: 'No leave requests found' });
        }

        // Return populated leave requests with user details including department name
        return res.status(200).json({ message: 'All leave requests fetched successfully', data: leaveRequests });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch leave requests', error });
    }
};



// Admin can approve or reject a leave request
const changeLeaveStatus = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status } = req.body;

        // Check for valid status
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Use "Approved" or "Rejected".' });
        }

        // Find the leave request and update status
        const leaveRequest = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });

        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        return res.status(200).json({ message: `Leave request ${status}`, data: leaveRequest });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update leave request status', error });
    }
};

export { addLeaveRequest, getLeaveHistory, getAllLeaveRequests, changeLeaveStatus };
