import { addUser, deleteUser, getUsers, updateUser } from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await getUsers();

        return response.data.users.map(user => ({
            ...user,
            id: user._id
        }));
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
});

// Delete a user
export const removeUser = createAsyncThunk('users/removeUser', async (_id, { rejectWithValue }) => {
    try {
        await deleteUser(_id);
        return _id;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to delete user');
    }
});


// Add a new user
export const addNewUser = createAsyncThunk('users/addNewUser', async (user, { rejectWithValue }) => {
    try {
        // Call your API method to add a new user
        const response = await addUser(user);

        // Return the response data with the appropriate formatting
        return { ...response.data.user, id: response.data.user._id }; // Adjust as per your API's response
    } catch (error) {
        // If the error is related to an existing email, handle it here
        const errorMessage = error.response?.data?.message || 'Failed to add user';

        // You can handle the error by rejecting with a custom message
        if (errorMessage.toLowerCase().includes('user already exists')) {
            // Optionally log the error or handle it in a different way
            console.error('User already exists:', errorMessage);
        }

        // Reject the action with the error message
        return rejectWithValue(errorMessage);
    }
});



export const modifyUser = createAsyncThunk('users/modifyUser', async (user, { rejectWithValue }) => {
    try {
        const response = await updateUser(user); // Call your API method
        return { ...response.data.user, id: response.data.user._id }; // Adjust as per your API's response
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update user');
    }
});


// User slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.users.unshift(action.payload);
            })
            .addCase(modifyUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) state.users[index] = action.payload;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });
    },
});

export default userSlice.reducer;
