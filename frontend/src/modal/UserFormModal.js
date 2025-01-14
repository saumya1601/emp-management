import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import SweetAlertComponent from '@/components/sweetalert';
import { addNewUser, fetchUsers, modifyUser } from '@/redux/userSlice';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getDepartments } from '@/utils/axiosInstance';
import Image from 'next/image';


// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup
    .number()
    .typeError('Age is required and must be a number')
    .required('Age is required')
    .max(99, 'Age must not be greater than 99'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number with the correct country code'),
  salary: yup
    .number()
    .required('Salary is required')
    .positive('Salary must be a positive number'),
  department: yup.string().required('Department is required'),
});

const UserFormModal = ({ open, onClose, userData }) => {
  const dispatch = useDispatch();
  const { showSuccessAlert, showErrorAlert } = SweetAlertComponent();


  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false); // Declare loading state
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await getDepartments();
        setDepartments(response.data.departments || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Using react-hook-form
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 'male',
      phone: '',
      salary: '',
      department: '', // Default value for department
    },
  });

  // Effect to set the form values if userData exists
  useEffect(() => {
    if (userData) {
      setValue('name', userData.name || '');
      setValue('email', userData.email || '');
      setValue('gender', userData.gender || 'male');
      setValue('age', userData.age || '');
      setValue('phone', userData.phone || '');
      setValue('salary', userData.salary || '');
      setValue('department', userData.department || ''); // Set department value from userData
      setSelectedImg(userData.profileImage || null); // Set selected image
    } else {
      setValue('name', '');
      setValue('email', '');
      setValue('gender', 'male');
      setValue('age', '');
      setValue('phone', '');
      setValue('salary', '');
      setValue('department', ''); // Default empty department
      setSelectedImg(null); // Clear selected image
    }
  }, [userData, open, setValue]);

  const onSubmit = async (data) => {
    const { name, email, gender, age, phone, salary, department } = data;
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

    const payload = {
      name,
      email,
      gender,
      age,
      phone: formattedPhone,
      salary,
      department,
      profileImage: selectedImg, // Ensure this is the base64 string
    };

    try {
      if (userData) {
        // Modify existing user
        await dispatch(modifyUser({ id: userData.id, ...payload }));
        showSuccessAlert('Success!', 'User updated successfully!');
      } else {
        // Add new user
        const actionResult = await dispatch(addNewUser(payload));
        if (addNewUser.rejected.match(actionResult)) {
          showErrorAlert('Error!', actionResult.payload);
        } else {
          showSuccessAlert('Success!', 'User added successfully!');
        }
      }
      dispatch(fetchUsers());
    } catch (error) {
      showErrorAlert('Error!', 'Something went wrong. Please try again later.');
    } finally {
      onClose();
    }
  };


  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setSelectedImg(reader.result);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          overflow: 'hidden',
          border: '1px solid black',
          borderRadius: '8px',
        },
      }}
    >
      <DialogTitle>
        <Typography fontSize={25}>
          {userData ? 'Edit User' : 'Add User'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'black',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Phone Field */}
          <Box marginY={2}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country="in"
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    required: true,
                    style: {
                      width: '100%',
                      height: '55px',
                      fontSize: '16px',
                    },
                  }}
                />
              )}
            />
            {errors.phone && (
              <Typography
                color="error"
                variant="body2"
                fontSize={12}
                marginTop={0.5}
                marginLeft={1.5}
                sx={{ textAlign: 'left' }}
              >
                {errors.phone?.message}
              </Typography>
            )}
          </Box>

          {/* Gender Field */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                margin="dense"
                required
                select
                {...field}
                error={!!errors.gender}
                helperText={errors.gender?.message}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          />

          {/* Age Field */}
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            type="number"
            {...register('age')}
            error={!!errors.age}
            helperText={errors.age?.message}
          />

          {/* Salary Field */}
          <TextField
            label="Salary"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            type="number"
            {...register('salary')}
            error={!!errors.salary}
            helperText={errors.salary?.message}
          />

          {/* Department Field - Dynamically populated */}
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            select
            {...register('department')}
            error={!!errors.department}
            helperText={errors.department?.message}
            SelectProps={{
              native: true, // This enables the native select instead of Material-UI's MenuItem
            }}
          >
            {loading ? (
              <option value="" disabled>
                Loading departments...
              </option>
            ) : (
              departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))
            )}
          </TextField>


          {/* Avatar Upload Section */}
          <Box marginTop={2} display="flex" >
            <div className="relative">




              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <Image
                src={selectedImg || userData?.profileImage || "/male.png"}
                alt="Profile"
                width={100}  // Added width
                height={100} // Added height
                className="rounded-full object-cover border-4"
              />
            </div>
          </Box>

          {/* Action Buttons */}
          <DialogActions sx={{ justifyContent: 'flex-end', gap: 2, px: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              {userData ? 'Update' : 'Add'}
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                bgcolor: '#f44336',
                '&:hover': { bgcolor: '#d32f2f' },
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormModal;
