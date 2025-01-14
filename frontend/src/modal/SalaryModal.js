import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { addSalary } from "@/utils/axiosInstance";

export default function SalaryModal({ open, onClose, onSave, departments, employees }) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [salary, setSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const data = {
      department: selectedDepartment,
      employee: selectedEmployee,
      salary,
      allowance,
      deduction,
    };

    if (!selectedDepartment || !selectedEmployee || !salary || !allowance || !deduction) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      await addSalary(data);
      onSave(data);
      handleClose();
    } catch (error) {
      console.error("Error saving salary data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedDepartment("");
    setSelectedEmployee("");
    setSalary("");
    setAllowance("");
    setDeduction("");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-salary-modal"
      aria-describedby="add-salary-form"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Employee Salary
        </Typography>
        <Stack spacing={2}>
          <TextField
            select
            label="Department"
            fullWidth
            size="small"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.dep_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Employee"
            fullWidth
            size="small"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            disabled={!selectedDepartment}
          >
            {employees.filter(emp => emp.department._id === selectedDepartment).map((emp) => (
              <MenuItem key={emp._id} value={emp._id}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Salary"
            type="number"
            fullWidth
            size="small"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            label="Allowance"
            type="number"
            fullWidth
            size="small"
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
          />
          <TextField
            label="Deduction"
            type="number"
            fullWidth
            size="small"
            value={deduction}
            onChange={(e) => setDeduction(e.target.value)}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
