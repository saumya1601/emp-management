import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://emp-management-backend-r1af.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

//login and reg

export const login = async (data) => axiosInstance.post('/api/auth/login', data);
export const registerNew = async (data) => axiosInstance.post('/api/auth/register', data);

// CRUD for admin
export const getUsers = async () => axiosInstance.get('/api/admin/getusers');
export const addUser = async (user) => axiosInstance.post('/api/admin/create', user);
export const updateUser = async (user) => axiosInstance.put(`/api/admin/update/${user.id}`, user);
export const deleteUser = async (id) => axiosInstance.delete(`/api/admin/delete/${id}`);

// payment-related APIs
export const createOrder = async (amount) =>
    axiosInstance.post('/api/payment/order', { amount });

export const verifyPayment = async (paymentDetails) =>
    axiosInstance.post('/api/payment/verify', paymentDetails);




// department

export const getDepartments = async () => axiosInstance.get('/api/department/getdepartments')
export const addDepartment = async (data) => axiosInstance.post('/api/department/add', data);
export const getDepartmentById = async (id) => axiosInstance.get(`/api/department/${id}`);
export const updateDepartment = async (id, data) => axiosInstance.put(`/api/department/${id}`, data);
export const deleteDepartment = async (id) => axiosInstance.delete(`/api/department/${id}`);

// leaves



export const addLeaveRequest = async (data) => axiosInstance.post('/api/leave/addleave', data);

export const getLeaveHistory = async () => axiosInstance.get('/api/leave/history');

export const getAllLeaveRequests = async () => axiosInstance.get('/api/leave/admin');

export const changeLeaveStatus = async (leaveId, status) => axiosInstance.put(`/api/leave/admin/${leaveId}`, { status });

// setting

export const changePassword = async (data) => axiosInstance.put('/api/setting/change-password', data);

// dashboard

export const getDashboardSummary = async () => axiosInstance.get('/api/dashboard/summary');

// user dashboard

export const getUserDashboardData = async () => axiosInstance.get('/api/userdashboard');


// salary

export const addSalary = async (data) => axiosInstance.post('/api/salary/add', data);


export const getSalary = async () => axiosInstance.get('/api/salary/salaryhistory');


export const getSalaryHistory = async () => axiosInstance.get('/api/salary/usersalary')


export default axiosInstance;








