import UserModel from "../models/User.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);



        res.status(200).json({

            user,
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        console.log(error);
    }
}

const Logout = async (req, res) => {
    try {


        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        console.log(error);
    }
};


const register = async (req, res) => {
    try {
        const { name, email, password, phone, age, role, gender, dateAdded } = req.body;


        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists Change Email "
            });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create the new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            phone,
            age,
            role,
            gender,
            dateAdded
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        console.error(error);
    }
};




export { register, Login, Logout }