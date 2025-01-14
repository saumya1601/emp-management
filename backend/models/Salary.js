import mongoose, { Schema } from "mongoose";

// Define salary schema
const salarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number },
  payDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export Salary model
const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
