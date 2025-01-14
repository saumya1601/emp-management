import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true,
        unique: true
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    salary: { type: Number, required: true },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    profileImage: { type: String },
    dateAdded: { type: Date, default: Date.now },
}, { timestamps: true });  // Automatically handles createdAt and updatedAt

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
