import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gender: Yup.string().required('Gender is required'),
    // age: Yup.number()
    //     .typeError('Age must be a number')
    //     .required('Age is required')
    //     .max(99, 'Age cannot be more than 99')
    //     .positive('Age must be a positive number'),


    // phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),

    email: Yup.string().email('Invalid email').required('Email is required'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    name: Yup.string().required('Name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    gender: Yup.string().required('Gender is required'),


    // phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),


});
